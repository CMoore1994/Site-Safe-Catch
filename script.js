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
