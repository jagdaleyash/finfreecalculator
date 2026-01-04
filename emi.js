const loanRange = document.getElementById("loanRange");
const loanInput = document.getElementById("loanInput");
const rateRange = document.getElementById("rateRange");
const rateInput = document.getElementById("rateInput");
const tenureRange = document.getElementById("tenureRange");
const tenureInput = document.getElementById("tenureInput");
const emiResult = document.getElementById("emiResult");

let chart;

function syncInputs(range, input) {
  range.value = input.value;
}

function calculateEMI() {
  const P = +loanInput.value;
  const r = +rateInput.value / 12 / 100;
  const n = +tenureInput.value * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - P;

  emiResult.innerText = `EMI: ₹${Math.round(emi).toLocaleString("en-IN")}`;

  updateChart(P, interest);
}

function updateChart(principal, interest) {
  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("emiChart"), {
    type: "pie",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [{
        data: [principal, interest]
      }]
    }
  });
}

/* Sync events */
[loanRange, rateRange, tenureRange].forEach(el => {
  el.addEventListener("input", () => {
    loanInput.value = loanRange.value;
    rateInput.value = rateRange.value;
    tenureInput.value = tenureRange.value;
    calculateEMI();
  });
});

[loanInput, rateInput, tenureInput].forEach(el => {
  el.addEventListener("input", () => {
    syncInputs(loanRange, loanInput);
    syncInputs(rateRange, rateInput);
    syncInputs(tenureRange, tenureInput);
    calculateEMI();
  });
});

calculateEMI();
