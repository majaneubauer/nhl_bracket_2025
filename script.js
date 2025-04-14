document.querySelectorAll('.matchup').forEach(matchup => {
    const buttons = matchup.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
      });
    });
  });
  