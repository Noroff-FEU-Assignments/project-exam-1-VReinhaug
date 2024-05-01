document.addEventListener("DOMContentLoaded", function() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const slug = params.get("post");

    const baseUrl = `https://www.veronika-codes.one/wp-json/wp/v2/posts?slug=${slug}&_embed`;

    const postContainer = document.querySelector(".specific-post");

    async function getPost() {
        try {
            const response = await fetch(baseUrl);
            const postDetails = await response.json();

            if (!postDetails || postDetails.length === 0) {
                throw new Error("Post not found");
            }

            postContainer.innerHTML += `<div class="post-image">
                                            <img src="${postDetails[0]._embedded["wp:featuredmedia"][0].source_url}" alt="${postDetails[0]._embedded["wp:featuredmedia"][0].alt_text}">
                                        </div>
                                        <H1>${postDetails[0].title.rendered}</H1>
                                        <div class="content">${postDetails[0].content.rendered}</div>`;

            // Change title
            document.title = "My travel blog | " + postDetails[0]._embedded["wp:term"][1][0].name;

            // Add event listener to images
            document.querySelectorAll(".specific-post .content .wp-block-image img").forEach(img => {
                img.addEventListener("click", function() {
                    const modalHtml = `
                        <div id="myModal" class="modal">
                            <span class="close">&times;</span>
                            <img class="modal-content" id="expandedImg">
                        </div>
                    `;
                    document.body.insertAdjacentHTML('beforeend', modalHtml);
                    const modal = document.getElementById("myModal");
                    const modalContent = document.getElementById("expandedImg");
                    modalContent.src = this.src;

                    // Close when clicking x
                    const closeBtn = document.querySelector(".close");
                    closeBtn.addEventListener("click", function() {
                        modal.remove();
                    });

                    // Close when clicking outside image
                    window.addEventListener("click", function(event) {
                        if (event.target == modal) {
                            modal.remove();
                        }
                    });
                });
            });

        } catch (error) {
            postContainer.innerHTML = message("error");
        }
    }

    getPost();
});
