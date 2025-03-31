document.addEventListener("DOMContentLoaded", () => {
    const voiceToggle = document.getElementById("voiceMode");
    const team1 = document.getElementById("team1");
    const score = document.getElementById("score");
    const team2 = document.getElementById("team2");
  
    // Simulate fetching data
    fetch("https://api.example.com/overview")
      .then(response => response.json())
      .then(data => {
        team1.textContent = data.team1.name;
        score.textContent = data.score;
        team2.textContent = data.team2.name;
  
        if (voiceToggle.checked) {
          const utterance = new SpeechSynthesisUtterance(
            `The score is ${data.team1.name} ${data.score} ${data.team2.name}`
          );
          speechSynthesis.speak(utterance);
        }
      });
  });
  