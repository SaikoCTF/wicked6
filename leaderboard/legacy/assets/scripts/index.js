function init() {
  // Load data
  setup_data();

  // Initialize Legend
  const challenge_list = document.getElementById('ctf-challenge-list');
  data.challenges.forEach(challenge => {
    let anchor = document.createElement('a');
    anchor.textContent = challenge.name;
    anchor.setAttribute('href', '#challenge-' + challenge.id);

    let li = document.createElement('li');
    li.setAttribute('id', 'ctf-challenge-list-item-' + challenge.id);
    li.style.order = 
    li.append(anchor);

    challenge_list.append(li)
  });

  // Initialize Overall View
  const overallView = document.getElementById('ctf-section-overall');
  if (overallView) {
    overall_init(overallView);
  } else {
    console.warn("Overall view does not exist.");
  }
  
  // Initialize Challenge Views
  const challenge_template = document.getElementById('ctf-section-challenge-template');
  if (challenge_template) {
    init_challenge_views(challenge_template);
  } else {
    console.warn("Challenge view template does not exist.");
  }
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


ready(init);