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

// ------------------ Form submission ------------------
document.getElementById("incidentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const site = document.getElementById("siteName").value;
  const description = document.getElementById("description").value;
  const fileInput = document.getElementById("photo");
  const file = fileInput.files[0];

  // helper: convert a File to base64 (strip the data: prefix)
  const fileToBase64 = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result; // e.g. "data:image/png;base64,AAAA..."
        const base64 = String(result).split(",")[1] || "";
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  let photo = null, mimeType = null, filename = null;
  if (file) {
    photo = await fileToBase64(file);
    mimeType = file.type || "application/octet-stream";
    filename = file.name || "upload";
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwfKNQ01IrZQTCqOJflFv7pS0fyfl5o8p0JMw9Shjg_hYOcJHLTHQc5RHfZ4MYX8fW9jw/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site,
        description,
        photo,      // base64 string (or null if no file)
        mimeType,   // e.g. "image/png"
        filename    // e.g. "picture.png"
      }),
    });

    const result = await response.json();
    if (result && result.result === "Success") {
      alert("Submitted successfully!");
      e.target.reset();
    } else {
      console.error("Unexpected response:", result);
      alert("Something went wrong.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong.");
  }
});
