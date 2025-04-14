document.querySelectorAll('.team').forEach(team => {
    team.addEventListener('click', function() {
      // Get the parent matchup
      const matchup = this.closest('.matchup');
  
      // Get the round and game from data attributes
      const round = matchup.dataset.round;
      const game = matchup.dataset.game;
  
      // Mark the clicked team as the winner
      const allTeams = matchup.querySelectorAll('.team');
      allTeams.forEach(t => t.classList.remove('selected')); // Reset selected state
      this.classList.add('selected'); // Mark the clicked team as selected
  
      // Now find the corresponding winner spot in the next round
      const nextRound = parseInt(round) + 1;
      const winnerSpot = document.querySelector(`.round-${nextRound} .matchup[data-game="${game}"] .winner-spot`);
  
      // Place the winner in the next round
      winnerSpot.textContent = this.textContent;
    });
  });
  