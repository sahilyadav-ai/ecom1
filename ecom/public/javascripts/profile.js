const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("img-preview");
const toast = document.getElementById("toast");

fileInput.addEventListener("change", (e) => {
  if (e.target.files.length) {
    const src = URL.createObjectURL(e.target.files[0]);
    imagePreview.src = src;
    showToast();
  }
});

function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}