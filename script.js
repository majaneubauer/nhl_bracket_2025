// Utility to render team button content with logo and name
function renderTeamContent(name, logo) {
  return `<img src="${logo}" alt="${name} Logo" /><span>${name}</span>`;
}

// ==========================
// BRACKET ROUND CLICK LOGIC
// ==========================

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
        const teamClass = Array.from(team.classList).find(c => c !== 'team' && c !== 'winner');
        target.className = 'team winner-spot';
        if (teamClass) target.classList.add(teamClass);
        target.innerHTML = renderTeamContent(name, logo);
        target.dataset.name = name;
        target.dataset.logo = logo;
      }
    });
  });
});

// Round 2
document.querySelectorAll('.matchup[data-round="2"]').forEach(matchup => {
  const gameNum = parseInt(matchup.dataset.game);
  const teams = matchup.querySelectorAll('.team');

  teams.forEach(team => {
    team.addEventListener('click', () => {
      teams.forEach(t => t.classList.remove('winner'));
      team.classList.add('winner');

      const name = team.dataset.name;
      const logo = team.dataset.logo;
      const slotNum = gameNum + 8;
      const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);

      if (target) {
        const teamClass = Array.from(team.classList).find(c => c !== 'team' && c !== 'winner' && c !== 'winner-spot');
        target.className = 'team winner-spot';
        if (teamClass) target.classList.add(teamClass);
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
      const slotNum = gameNum + 12;
      const target = document.querySelector(`.team.winner-spot[data-slot="${slotNum}"]`);

      if (target) {
        const teamClass = Array.from(team.classList).find(c => c !== 'team' && c !== 'winner' && c !== 'winner-spot');
        target.className = 'team winner-spot';
        if (teamClass) target.classList.add(teamClass);
        target.innerHTML = renderTeamContent(name, logo);
        target.dataset.name = name;
        target.dataset.logo = logo;
      }
    });
  });
});

// Round 4 - Finals
document.querySelectorAll('.matchup[data-round="4"]').forEach(matchup => {
  const teams = matchup.querySelectorAll('.team');

  teams.forEach(team => {
    team.addEventListener('click', () => {
      teams.forEach(t => t.classList.remove('winner'));
      team.classList.add('winner');

      const name = team.dataset.name;
      const logo = team.dataset.logo;

      const finalTarget = document.querySelector(`.team.winner-spot[data-slot="15"]`);
      if (finalTarget) {
        finalTarget.innerHTML = renderTeamContent(name, logo);
        finalTarget.dataset.name = name;
        finalTarget.dataset.logo = logo;
      }

      const championDisplay = document.getElementById('champion-name');
      if (championDisplay) {
        championDisplay.innerHTML = renderTeamContent(name, logo);
      }
    });
  });
});

// =============================
// TEAM RANKINGS FETCHING LOGIC
// =============================
async function fetchTeamRankings() {
  const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/standings/now';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const teams = data.standings;

    teams.forEach((team) => {
      const teamName = team.teamName?.default || "Unknown Team";
      const teamPoints = team.points || 0;
      const divisionAbbrev = team.divisionAbbrev;
      const divisionSequence = team.divisionSequence;

      const teamElement = document.querySelector(`[data-name="${teamName}"]`);
      if (teamElement) {
        const existing = teamElement.querySelector('.team-performance');
        if (existing) existing.remove();

        const rankElement = document.createElement('span');
        rankElement.className = 'team-performance';
        rankElement.innerText = `Standing: ${divisionAbbrev}${divisionSequence} | Points: ${teamPoints}`;
        teamElement.appendChild(rankElement);
      }
    });
  } catch (error) {
    console.error('Error fetching standings:', error);
  }
}
fetchTeamRankings();
setInterval(fetchTeamRankings, 300000); // 5 minutes

// =============================
// POPUP + TOP SCORERS LOGIC
// =============================
// Grab necessary elements for the analysis popup
const analysisButtons = document.querySelectorAll('.analysis-btn');
const popup = document.getElementById('analysis-popup');
const popupTitle = document.getElementById('analysis-title');
const popupBody = document.getElementById('analysis-body');
const closeBtn = document.getElementById('close-popup');


analysisButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    popupTitle.textContent = "Matchup Analysis: Top Goal Scorers";
    popupBody.textContent = ""; // Clear old text content if you’re not using it

    // Load scorers and open popup
    await fetchTopScorers();

    popup.classList.remove('hidden');
    popup.style.display = 'flex';
    document.body.classList.add('popup-active');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  popup.style.display = 'none';
  document.body.classList.remove('popup-active');
});

async function fetchTopScorers() {
  const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=goals';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const players = data.goals;
    const topScorers = {};

    players.forEach(player => {
      const teamAbbrev = player.teamAbbrev;
      if (!topScorers[teamAbbrev]) {
        topScorers[teamAbbrev] = {
          playerName: `${player.firstName.default} ${player.lastName.default}`,
          goals: player.value,
          teamName: player.teamName.default,
          teamAbbrev: teamAbbrev,
          teamLogo: `https://assets.nhle.com/logos/nhl/svg/${teamAbbrev}_light.svg`
        };
      }
    });

    const container = document.getElementById('top-scorers-container');
    container.innerHTML = '';

    Object.values(topScorers).forEach(scorer => {
      const playerDiv = document.createElement('div');
      playerDiv.classList.add('scorer');
      playerDiv.innerHTML = `
        <div class="scorer-info">
          <img src="${scorer.teamLogo}" alt="${scorer.teamName}" class="team-logo">
          <div>
            <strong>${scorer.teamName} (${scorer.teamAbbrev})</strong><br>
            ${scorer.playerName} - <span class="goals">${scorer.goals} goals</span>
          </div>
        </div>
      `;
      container.appendChild(playerDiv);
    });

  } catch (error) {
    console.error('Error fetching top scorers:', error);
  }
}