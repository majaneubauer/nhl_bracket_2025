// Function to handle the winner selection for each matchup
document.querySelectorAll('.matchup[data-round="1"]').forEach(matchup => {
    const gameNum = parseInt(matchup.dataset.game);
    const teams = matchup.querySelectorAll('.team');
  
    teams.forEach(team => {
      team.addEventListener('click', () => {
        // Highlight the selected winner
        teams.forEach(t => t.classList.remove('winner'));
        team.classList.add('winner');
  
        // Each game has a unique "slot" in round 2, based on game number
        const slotNum = gameNum; // e.g., Game 1 feeds into data-slot="1"
        const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);
  
        if (target) {
          target.textContent = team.textContent;
        }
      });
    });
  });
  
  // Function to handle winner selection for Round 2 (using winners from Round 1)
  document.querySelectorAll('.matchup[data-round="2"]').forEach(matchup => {
    const gameNum = parseInt(matchup.dataset.game);
    const teams = matchup.querySelectorAll('.team');
  
    teams.forEach(team => {
      team.addEventListener('click', () => {
        // Highlight the selected winner
        teams.forEach(t => t.classList.remove('winner'));
        team.classList.add('winner');
  
        // Each game has a unique "slot" in round 3, based on game number
        const slotNum = gameNum + 8; // Round 2 winners go to slot 5-8 (data-slot="5", "6", etc.)
        const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);
  
        if (target) {
          target.textContent = team.textContent;
        }
      });
    });
  });
  
  // Function to handle winner selection for Round 3 (Conference Finals)
  document.querySelectorAll('.matchup[data-round="3"]').forEach(matchup => {
    const gameNum = parseInt(matchup.dataset.game);
    const teams = matchup.querySelectorAll('.team');
  
    teams.forEach(team => {
      team.addEventListener('click', () => {
        // Highlight the selected winner
        teams.forEach(t => t.classList.remove('winner'));
        team.classList.add('winner');
  
        // Each game has a unique "slot" in round 4 (Stanley Cup Final)
        const slotNum = gameNum + 12; // Round 3 winners go to slot 13-14 (data-slot="13", "14")
        const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);
  
        if (target) {
          target.textContent = team.textContent;
        }
      });
    });
  });
  
  // Function to handle winner selection for the Stanley Cup Final (Round 4)
  document.querySelectorAll('.matchup[data-round="4"]').forEach(matchup => {
    const teams = matchup.querySelectorAll('.team');
  
    teams.forEach(team => {
      team.addEventListener('click', () => {
        // Highlight the selected winner
        teams.forEach(t => t.classList.remove('winner'));
        team.classList.add('winner');
  
        // Update the winner of the Stanley Cup Final
        const target = document.querySelector(`.team.winner-spot[data-slot="15"]`); // Slot for Stanley Cup Final winner
        if (target) {
          target.textContent = team.textContent;
        }
      });
    });
  });
  