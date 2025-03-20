function init_challenge_view(challenge_template, challenge_container, challenge) {
  // Clone template
  let challenge_view = challenge_template.cloneNode(true);
  // Populate data
  populate_challenge_view(challenge_view, challenge);
  // Add challenge to DOM
  challenge_container.replaceChildren(challenge_view);
}

function populate_challenge_view(view, challenge) {
  view.id = 'ctf-section-challenge-' + challenge.id;

  participants = challenge_participants_map.get(challenge.id);

  // Title
  const challengeHeading = view.querySelector('.ctf-page-title');
  challengeHeading.textContent = challenge.name;

  // Table
  const challengeTable = view.querySelector('.ctf-table--challenge');
  const caption = challengeTable.querySelector('.ctf-caption--challenge-name');
  caption.textContent = challenge.name;
  let tbody = create_challenge_tbody(['Rank', 'Handle', 'Time'], participants, challenge);
  challengeTable.append(tbody);
}

function create_challenge_tbody(headings, participants, challenge) {
  tbody = document.createElement('tbody');

  let innerHTML = '';
  participants.forEach((participant, i) => {
    innerHTML += '<tr>';
    headings.forEach((heading, j) => {

      switch (heading) {
        case 'Rank':
          innerHTML += '<td class="ctf-challenge-rank' + (!participant.complete ? ' ctf-incomplete' : '') + '">';
          innerHTML += participant.complete ? participant.rank : '-';
          break;
        case 'Handle':
          innerHTML += '<td class="ctf-challenge-handle' + (!participant.complete ? ' ctf-incomplete' : '') + '">';
          innerHTML += participant.handle;
          break;
        case 'Time':
          innerHTML += '<td class="ctf-challenge-time' + (!participant.complete ? ' ctf-incomplete' : '') + '">';
          innerHTML += (participant.timeInMillis === null) ? 'ERROR' : 
              (participant.complete ? participant.time : challenge.allowed_time)
          break;
        default:
        // Do nothing
      }

      innerHTML += '</td>';
    });
    innerHTML += '</tr>';
  });

  tbody.innerHTML = innerHTML;

  return tbody;
}