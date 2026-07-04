const form = document.getElementById("mortgage-form");

const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");

const monthlyPayment = document.getElementById("monthly-payment");
const totalPayment = document.getElementById("total-payment");

const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interest");

const emptyState = document.getElementById("empty-state");
const completedState = document.getElementById("completed-state");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  calculateMortgage();

  emptyState.classList.add("hidden");
  completedState.classList.remove("hidden");
});

function calculateMortgage() {
  const principal = Number(amount.value);
  const years = Number(term.value);
  const annualRate = Number(rate.value);

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  let monthly;
  let total;

  if (repayment.checked) {
    // Repayment Mortgage
    monthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);

    total = monthly * months;
  } else if (interestOnly.checked) {
    // Interest Only Mortgage
    monthly = principal * monthlyRate;

    total = monthly * months;
  }

  monthlyPayment.textContent =
    "£" +
    monthly.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  totalPayment.textContent =
    "£" +
    total.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
