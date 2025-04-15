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
  

  // Function to fetch and display NHL team rankings
  async function fetchTeamRankings() {
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/standings/now'; // API URL with CORS proxy
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        console.log('API Response:', data); // Log the full API response
        const teams = data.standings; // Access the standings directly
  
        // Log the first team object to inspect the structure
        console.log('First team structure:', teams[0]);
  
        // Loop through the teams to get the division sequence and points
        teams.forEach((team) => {
            // Log each team's structure for debugging
            console.log('Team in loop:', team);
  
            // Safely extract division sequence and points
            const divisionSequence = team.divisionSequence || "Unknown Division"; // If division sequence is undefined, fallback
            const teamPoints = team.points || 0; // Safeguard for missing points
  
            // Query the team button based on team name
            const teamName = team.teamName.default; // Assuming the team name is under 'teamName.default'
            const teamElement = document.querySelector(`[data-name="${teamName}"]`);
            
            if (teamElement) {
                // Create a container to hold the rank and points, below the team name
                const rankContainer = document.createElement('div');
                rankContainer.className = 'team-performance-container';
                rankContainer.innerHTML = `
                    <span class="team-performance">
                        Rank: ${divisionSequence} | Points: ${teamPoints}
                    </span>
                `;
                
                // Append the rank container below the team name
                teamElement.appendChild(rankContainer);
            }
        });
    } catch (error) {
        console.error('Error fetching standings:', error);
    }
}

  // Call the function to populate rankings
  fetchTeamRankings();

  // Update rankings periodically (every 5 minutes)
  setInterval(fetchTeamRankings, 300000);
