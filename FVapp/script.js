document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.dropdown').forEach(menu => {
      menu.addEventListener("click", function(event) {
          if (window.innerWidth < 768) {  // Only toggle in mobile view
              let dropdownMenu = this.querySelector('.dropdown-menu');
              dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
          }
          event.stopPropagation();
      });
  });

  document.querySelector(".close-btn").addEventListener("click", () => {
      document.querySelector(".dropdown-menu").style.display = "none";
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const voiceToggle = document.getElementById("voiceMode");
  const paragraphText = "Barcelona secured a commanding 5-2 victory over Real Madrid in a thrilling encounter. Despite a close possession battle (51.2% for Barcelona vs. 48.8% for Real Madrid), Barcelona's attacking efficiency made the difference. They had 8 shots on goal compared to Madrid’s 6 and converted key chances effectively. Madrid led in shot attempts (19 vs. 14) and corner kicks (9 vs. 5), but their defense struggled. The match saw physical play with multiple yellow cards (5 for Madrid, 4 for Barcelona) and a balanced defensive effort with 3 saves for Madrid and 5 for Barcelona.";

  function speakText(text) {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1;  // Adjust speed (1 is normal)
      speech.pitch = 1; // Adjust pitch (1 is normal)
      speech.volume = 1; // Adjust volume (1 is max)
      speech.lang = "en-US"; // Set language

      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support speech synthesis.");
    }
  }
  
  voiceToggle.addEventListener("change", function () {
    if (this.checked) {
      speakText(paragraphText);
    } else {
      window.speechSynthesis.cancel(); // Stop speech if toggled off
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const voiceBtn = document.getElementById("voiceToggle");
  const paragraphText = "Barcelona secured a commanding 5-2 victory over Real Madrid in a thrilling encounter. Despite a close possession battle (51.2% for Barcelona vs. 48.8% for Real Madrid), Barcelona's attacking efficiency made the difference. They had 8 shots on goal compared to Madrid’s 6 and converted key chances effectively. Madrid led in shot attempts (19 vs. 14) and corner kicks (9 vs. 5), but their defense struggled. The match saw physical play with multiple yellow cards (5 for Madrid, 4 for Barcelona) and a balanced defensive effort with 3 saves for Madrid and 5 for Barcelona.";
  let speechActive = false; // Track speech status

  voiceBtn.addEventListener("click", function () {
      if (!speechActive) {
          speakText(paragraphText); // Start speaking
          voiceBtn.textContent = "🔇 Stop Voice";
      } else {
          window.speechSynthesis.cancel(); // Stop speaking
          voiceBtn.textContent = "🔊 Voice Mode";
      }
      speechActive = !speechActive;
  });

  function speakText(text) {
      if ("speechSynthesis" in window) {
          const speech = new SpeechSynthesisUtterance(text);
          speech.rate = 1;  // Normal speed
          speech.pitch = 1; // Normal pitch
          speech.volume = 1; // Max volume
          speech.lang = "en-US"; // English (US)
          window.speechSynthesis.speak(speech);
      } else {
          alert("Sorry, your browser does not support speech synthesis.");
      }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const voiceModeToggle = document.getElementById('voiceMode');
  const team1 = document.getElementById('team1');
  const team2 = document.getElementById('team2');
  const score = document.getElementById('score');

  // Tab functionality
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tab.dataset.tab) {
          content.classList.add('active');
        }
      });
    });
  });

  // Fetch live data
  async function fetchMatchData() {
    try {
      const response = await fetch(' http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard'); // Replace with actual API endpoint
      const data = await response.json();

      team1.textContent = data.team1;
      team2.textContent = data.team2;
      score.textContent = `${data.team1Score} - ${data.team2Score}`;

      if (voiceModeToggle.checked) {
        const utterance = new SpeechSynthesisUtterance(
          `The score is ${data.team1} ${data.team1Score}, ${data.team2} ${data.team2Score}`
        );
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  }

  // Voice mode functionality
  voiceModeToggle.addEventListener('change', () => {
    if (voiceModeToggle.checked) {
      fetchMatchData();
    }
  });

  // Fetch match data every minute
  setInterval(fetchMatchData, 60000);
  fetchMatchData();
});

