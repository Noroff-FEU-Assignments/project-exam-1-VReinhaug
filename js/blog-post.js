document.addEventListener("DOMContentLoaded", function() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const slug = params.get("post");

    const baseUrl = `https://www.veronika-codes.one/wp-json/wp/v2/posts?slug=${slug}&_embed`;

    const postContainer = document.querySelector(".specific-post");
    const featuredImage = document.getElementById("featuredImage");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");

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
                                        <div>${postDetails[0].content.rendered}</div>`;

            // Change page title
            document.title = "My travel blog | " + postDetails[0]._embedded["wp:term"][1][0].name;

        } catch (error) {
            postContainer.innerHTML = message("error");
        }
    }

    getPost();
});
