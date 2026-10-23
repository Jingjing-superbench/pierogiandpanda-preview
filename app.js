for (const item of document.querySelectorAll('details')) {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    for (const other of document.querySelectorAll('details')) {
      if (other !== item) other.open = false;
    }
  });
}
