document.addEventListener("DOMContentLoaded", function() {
    const latestCarousel = document.querySelector(".latest-carousel");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const dotContainer = document.querySelector(".carousel-dots");

    let currentIndex = 0;

    fetch("https://www.veronika-codes.one/wp-json/wp/v2/posts?_embed&per_page=4")
        .then(response => response.json())
        .then(posts => {

            posts.forEach(post => {
            const imageUrl = post._embedded['wp:featuredmedia'][0].source_url; 
            const title = post._embedded["wp:term"][1][0].name;
            const alt = post._embedded["wp:featuredmedia"][0].alt_text;
            const link = post.slug;

            console.log(post);

            // Create carousel item
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            carouselItem.innerHTML = `<a href="blog/post.html?post=${link}">
                                        <img src="${imageUrl}" alt="${alt}">
                                        <div class="carousel-caption">
                                            <h3>${title}</h3>
                                        </div>
                                    </a>`;

            latestCarousel.appendChild(carouselItem);
        });

        // Initialize carousel
        initializeCarousel(posts.length);
        createDots(posts.length);
        })

        .catch(error => {
            console.error('Error fetching posts:', error);
        });

        function initializeCarousel(numSlides) {

        // Function to update carousel position
        function updateCarousel() {
            const itemWidth = latestCarousel.clientWidth / (window.innerWidth > 750 ? 2 : 1);
            const newPosition = -currentIndex * itemWidth;
            latestCarousel.style.transform = `translateX(${newPosition}px)`;
        }

        // Function to navigate to the previous slide
        function goToPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            updateDots();
        }
        }

        // Function to navigate to the next slide
        function goToNextSlide() {
            if (currentIndex < numSlides - 2) {
              currentIndex++;
              updateCarousel();
              updateDots();
            }
        }

        // Function to navigate to a specific slide
        function goToSlide(index) {
            if (index >= 0 && index < numSlides) {
            currentIndex = index;
            updateCarousel();
            updateDots();
            }
        }

        // Event listeners for navigation buttons
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);

        // Initialize carousel position
        updateCarousel();
        }

        // Function to create dots
        function createDots(numDots) {
            for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            dotContainer.appendChild(dot);
            }
            updateDots();
        }

        // Function to update dots' appearance
        function updateDots() {
            const dots = dotContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            });
        }
    });