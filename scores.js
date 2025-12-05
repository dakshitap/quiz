// scores.js
const currentUser = JSON.parse(localStorage.getItem("user"));
const scoresTableBody = document.getElementById("scoresTableBody");

if (!currentUser) {
  scoresTableBody.innerHTML = `<tr><td colspan="8" class="no-scores-msg">Please login first to see your scores.</td></tr>`;
} else {
  const allScores = JSON.parse(localStorage.getItem("scores")) || {};
  const userScores = allScores[currentUser.email] || [];

  if (userScores.length === 0) {
    scoresTableBody.innerHTML = `<tr><td colspan="8" class="no-scores-msg">No scores found. Take some quizzes to get started!</td></tr>`;
  } else {
    scoresTableBody.innerHTML = ""; // Clear the placeholder row
    userScores.forEach((entry, index) => {
      const row = document.createElement("tr");
      
      // Calculate percentage
      const totalQuestions = entry.totalQuestions || 1;
      const percentage = Math.round((entry.score / totalQuestions) * 100);
      
      // Format date and time
      let dateStr = "N/A";
      let timeStr = "N/A";
      if (entry.timestamp) {
        const date = new Date(entry.timestamp);
        dateStr = date.toLocaleDateString("en-IN");
        timeStr = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
      } else if (entry.date) {
        dateStr = entry.date;
      }
      
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${currentUser.name || currentUser.email}</td>
        <td>${entry.branch || "N/A"}</td>
        <td>${entry.topic || entry.chapter || "General Quiz"}</td>
        <td>${entry.score}/${totalQuestions}</td>
        <td><strong>${percentage}%</strong></td>
        <td>${dateStr}</td>
        <td>${timeStr}</td>
      `;
      scoresTableBody.appendChild(row);
    });
  }
}
