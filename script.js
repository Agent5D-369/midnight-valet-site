document.querySelectorAll('.hero .reveal, .page-hero .reveal, .cta-panel.reveal').forEach(el => el.classList.add('is-visible'));
const navToggle = document.querySelector('[data-nav-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.faq-item button').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!open) item.classList.add('active');
  });
});

document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav-link]').forEach(link => {
  const href = link.getAttribute('href');
  if ((current === '' && href === 'index.html') || href === current) {
    link.classList.add('active');
  }
});


const waitlistForm = document.querySelector('[data-waitlist-form]');
if (waitlistForm) {
  const status = waitlistForm.querySelector('[data-form-status]');
  waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const action = waitlistForm.getAttribute('action') || '';
    if (!action.includes('formspree.io/f/') || action.includes('REPLACE_WITH_YOUR_FORM_ID')) {
      if (status) {
        status.textContent = 'Setup required: replace the placeholder Formspree endpoint in waitlist.html before publishing.';
        status.classList.add('is-error');
      }
      return;
    }
    const formData = new FormData(waitlistForm);
    try {
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (res.ok) {
        waitlistForm.reset();
        if (status) {
          status.innerHTML = 'Success. You're on the waitlist. <a href="venue-pilot-scorecard.html">Open the scorecard now.</a>';
          status.classList.remove('is-error');
          status.classList.add('is-success');
        }
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors?.map(err => err.message).join(' ') || 'Something went wrong. Please try again or email MidnightValetLLC@gmail.com.';
        if (status) {
          status.textContent = msg;
          status.classList.add('is-error');
        }
      }
    } catch (err) {
      if (status) {
        status.textContent = 'Connection error. Please try again or email MidnightValetLLC@gmail.com.';
        status.classList.add('is-error');
      }
    }
  });
}
