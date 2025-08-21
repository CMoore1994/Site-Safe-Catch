document.getElementById("incidentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("status").textContent = "✅ Incident submitted successfully! (demo only)";
});
