// Columns to display for each challenge
const challenge_columns = ['Rank', 'Time'];

function overall_init(parentEl) {
  populate_header_row();

  const table = document.getElementById('ctf-table-overall');
  const table_body = table.querySelector('tbody');
  populate_overall_table_body(table_body, data.participants);
}

function populate_header_row() {
  const overall_challenges_header = document.getElementById('ctf-table-overall-challenges-header');
  overall_challenges_header.setAttribute('colspan', data.challenges.length);

  const header_row = document.getElementById('ctf-overall-header-row');

  data.challenges.forEach(challenge => {
    let anchor = document.createElement('a');
    anchor.textContent = challenge.id;
    anchor.setAttribute('href', '#challenge-' + challenge.id);

    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.setAttribute('id', 'ctf-overall-challenge-' + challenge.id);
    th.classList.add('ctf-challenge-header');
    th.append(anchor);

    header_row.append(th);
  });
}

function populate_overall_table_body(table_body, participants) {
  participants.forEach((participant, i) => {
    let tr = document.createElement('tr');

    // Overall Rank
    const rank_td = document.createElement('td');
    rank_td.classList.add('ctf-overall-data');
    rank_td.setAttribute('rowspan', challenge_columns.length);
    rank_td.textContent = participant.rank;
    tr.append(rank_td);

    // Handle
    const handle_td = document.createElement('td');
    handle_td.classList.add('ctf-overall-data');
    handle_td.setAttribute('rowspan', challenge_columns.length);
    handle_td.textContent = participant.handle;
    tr.append(handle_td);

    // Overall Time
    const score_td = document.createElement('td');
    score_td.classList.add('ctf-overall-data');
    score_td.setAttribute('rowspan', challenge_columns.length);
    score_td.textContent = formatSeconds(participant.overall_time);
    tr.append(score_td);

    // Challenge columns
    challenge_columns.forEach((column, j) => {
      const divider_td = document.createElement('th');
      divider_td.setAttribute('scope', 'row');
      divider_td.classList.add('ctf-divider-data');
      divider_td.textContent = column;
      tr.append(divider_td);

      data.challenges.forEach(challenge => {
        td = document.createElement('td');
        td.classList.add('ctf-challenge-data');

        const participant_challenge_data = get_participant_challenge_data(participant.handle, challenge.id);

        if (participant_challenge_data.complete) {
          switch (column) {
            case 'Rank':
              td.textContent = participant_challenge_data.rank;
              break;
            case 'Time':
              td.textContent = participant_challenge_data?.time ?? challenge.allowed_time;
          }

          if (participant_challenge_data.rank === 1) {
            td.classList.add('ctf-rank-1');
          }
        } else {
          switch (column) {
            case 'Rank':
              td.textContent = "-";
              break;
            case 'Time':
              td.textContent = participant_challenge_data?.time ?? challenge.allowed_time;
          }

          td.classList = "ctf-incomplete";
        }

        tr.append(td);
      });

      table_body.append(tr);

      // Create a new row if needed
      if (j !== (challenge_columns.length - 1)) {
        tr = document.createElement('tr');
      }
    });
  });
}