// Script for images on specific posts

function imageClick() {
    const modal = document.querySelector(".modal");

    document.querySelectorAll("figure img").forEach(image => {
        image.addEventListener('click', () => {
            const modalImage = document.querySelector(".modal-image");
            modalImage.style.display = "block";
            modal.style.display = "block";
            modalImage.src = image.src;
        });
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

export { imageClick };