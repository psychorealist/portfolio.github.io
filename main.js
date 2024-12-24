// Locomotive Scroll Initialization (Commented Out)
// const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     smartphone: { smooth: true },
//     tablet: { smooth: true },
//     resetNativeScroll: true,
//     ignore: ['.custom-cursor'], // Ensures Locomotive Scroll doesn't interact with the cursor
// });
// console.log("Locomotive Scroll initialized with ignore: ", scroll);

// Custom Cursor
const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');
document.addEventListener('mouseenter', () => site_wide_cursor.style.display = 'block');
document.addEventListener('mouseleave', () => site_wide_cursor.style.display = 'none');
document.addEventListener('mousemove', TrackCursor);
document.addEventListener('mousedown', () => site_wide_cursor.classList.add('active'));
document.addEventListener('mouseup', () => site_wide_cursor.classList.remove('active'));

function TrackCursor(evt) {
    const cursorWidth = site_wide_cursor.offsetWidth;
    const cursorHeight = site_wide_cursor.offsetHeight;
    site_wide_cursor.style.transform = `translate(${evt.clientX - cursorWidth / 2}px, ${evt.clientY - cursorHeight / 2}px)`;
}

// Horizontal Scroll with Arrows
document.querySelectorAll('.imgL').forEach((container) => {
    const scrollContainer = container.querySelector('.scroll-container');
    const items = scrollContainer.querySelectorAll('img, video'); // Handle both images and videos
    const leftArrow = container.querySelector('.arrow.left');
    const rightArrow = container.querySelector('.arrow.right');
    
    let currentIndex = 0;

    function updateSlide() {
        const itemWidth = items[0].clientWidth; // Get item width
        scrollContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateSlide();
        }
    });
});

// Wheel Scrolling for Horizontal Scroll
document.querySelector('[data-scroll-container]').addEventListener('wheel', (e) => {
    const scrollContainer = e.currentTarget;
    const delta = e.deltaY;
    scrollContainer.scrollLeft += delta; // Scroll horizontally
});

// Video Playback Control
const videos = document.querySelectorAll('video');

function handleVideoPlayback() {
    videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play(); // Play video when in view
        } else {
            video.pause(); // Pause video when out of view
        }
    });
}

window.addEventListener('scroll', handleVideoPlayback);
