document.addEventListener("DOMContentLoaded", () => {
  const uploadArea = document.getElementById("uploadArea");
  const uploadInput = document.getElementById("uploadInput");
  const uploadPreview = document.getElementById("uploadPreview");
  const uploadIcon = document.querySelector(".upload-icon");
  const uploadText = document.querySelector(".upload-text");
  const identifyBtn = document.getElementById("identifyBtn");
  const resultContent = document.getElementById("resultContent");
  const instructions = document.getElementById("instructions");
  const searchButton = document.getElementById("search-button");
  const searchButtonContainer = document.getElementById("search-button-container");

  let uploadedImage = null;

  // Drag and Drop Events
  uploadArea.addEventListener("click", () => uploadInput.click());

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("highlight");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("highlight");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("highlight");

    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  uploadInput.addEventListener("change", () => {
    if (uploadInput.files.length) {
      handleFile(uploadInput.files[0]);
    }
  });

  function handleFile(file) {
    if (!file.type.match("image.*")) {
      alert("Please upload an image file");
      return;
    }

    uploadedImage = file;

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadPreview.src = e.target.result;
      uploadPreview.style.display = "block";
      if (uploadIcon) uploadIcon.style.display = "none";
      if (uploadText) uploadText.style.display = "none";

      instructions.style.display = "none";
      searchButtonContainer.style.display = "none";
    };
    reader.readAsDataURL(file);
  }

  identifyBtn.addEventListener("click", function () {
    if (!uploadedImage) return;

    instructions.style.display = "block";
    searchButtonContainer.style.display = "block";

    const fileName = uploadedImage.name.replace(/\.[^/.]+$/, "");
    searchButton.dataset.fileName = fileName;
  });

  searchButton.addEventListener("click", function () {
    const fileName = this.dataset.fileName || '';
    let searchTerms = 'pest identification control';

    if (fileName) {
      const possiblePestNames = fileName.split(/[_\-\s.]+/);
      const potentialPestName = possiblePestNames.reduce((a, b) => a.length > b.length ? a : b);

      if (potentialPestName.length > 3) {
        searchTerms = `${potentialPestName} pest identification control`;
      }
    }

    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchTerms)}`, '_blank');
  });
});