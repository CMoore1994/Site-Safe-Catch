// ----------------- Dropdown loader -----------------
document.addEventListener("DOMContentLoaded", () => {
  const siteSelect = document.getElementById("siteName");

  fetch("sites.json")
    .then(res => res.json())
    .then(list => {
      list.forEach(site => {
        const opt = document.createElement("option");
        opt.value = site;
        opt.textContent = site;
        siteSelect.appendChild(opt);
      });
    })
    .catch(err => console.error("Error loading sites:", err));
});   // ✅ CLOSES the dropdown code block


// ----------------- Form submission -----------------
document.getElementById("incidentForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwfKNQ01IrZQTCqOJflFv7pS0fyfl5o8p0JMw9Shjg_hYOcJHLTHQc5RHfZ4MYX8fW9jw/exec", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    alert("Submitted successfully!");
    form.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong.");
  }
});
