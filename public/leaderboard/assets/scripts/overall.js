// Columns to display for each challenge
const challenge_columns = ['Rank', 'Time'];

function overall_init(parentEl) {
  const table = document.getElementById('ctf-table-overall');
  const table_body = table.querySelector('tbody');
  populate_overall_table_body(table_body, data.participants);

  const basic_rows = table.querySelectorAll('.ctf-overall-row--basic');
  basic_rows.forEach(row => 
    row.addEventListener('click', () => row.classList.toggle('expanded'))
  );
}

function populate_overall_table_body(table_body, participants) {
  const basic_row_template = table_body.querySelector('.ctf-overall-row--basic');
  const detail_row_template = table_body.querySelector('.ctf-overall-row--details');

  participants.forEach((participant, i) => {
    let basic_row = basic_row_template.cloneNode(true);

    // Overall Rank
    const rank_td = basic_row.querySelector('.ctf-overall-rank');
    rank_td.textContent = participant.rank;

    // Handle
    const handle_td = basic_row.querySelector('.ctf-overall-handle');
    handle_td.textContent = participant.handle;

    // Flags
    const flags_td = basic_row.querySelector('.ctf-overall-flags');
    flags_td.textContent = participant.overall_flags;

    // Overall Time
    const score_td = basic_row.querySelector('.ctf-overall-time');
    score_td.textContent = formatMillis(participant.overall_time);

    table_body.appendChild(basic_row);

    // Details
    let details_row = detail_row_template.cloneNode(true);
    let details_table = details_row.querySelector('.ctf-table--details');
    populate_overall_details_table(participant, details_table);

    table_body.appendChild(details_row);
  });

  basic_row_template.remove();
  detail_row_template.remove();
}

function populate_overall_details_table(participant, details_table) {
  let caption = details_table.querySelector('caption');
  caption.textContent = "SaikoCTF rank details for participant " + participant.handle;

  let tbody = details_table.querySelector('tbody');

  const row_template = tbody.querySelector('.ctf-details-row');

  data.challenges.forEach(challenge => {
    const participant_challenge_data = get_participant_challenge_data(participant.handle, challenge.id);

    let row = row_template.cloneNode(true);
    
    const challenge_td = row.querySelector('.ctf-details-challenge');
    const rank_td = row.querySelector('.ctf-details-rank');
    const score_td = row.querySelector('.ctf-details-time');

    let challenge_anchor = document.createElement('a');
    challenge_anchor.setAttribute('href', 'challenges.html#challenge-' + challenge.id);
    challenge_anchor.textContent = challenge.name;
    challenge_td.appendChild(challenge_anchor);

    if (participant_challenge_data.complete) {
      rank_td.textContent = participant_challenge_data.rank;
      if (participant_challenge_data.rank === 1) {
        rank_td.classList.add('ctf-rank-1');
      }
    } else {
      rank_td.textContent = "-";
      rank_td.classList.add('ctf-incomplete');
      score_td.classList.add('ctf-incomplete');
    }

    score_td.textContent = (participant_challenge_data?.timeInMillis !== null) ? 
          participant_challenge_data.time : 'ERROR';

    tbody.appendChild(row);
  });

  row_template.remove();
}