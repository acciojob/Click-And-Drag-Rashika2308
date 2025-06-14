document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    let isDragging = false;
    let startX;
    let scrollLeft;
    let startScrollLeft;

    itemsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - itemsContainer.offsetLeft;
        startScrollLeft = itemsContainer.scrollLeft;
        itemsContainer.style.cursor = 'grabbing';
        itemsContainer.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        itemsContainer.style.cursor = 'grab';
        itemsContainer.style.scrollBehavior = 'smooth';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - itemsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll multiplier
        itemsContainer.scrollLeft = startScrollLeft - walk;
    });

    // Prevent default drag behavior
    itemsContainer.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});