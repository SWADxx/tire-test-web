const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbykYeDUywRdXY_nUCFfv0QDEfEca0gY-nVTuQ4QATducaHV3XNSN-ehcjMqhy9Zld0/exec";

window.onload = function () {
  loadBrandNames();
};

function loadBrandNames() {
  fetch(WEB_APP_URL)
    .then(res => res.json())
    .then(data => {
      const brandSelect = document.getElementById("brand_name");
      brandSelect.innerHTML = '<option value="">-- Select Brand --</option>';
      data.forEach(brand => {
        const option = document.createElement("option");
        option.value = brand;
        option.textContent = brand;
        brandSelect.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Error loading brands:", err);
      alert("❌ Failed to load brand names.");
    });
}

function submitForm(event) {
  event.preventDefault();

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
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(response => {
      if (response.includes("Success")) {
        alert("✅ Data submitted successfully!");
        document.getElementById("tireForm").reset();
      } else {
        alert("❌ Error submitting data: " + response);
      }
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("❌ Failed to submit data.");
    });
}
