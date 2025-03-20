// Challenge ID => List of participants sorted by ranking algorithm
const challenge_participants_map = new Map();


function parseTimeStr(timeStr) {
  const regex = /(\d+):(\d{2}):(\d{2}).(\d{6})/;
  const match = timeStr.match(regex);

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = parseInt(match[3], 10);
    const milliseconds = parseInt(match[4], 10);

    // const time = {
    //   hours: hours,
    //   minutes: minutes,
    //   seconds: seconds,
    //   milliseconds: milliseconds
    // }

    // console.log("TIME_STR: ", timeStr);
    // console.log("TIME: ", time);

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: milliseconds
    };
  } else {
    return null;
  }
}

function convertTimeStrToMillis(timeStr) {
  const time = parseTimeStr(timeStr);

  if (time === null) {
    return null;
  }

  const millisecondsPerHour = 60 * 60 * 1000000;
  const millisecondsPerMinute = 60 * 1000000;
  const millisecondsPerSecond = 1000000;

  return ((time.hours * millisecondsPerHour) + 
      (time.minutes * millisecondsPerMinute) + 
      (time.seconds * millisecondsPerSecond) + 
      time.milliseconds);
}

function compare_challenge(c1, c2) {
  const c1time = c1.timeInMillis;
  const c2time = c2.timeInMillis;

  if (c1time === null) {
    return 1;
  }

  if (c2time === null) {
    return -1;
  }

  if (c1time === c2time) {
    if(c1.complete === c2.complete)
      return 0;
    return (c1.complete ? -1 : 1);
  }
  return c1time - c2time;
}

function add_milli_times() {
  data.challenges.forEach(challenge => {
    challenge.allowedTimeInMillis = convertTimeStrToMillis(challenge.allowed_time);
  });

  data.participants.forEach(participant => {
    participant.challenges.forEach(challenge => {
      challenge.timeInMillis = convertTimeStrToMillis(challenge.time);

      if (participant.handle=== 'TNETNNBA' && challenge.id ===1) {
        console.log('TIME: ', parseTimeStr(challenge.time))
      }
    });
  });
}

function setup_data() {
  add_milli_times();

  // Populate challenge participant and rankings maps
  data.challenges.forEach(challenge => {

    // Get all users who completed challenge
    let challenge_participants = [];
    data.participants.forEach(participant => {
      challenge_data = null;
      for (const c of participant.challenges) {
        if (challenge.id === c.id) {
          challenge_data = c;
        }
      }

      if (challenge_data !== null) {
        challenge_participants.push({
          "handle": participant.handle,
          "complete": true,
          "time": challenge_data.time,
          "timeInMillis": challenge_data.timeInMillis,
        });
      } else {
        challenge_participants.push({
          "handle": participant.handle,
          "complete": false,
          "time": challenge.allowed_time,
          "timeInMillis": challenge.allowedTimeInMillis,
        });
      }
    });

    // Sort participants by ranking algorithm
    challenge_participants.sort(compare_challenge);

    // Calculate challenge rank values
    let lastRank = 0;
    let lastTime = 0;
    challenge_participants.forEach((participant, i) => {
      if (participant.timeInMillis !== lastTime) {
        lastRank += 1;
      }

      participant.rank = lastRank;
      lastTime = participant.timeInMillis;
    });

    // Add sorted list to challenge ranking map
    challenge_participants_map.set(challenge.id, challenge_participants);
  });

  // Populate overall time map
  data.participants.forEach((participant) => {
    participant.overall_time = get_participant_overall_time(participant);
    participant.overall_flags = get_participant_overall_flags(participant);
  });

  // Sort participants by ranking algorithm
  data.participants.sort(function (p1, p2) {
    return p2.overall_flags - p1.overall_flags || p1.overall_time - p2.overall_time;
  });

  // Calculate overall rank values
  let lastRank = 0;
  let lastTime = 0;
  let lastNumCompleted = 0;

  data.participants.forEach((participant, i) => {
    if (participant.overall_time !== lastTime || participant.overall_flags !== lastNumCompleted) {
      lastRank += 1;
    }

    participant.rank = lastRank;
    lastTime = participant.overall_time;
    lastNumCompleted = participant.overall_flags;
  });
}

function get_participant_overall_time(participant) {

  let millis = 0;
  data.challenges.forEach(challenge => {
    challenge_data = get_participant_challenge_data(participant.handle, challenge.id);
    if (challenge_data === null) {
      millis += challenge.allowedTimeInMillis;
    } else {
      millis += challenge_data.timeInMillis;
    }
  });

  return millis;
}

function get_participant_overall_flags(participant) {

  let totalFlags = 0;
  data.challenges.forEach(challenge => {
    challenge_data = get_participant_challenge_data(participant.handle, challenge.id);
    if (challenge_data !== null && challenge_data.complete) {
      totalFlags++
    }
  });

  return totalFlags;
}

// Assumes timeStr format is "MM:ss"
function getSeconds(timeStr) {
  let [minutes, seconds] = timeStr.split(':');

  minutes = parseInt(minutes);
  seconds = parseInt(seconds);

  return (minutes * 60) + seconds;
}

function formatSeconds(seconds) {
  const secondsPerMinute = 60;
  const secondsPerHour = 60 * secondsPerMinute;

  let hours = Math.floor(seconds / secondsPerHour);
  seconds = seconds % secondsPerHour;

  let minutes = Math.floor(seconds / secondsPerMinute);
  seconds = seconds % secondsPerMinute;

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return hours + ":" + minutes + ":" + seconds;
}

function formatMillis(milliseconds) {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000000));
  milliseconds %= (60 * 60 * 1000000);
  const minutes = Math.floor(milliseconds / (60 * 1000000));
  milliseconds %= (60 * 1000000);
  const seconds = Math.floor(milliseconds / 1000000);
  milliseconds %= 1000000;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(6, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function get_participant_challenge_data(handle, challenge_id) {
  for (const participant of challenge_participants_map.get(challenge_id)) {
    if (participant.handle === handle) {
      return participant;
    }
  }

  return null;
}

function getHiddenHeight(hidden, elem) {
  hidden.style.position = "absolute";
  hidden.style.bottom = "-5000px";
  hidden.style.display = "block";
  const height = elem.clientHeight;
  hidden.style.display = "";
  hidden.style.bottom = "";
  hidden.style.position = "";
  return height;
}