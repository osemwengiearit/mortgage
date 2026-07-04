const form = document.getElementById("mortgage-form");
const emptyState = document.getElementById("empty-state");
const completedState = document.getElementById("completed-state");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emptyState.classList.add("hidden");
  completedState.classList.remove("hidden");
});
