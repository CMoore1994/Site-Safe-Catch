// --------------- Dropdown loader ---------------
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
});

// --------------- Form submission ---------------
document.getElementById("incidentForm").addEventListener("submit", async function (e) {
  e.preventDefault();


  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwfKNQ01IrZQTCqOJflFv7pS0fyfl5o8p0JMw9Shjg_hYOcJHLTHQc5RHfZ4MYX8fW9jw/exec";

  const form = e.target;
  const site = document.getElementById("siteName").value;
  const description = document.getElementById("description").value;
  const fileInput = document.getElementById("photo");
  const file = fileInput.files[0];

  // Read file to base64 (if provided)
  let photoBase64 = "";
  let mimeType = "";
  let filename = "";

  if (file) {
    mimeType = file.type || "application/octet-stream";
    filename = file.name || ("photo_" + Date.now());
    photoBase64 = await toBase64(file); // returns dataURL
    // Strip "data:mime/type;base64," prefix
    const comma = photoBase64.indexOf(",");
    photoBase64 = comma >= 0 ? photoBase64.slice(comma + 1) : photoBase64;
  }

  const payload = {
    site,
    description,
    photo: photoBase64, // base64 string or empty
    mimeType,
    filename
  };

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result && result.result === "Success") {
      alert("Submitted successfully!");
      form.reset();
    } else {
      console.error("Backend error:", result);
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong.");
  }
});

// Helper: file -> base64 dataURL
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
