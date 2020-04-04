const toggle = document.getElementById("toggle");
const openModal = document.getElementById("open");
const closeModal = document.getElementById("close");
const modal = document.getElementById("modal");

toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

openModal.addEventListener("click", () => modal.classList.add("show-modal"));
closeModal.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);

window.addEventListener("click", e => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
  console.log("clicked to close", e.target);
  return;
});
