/* Global accessible navigation. No menu item is active by default. */
(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('primary-navigation');
  if (!toggle || !navigation) return;

  const desktop = window.matchMedia('(min-width: 1200px)');
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open, returnFocus = false) => {
    navigation.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (returnFocus && !open) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const open = !isOpen();
    setOpen(open);
    if (open) navigation.querySelector('a')?.focus();
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a') && !desktop.matches) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, true);
  });

  document.addEventListener('click', (event) => {
    if (isOpen() && !navigation.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  const onBreakpoint = () => { if (desktop.matches) setOpen(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
  else desktop.addListener(onBreakpoint);
})();
