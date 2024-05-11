document.addEventListener("DOMContentLoaded", function() {
    const latestCarousel = document.querySelector(".latest-carousel");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const dotContainer = document.querySelector(".carousel-dots");
    const loader = document.querySelector(".loader");

    let currentIndex = 0;

    loader.style.display = "block";

    fetch("https://www.veronika-codes.one/wp-json/wp/v2/posts?_embed&per_page=4")
        .then(response => response.json())
        .then(posts => {

            posts.forEach(post => {
            const imageUrl = post._embedded['wp:featuredmedia'][0].source_url; 
            const title = post._embedded["wp:term"][1][0].name;
            const alt = post._embedded["wp:featuredmedia"][0].alt_text;
            const link = post.slug;

            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            carouselItem.innerHTML = `<a href="blog/post.html?post=${link}">
                                        <img src="${imageUrl}" alt="${alt}">
                                        <div class="carousel-caption">
                                            <h3>${title}</h3>
                                        </div>
                                    </a>`;

            latestCarousel.appendChild(carouselItem);
            loader.style.display = "none";
        });

        initializeCarousel(posts.length);
        createDots(posts.length);
        })

        .catch(error => {
            latestCarousel.innerHTML = message ("error");
        });

        function initializeCarousel(numSlides) {

        // Update carousel position
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
        // Right ammount of images based on screen size
        const maxIndex = (window.innerWidth > 750) ? numSlides - 2 : numSlides - 1;
            if (currentIndex < maxIndex) {
             currentIndex++;
             updateCarousel();
             updateDots();
            }
        }

        // Event listeners for swipe on touch screen
        let touchStartX = 0;
        let touchEndX = 0;

        latestCarousel.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
        });

        latestCarousel.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].clientX;
            handleGesture();
        });

        function handleGesture() {
            const difference = touchStartX - touchEndX;
            if (Math.abs(difference) > 100) {
                // Swipe left
                if (difference > 0) {
                    goToNextSlide();
                }
                // Swipe right
                else {
                    goToPrevSlide();
                }
            }
        }

        // Event listeners for navigation buttons
        prevButton.addEventListener('click', goToPrevSlide);
        nextButton.addEventListener('click', goToNextSlide);

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

        // Function to update the dots
        function updateDots() {
            const dots = dotContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
            });
        }
    });