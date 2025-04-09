// Store images for each category
const clothingImages = {
    topwear: [],
    bottomwear: [],
    dresses: [],
    ethnic: [],
    shoes: [],
    sandals: []
};

// Save uploaded images to their respective categories
function saveImages() {
    const categories = ['topwear', 'bottomwear', 'dresses', 'ethnic', 'shoes', 'sandals'];
    let totalFiles = 0;
    let filesLoaded = 0;

    categories.forEach(category => {
        const input = document.getElementById(category);
        if (input && input.files.length > 0) {
            totalFiles += input.files.length;

            for (const file of input.files) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    clothingImages[category].push(e.target.result);
                    filesLoaded++;

                    // Show alert only after all images are saved
                    if (filesLoaded === totalFiles) {
                        alert("Images saved successfully!");
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    });

    if (totalFiles === 0) {
        alert("No images selected.");
    }
}

// Generate random images from selected categories
function generateRandomImages() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Clear previous results

    const selectedCategories = [];

    // Collect selected categories
    ['topwear', 'bottomwear', 'dresses', 'ethnic', 'shoes', 'sandals'].forEach(category => {
        if (document.getElementById(`checkbox-${category}`).checked) {
            selectedCategories.push(category);
        }
    });

    if (selectedCategories.length === 0) {
        alert("Please select at least one clothing type!");
        return;
    }

    selectedCategories.forEach(category => {
        const box = document.createElement("div");
        box.classList.add("box");

        if (clothingImages[category].length > 0) {
            const randomIndex = Math.floor(Math.random() * clothingImages[category].length);
            const imgSrc = clothingImages[category][randomIndex];

            const img = document.createElement("img");
            img.src = imgSrc;
            img.style.width = "180px";
            img.style.height = "180px";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            img.style.margin = "10px";
            img.style.transition = "transform 0.3s";

            img.onmouseover = () => img.style.transform = "scale(1.05)";
            img.onmouseout = () => img.style.transform = "scale(1)";

            box.appendChild(img);
        } else {
            // Fallback message if no images are available
            box.textContent = `No ${category} images available`;
            box.style.padding = "20px";
            box.style.backgroundColor = "#f4f4f4";
            box.style.color = "#555";
            box.style.borderRadius = "10px";
            box.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            box.style.textAlign = "center";
        }

        resultDiv.appendChild(box);
    });

    // Open the modal after generating images
    openModal();
}

// Modal functionality
function openModal() {
    const modal = document.getElementById("outfitModal");
    modal.style.display = "block";

    // Prevent modal from closing when clicking inside it
    const content = document.querySelector(".modal-content");
    content.onclick = (event) => event.stopPropagation();
}

// Close modal
function closeModal() {
    const modal = document.getElementById("outfitModal");
    modal.style.display = "none";
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    const modal = document.getElementById("outfitModal");
    if (event.target === modal) {
        closeModal();
    }
};
