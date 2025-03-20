function init_challenge_views(challenge_template) {
  data.challenges.forEach((challenge, i) => {
    // Clone template
    let challenge_view = challenge_template.cloneNode(true);
    // Populate data
    populate_challenge_view(challenge_view, challenge);
    // Add challenge to DOM
    challenge_template.before(challenge_view);
  });

  // Remove template
  challenge_template.parentNode.removeChild(challenge_template);
}

function populate_challenge_view(view, challenge) {
  view.id = 'ctf-section-challenge-' + challenge.id;

  participants = challenge_participants_map.get(challenge.id);

  // Title
  const challengeHeading = view.querySelector('.ctf-section__title');
  challengeHeading.textContent = challenge.name;
  challengeHeading.id = 'challenge-' + challenge.id;

  // Table
  const challengeTable = view.querySelector('.ctf-table--challenge');
  const caption = challengeTable.querySelector('.ctf-caption--challenge-name');
  caption.textContent = challenge.name;
  let tbody = create_challenge_tbody(['Rank', 'Handle', 'Time'], participants);
  challengeTable.append(tbody);
}

function create_challenge_tbody(headings, participants) {
  tbody = document.createElement('tbody');

  let innerHTML = '';
  participants.forEach((participant, i) => {
    innerHTML += '<tr>';
    headings.forEach((heading, j) => {
      
      if (participant.complete) {
        innerHTML += '<td>';
        switch (heading) {
          case 'Rank':
            innerHTML += participant.rank;
            break;
          case 'Handle':
            innerHTML += participant.handle;
            break;
          case 'Time':
            innerHTML += participant.time;
            break;
          default:
          // Do nothing
        }

      } else {
        innerHTML += '<td class="ctf-incomplete">';
        switch (heading) {
          case 'Rank':
            innerHTML += '-';
            break;
          case 'Handle':
            innerHTML += participant.handle;
            break;
          case 'Time':
            innerHTML += participant.time ?? challenge.allowed_time;
            break;
          default:
          // Do nothing
        }
      }

      innerHTML += '</td>';
    });
    innerHTML += '</tr>';
  });

  tbody.innerHTML = innerHTML;

  return tbody;
}