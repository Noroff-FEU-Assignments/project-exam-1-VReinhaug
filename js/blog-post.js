document.addEventListener("DOMContentLoaded", async function() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const slug = params.get("post");

    const baseUrl = `https://www.veronika-codes.one/wp-json/wp/v2/posts?slug=${slug}&_embed`;

    const postContainer = document.querySelector(".specific-post");
    const loader = document.querySelector(".loader");

    try {
        // Show loader while fetching content
        loader.style.display = "block";

        const response = await fetch(baseUrl);
        const postDetails = await response.json();

        const postHtml = `
            <div class="post-image">
                <img class="post-image" src="${postDetails[0]._embedded["wp:featuredmedia"][0].source_url}" alt="${postDetails[0]._embedded["wp:featuredmedia"][0].alt_text}">
            </div>
            <H1>${postDetails[0].title.rendered}</H1>
            <div class="content">${postDetails[0].content.rendered}</div>
        `;

        // Change the page title
        document.title = "My travel blog | " + postDetails[0]._embedded["wp:term"][1][0].name;

        postContainer.innerHTML = postHtml;

        // Make images bigger by clicking on them
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

                // Close when clicking outside the image
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
    finally {
        // Hide loader after content is loaded
        loader.style.display = "none";
    }
});
