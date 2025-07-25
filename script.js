const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbykYeDUywRdXY_nUCFfv0QDEfEca0gY-nVTuQ4QATducaHV3XNSN-ehcjMqhy9Zld0/exec";

// Load brand names on page load
document.addEventListener("DOMContentLoaded", () => {
  fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(brands => {
      const brandSelect = document.getElementById("brand_name");
      brandSelect.innerHTML = '<option value="">-- Select Brand --</option>';
      brands.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Error loading brand names:", err);
      alert("❌ Failed to load brand names.");
    });
});

// Submit form
document.getElementById("tireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    date: document.getElementById("date").value,
    tire_size: document.getElementById("tire_size").value,
    brand_name: document.getElementById("brand_name").value,
    load_index: document.getElementById("load_index").value,
    serial_number: document.getElementById("serial_number").value,
    test_type: document.getElementById("test_type").value,
    test_description: document.getElementById("test_description").value
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.text())
    .then(result => {
      if (result === "Success") {
        alert("✅ Data submitted successfully!");
        document.getElementById("tireForm").reset();
      } else {
        throw new Error("Failed to submit");
      }
    })
    .catch(error => {
      console.error("Submission error:", error);
      alert("❌ Failed to submit data.");
    });
});
