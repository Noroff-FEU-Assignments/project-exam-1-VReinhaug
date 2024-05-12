// URL to fetch products from
const baseUrl = "https://www.veronika-codes.one/wp-json/wp/v2/posts?per_page=10&_embed";
const postContainer = document.querySelector(".blog-posts-container");
const loadMoreButton = document.querySelector("#loadMoreButton");
const loader = document.querySelector(".loader");

let currentPage = 1;

async function getPosts() {
    try {
        loader.style.display = "block";
        loadMoreButton.style.display = "none"; // Hide button while fetching posts
        const response = await fetch(`${baseUrl}&page=${currentPage}`);
        const results = await response.json();

        if (results.length === 0) {
            loadMoreButton.style.display = "none"; // Hide button if no posts are returned
            return;
        }

        for (let i = 0; i < results.length; i++) {
            const blogPost = document.createElement("section");
            blogPost.classList.add("blog-post");
            blogPost.innerHTML = `<a href="blog/post.html?post=${results[i].slug}" class="featured-image">
                                        <img src="${results[i]._embedded["wp:featuredmedia"][0].source_url}" alt="${results[i]._embedded["wp:featuredmedia"][0].alt_text}"/>
                                    </a>
                                    <div class="post-details">
                                        <h2>${results[i].title.rendered}</h2>
                                        <p>${results[i].excerpt.rendered}</p>
                                        <div class="cta-button">
                                            <a class="button" href="blog/post.html?post=${results[i].slug}">Read more..</a>
                                        </div>
                                    </div>`;
            postContainer.appendChild(blogPost);
        }

        currentPage++;
        
        // Hide the button if the number of fetched posts is less than the per page count
        if (results.length < 10) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "inline";
        }
    } catch(error) {
        postContainer.innerHTML = message("error");
    } finally {
        loader.style.display = "none";
    }
}
        
        
loadMoreButton.addEventListener("click", getPosts);

getPosts();