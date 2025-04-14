// Select the winner for each matchup
document.querySelectorAll('.team').forEach(button => {
    button.addEventListener('click', () => {
      const allButtons = button.closest('.round').querySelectorAll('.team');
      allButtons.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
  