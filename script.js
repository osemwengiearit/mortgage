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

const amountError = document.getElementById("amount-error");
const termError = document.getElementById("term-error");
const rateError = document.getElementById("rate-error");
const typeError = document.getElementById("type-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

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

function validateForm() {
  let valid = true;

  // Hide previous errors
  amountError.classList.add("hidden");
  termError.classList.add("hidden");
  rateError.classList.add("hidden");
  typeError.classList.add("hidden");

  // Remove red borders
  amount.parentElement.classList.remove("input-error");
  term.parentElement.classList.remove("input-error");
  rate.parentElement.classList.remove("input-error");

  // Mortgage Amount
  if (amount.value.trim() === "") {
    amountError.classList.remove("hidden");
    amount.parentElement.classList.add("input-error");
    valid = false;
  }

  // Mortgage Term
  if (term.value.trim() === "") {
    termError.classList.remove("hidden");
    term.parentElement.classList.add("input-error");
    valid = false;
  }

  // Interest Rate
  if (rate.value.trim() === "") {
    rateError.classList.remove("hidden");
    rate.parentElement.classList.add("input-error");
    valid = false;
  }

  // Mortgage Type
  if (!repayment.checked && !interestOnly.checked) {
    typeError.classList.remove("hidden");
    valid = false;
  }

  return valid;
}
