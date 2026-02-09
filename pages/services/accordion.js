// accordion.js

const PADDING_Y = 100; // px — padding TOP and BOTTOM each

export function initAccordion(root) {
  const items = root.querySelectorAll('.service');
  if (!items.length) return;

  // --- helpers ---

  function setCollapsedHeight(item) {
    const header = item.querySelector('.service__title__wrapper');
    if (!header) return;

    item.style.height = header.offsetHeight + 'px';
  }

  function setExpandedHeight(item) {
    const contentHeight = item.scrollHeight;
    const paddedHeight = contentHeight + PADDING_Y * 2;

    item.style.height = paddedHeight + 'px';
  }

  // --- init state ---

  items.forEach(item => {
    setCollapsedHeight(item);
    item.style.overflow = 'hidden';
    item.style.transition = 'height 0.5s ease, background-color 0.3s ease';
  });

  // --- click logic ---

  items.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // collapse all
      items.forEach(i => {
        i.classList.remove('active');
        setCollapsedHeight(i);
      });

      // expand clicked
      if (!isActive) {
        item.classList.add('active');
        setExpandedHeight(item);
      }
    });
  });

  // --- keep height correct on resize ---

  window.addEventListener('resize', () => {
    const active = root.querySelector('.service.active');
    if (active) {
      setExpandedHeight(active);
    }
  });
}

// Optional manual recalculation hook
export function recalcAccordion(root) {
  const items = root.querySelectorAll('.service');
  if (!items.length) return;

  items.forEach(item => {
    if (item.classList.contains('active')) {
      const paddedHeight = item.scrollHeight + PADDING_Y * 2;
      item.style.height = paddedHeight + 'px';
    } else {
      const header = item.querySelector('.service__title__wrapper');
      if (header) {
        item.style.height = header.offsetHeight + 'px';
      }
    }
  });
}