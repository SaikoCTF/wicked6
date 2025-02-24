function init() {
  // Load data
  setup_data();

  // Initialize Navigation
  const challenge_list = document.getElementById('ctf-menu-challenge-list');
  const challenge_template = document.getElementById('ctf-menu-challenge-list-item-template');

  data.challenges.forEach(challenge => {
    let challenge_item = challenge_template.cloneNode(true);
    let challenge_link = challenge_item.querySelector('a');
    challenge_link.textContent = challenge.name;
    challenge_link.setAttribute('href', 'challenges.html#challenge-' + challenge.id);

    challenge_item.setAttribute('id', 'ctf-challenge-list-item-' + challenge.id);

    let anchor = document.createElement('a');
    anchor.textContent = challenge.name;
    anchor.setAttribute('href', 'challenges.html#challenge-' + challenge.id);

    challenge_list.append(challenge_item);
  });

  challenge_template.remove();

  // Update page on Hash Change
  window.addEventListener(
    "hashchange",
    () => {
      loadPage(location.hash);
    },
    false,
  );
  loadPage(location.hash);
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function ctf_get_active_breakpoint() {
  const bp_abbrs = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
  for (const bp of bp_abbrs) {
    const value = window.getComputedStyle(document.documentElement).getPropertyValue('--ctf-bp-' + bp);
    if (window.matchMedia("(min-width: "+ value +")").matches) {
      return bp;
    }
  }

  console.error('No active breakpoint found.');
  return null;
}

function loadPage(hashValue) {
  const hashtagIndex = hashValue.indexOf('#')
  if (hashtagIndex === 0) {
    hashValue = hashValue.substr(1);
  }

  //console.log("Value: " + hashValue);
  if (hashValue.length === 0) {
    // Initialize Overall View
    const overallView = document.getElementById('ctf-section-overall');
    if (overallView) {
      overall_init(overallView);
    } else {
      console.warn("Overall view does not exist.");
    }

    return;
  }

  if (data.challenges.length === 0) {
    return;
  }

  const challengePrefix = 'challenge-';
  const challengePrefixIndex = hashValue.indexOf(challengePrefix);
  let challengeId = -1;
  if (challengePrefixIndex !== -1) {
    challengeId = parseInt(hashValue.substring(challengePrefixIndex + challengePrefix.length));
  }

  if (challengeId === NaN) {
    return;
  }

  let challengeToLoad = null;
  data.challenges.forEach(challenge => {
    if (challengeId === challenge.id) {
      challengeToLoad = challenge
    }
  });

  if (!challengeToLoad) {
    return;
  }

  // Initialize Challenge View
  const challenge_template = document.getElementById('ctf-section-challenge-template');
  const challenge_view = document.getElementById('ctf-challenge-view-container');
  if (!challenge_template) {
    console.warn("Challenge template does not exist.");
    return;
  }

  if (!challenge_view) {
    console.warn("Challenge view does not exist.");
    return;
  }

  init_challenge_view(challenge_template, challenge_view, challengeToLoad);
}


ready(init);