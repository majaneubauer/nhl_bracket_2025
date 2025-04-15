// Utility to render team button content with logo and name
function renderTeamContent(name, logo) {
    return `<img src="${logo}" alt="${name} Logo" /><span>${name}</span>`;
  }
  
// Round 1
document.querySelectorAll('.matchup[data-round="1"]').forEach(matchup => {
  const gameNum = parseInt(matchup.dataset.game);
  const teams = matchup.querySelectorAll('.team');

  teams.forEach(team => {
    team.addEventListener('click', () => {
      teams.forEach(t => t.classList.remove('winner'));
      team.classList.add('winner');

      const name = team.dataset.name;
      const logo = team.dataset.logo;
      const slotNum = gameNum;
      const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);

      if (target) {
        // Find the team-specific class (e.g., 'senators')
        const teamClass = Array.from(team.classList).find(
          c => c !== 'team' && c !== 'winner'
        );

        // Reset and apply correct class
        target.className = 'team winner-spot';
        if (teamClass) {
          target.classList.add(teamClass);
        }

        // Update content
        target.innerHTML = renderTeamContent(name, logo);
        target.dataset.name = name;
        target.dataset.logo = logo;
      }
    });
  });
});
  
// Round 2
document.querySelectorAll('.matchup[data-round="2"]').forEach(matchup => {
  const gameNum = parseInt(matchup.dataset.game); // e.g., 3 or 4
  const teams = matchup.querySelectorAll('.team');

  teams.forEach(team => {
    team.addEventListener('click', () => {
      teams.forEach(t => t.classList.remove('winner'));
      team.classList.add('winner');

      const name = team.dataset.name;
      const logo = team.dataset.logo;
      const slotNum = gameNum + 8; // Adjusting for Round 2's winner spot
      const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);

      if (target) {
        // Find the team-specific class (e.g., senators, leafs)
        const teamClass = Array.from(team.classList).find(
          c => c !== 'team' && c !== 'winner' && c !== 'winner-spot'
        );

        // Reset and apply the proper classes to target
        target.className = 'team winner-spot'; // Resetting the base class
        if (teamClass) {
          target.classList.add(teamClass); // Add team-specific class
        }

        target.innerHTML = renderTeamContent(name, logo);
        target.dataset.name = name;
        target.dataset.logo = logo;
      }
    });
  });
});




  
// Round 3
document.querySelectorAll('.matchup[data-round="3"]').forEach(matchup => {
  const gameNum = parseInt(matchup.dataset.game);
  const teams = matchup.querySelectorAll('.team');

  teams.forEach(team => {
    team.addEventListener('click', () => {
      teams.forEach(t => t.classList.remove('winner'));
      team.classList.add('winner');

      const name = team.dataset.name;
      const logo = team.dataset.logo;
      const slotNum = gameNum + 12; // Adjust this depending on your total games setup
      const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);

      if (target) {
        // Extract team-specific class (e.g., senators, leafs)
        const teamClass = Array.from(team.classList).find(
          c => c !== 'team' && c !== 'winner' && c !== 'winner-spot'
        );

        // Clear previous class and re-apply correct ones
        target.className = 'team winner-spot';
        if (teamClass) {
          target.classList.add(teamClass);
        }

        target.innerHTML = renderTeamContent(name, logo);
        target.dataset.name = name;
        target.dataset.logo = logo;
      }
    });
  });
});
  
  // Round 4 (Stanley Cup Final)
  document.querySelectorAll('.matchup[data-round="4"]').forEach(matchup => {
    const teams = matchup.querySelectorAll('.team');
  
    teams.forEach(team => {
      team.addEventListener('click', () => {
        teams.forEach(t => t.classList.remove('winner'));
        team.classList.add('winner');
  
        const name = team.dataset.name;
        const logo = team.dataset.logo;
  
        // Final round winner spot
        const finalTarget = document.querySelector(`.team.winner-spot[data-slot="15"]`);
        if (finalTarget) {
          finalTarget.innerHTML = renderTeamContent(name, logo);
          finalTarget.dataset.name = name;
          finalTarget.dataset.logo = logo;
        }
  
        // Show Champion at the bottom
        const championDisplay = document.getElementById('champion-name');
        if (championDisplay) {
          championDisplay.innerHTML = renderTeamContent(name, logo);
        }
      });
    });
  });
  