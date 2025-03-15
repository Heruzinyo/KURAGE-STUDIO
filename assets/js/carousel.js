document.addEventListener('DOMContentLoaded', function() {
    // Load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Carousel functionality
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    
    let currentIndex = 0;
    const itemCount = items.length;
    let youtubePlayer = null;
    let ytReady = false;
    let thumbnails = [];
    
    // YouTube API callback
    window.onYouTubeIframeAPIReady = function() {
        ytReady = true;
        const youtubeItems = document.querySelectorAll('.carousel-item[data-type="youtube"]');
        
        youtubeItems.forEach(item => {
            const videoId = item.getAttribute('data-id');
            const iframe = item.querySelector('iframe');
            
            if (iframe) {
                // Create YouTube player for this iframe
                new YT.Player(iframe, {
                    videoId: videoId,
                    events: {
                        'onReady': function(event) {
                            // Store player reference for the currently visible one
                            if (items[currentIndex] === item) {
                                youtubePlayer = event.target;
                            }
                        }
                    }
                });
            }
        });
    };
    
    // Generate thumbnails
    if (thumbnailContainer) {
    items.forEach((item, index) => {
        const thumbnail = document.createElement('img');
        
        if (item.hasAttribute('data-type') && item.getAttribute('data-type') === 'youtube') {
            // YouTube thumbnail
            const videoId = item.getAttribute('data-id');
            thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        } else {
            // Image thumbnail
            const imgElement = item.querySelector('img');
            if (imgElement) {
                thumbnail.src = imgElement.src;
            } else {
                thumbnail.src = '/api/placeholder/80/45';
            }
        }
        
        thumbnail.classList.add('thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            goToSlide(index);
        });
        
        thumbnailContainer.appendChild(thumbnail);
    });
    
    thumbnails = document.querySelectorAll('.thumbnail');
    }
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active thumbnail
        if (thumbnails.length > 0) {
            thumbnails.forEach((thumb, idx) => {
                if (idx === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
        
        // Handle YouTube video playback
        handleVideoPlayback();
    }
    
    function handleVideoPlayback() {
        // Pause any currently playing YouTube video when not in view
        if (ytReady && youtubePlayer) {
            const currentItem = items[currentIndex];
            
            if (currentItem.hasAttribute('data-type') && currentItem.getAttribute('data-type') === 'youtube') {
                // Current item is YouTube, play it if it's the right player
                const videoId = currentItem.getAttribute('data-id');
                const iframe = currentItem.querySelector('iframe');
                
                if (iframe && iframe.id === youtubePlayer.getIframe().id) {
                    youtubePlayer.playVideo();
                }
            } else {
                // Current item is not YouTube, pause all YouTube videos
                youtubePlayer.pauseVideo();
            }
        }
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }
    
    function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);
    
    // Initialize
    updateCarousel();
});