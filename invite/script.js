document.addEventListener('DOMContentLoaded', function() {
  const timeline = document.querySelector('.timeline');
  let isDown = false;
  let startX;
  let scrollLeft;

  timeline.addEventListener('mousedown', (e) => {
    isDown = true;
    timeline.classList.add('active');
    startX = e.pageX - timeline.offsetLeft;
    scrollLeft = timeline.scrollLeft;
  });

  timeline.addEventListener('mouseleave', () => {
    isDown = false;
    timeline.classList.remove('active');
  });

  timeline.addEventListener('mouseup', () => {
    isDown = false;
    timeline.classList.remove('active');
  });

  timeline.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timeline.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    timeline.scrollLeft = scrollLeft - walk;
  });

  timeline.addEventListener('wheel', (e) => {
    if (e.deltaX !== 0) {
      e.preventDefault();
      timeline.scrollLeft += e.deltaX;
    }
  });

  const galleries = document.querySelectorAll('.image-gallery');
  let highestZIndex = 1;

  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('img');
    const placedImages = [];

    images.forEach(image => {
      let placed = false;
      let retries = 0;
      while (!placed && retries < 100) {
        const angle = Math.random() * 30 - 15;
        const x = Math.random() * (gallery.offsetWidth - image.width);
        const y = Math.random() * (gallery.offsetHeight - image.height);

        image.style.transform = `rotate(${angle}deg)`;
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;

        let overlaps = false;
        for (const placedImage of placedImages) {
          if (checkOverlap(image, placedImage)) {
            overlaps = true;
            break;
          }
        }

        if (!overlaps) {
          placedImages.push(image);
          placed = true;
        }
        retries++;
      }

      let initialRotation = ''; // To store the initial rotation

      image.addEventListener('mousedown', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to the timeline
        currentDraggedImage = image;
        offsetX = e.clientX - image.getBoundingClientRect().left;
        offsetY = e.clientY - image.getBoundingClientRect().top;
        image.style.zIndex = ++highestZIndex;
        image.style.cursor = 'grabbing';
        // Store the initial rotation to combine with translation
        initialRotation = image.style.transform.includes('rotate') ? image.style.transform.split('rotate(')[1].split(')')[0] : '0deg';
      });

      image.style.cursor = 'grab';
    });
  });

  let currentDraggedImage = null;
  let offsetX, offsetY; // Make these global for the centralized listeners
  let galleryRectCache; // Cache gallery bounding rect
  let initialRotationCache; // Cache initial rotation for the dragged image

  document.addEventListener('mousemove', (e) => {
    if (currentDraggedImage) {
      e.preventDefault(); // Prevent default browser dragging behavior
      let newX = e.clientX - galleryRectCache.left - offsetX;
      let newY = e.clientY - galleryRectCache.top - offsetY;

      // Constrain within the gallery
      const gallery = currentDraggedImage.closest('.image-gallery');
      if (newX < 0) newX = 0;
      if (newY < 0) newY = 0;
      if (newX + currentDraggedImage.offsetWidth > gallery.offsetWidth) newX = gallery.offsetWidth - currentDraggedImage.offsetWidth;
      if (newY + currentDraggedImage.offsetHeight > gallery.offsetHeight) newY = gallery.offsetHeight - currentDraggedImage.offsetHeight;

      currentDraggedImage.style.transform = `translate(${newX}px, ${newY}px) rotate(${initialRotationCache})`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (currentDraggedImage) {
      currentDraggedImage.style.cursor = 'grab';
      currentDraggedImage = null;
    }
  });

  function checkOverlap(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

  function updateTimelineItems() {
    const timelineCenter = timeline.offsetWidth / 2;
    const containers = timeline.querySelectorAll('.container');
    containers.forEach(container => {
      const containerRect = container.getBoundingClientRect();
      const timelineRect = timeline.getBoundingClientRect();
      const containerCenter = containerRect.left - timelineRect.left + containerRect.width / 2;
      const distance = Math.abs(timelineCenter - containerCenter);
      
      const scale = Math.max(1, 1.5 - distance / timelineCenter);
      container.style.transform = `scale(${scale}) translateY(${container.style.transform.includes('translateY') ? container.style.transform.split('translateY(')[1].split(')')[0] : '0px'})`;

      const images = container.querySelectorAll('.image-gallery img');
      images.forEach((image, index) => {
        const spread = (1.5 - scale) * 50 * (index % 2 === 0 ? 1 : -1);
        const originalTransform = image.style.transform.split(' ').filter(t => t.startsWith('rotate')).join(' ');
        image.style.transform = `${originalTransform} translateX(${spread}px)`;
      });
    });
  }

  timeline.addEventListener('scroll', updateTimelineItems);
  updateTimelineItems(); // Initial call
});