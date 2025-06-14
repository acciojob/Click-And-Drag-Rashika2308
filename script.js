document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items');
    let isDragging = false;
    let startX;
    let scrollLeft;

    itemsContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - itemsContainer.offsetLeft;
        scrollLeft = itemsContainer.scrollLeft;
        itemsContainer.style.cursor = 'grabbing';
    });

    itemsContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        itemsContainer.style.cursor = 'grab';
    });

    itemsContainer.addEventListener('mouseup', () => {
        isDragging = false;
        itemsContainer.style.cursor = 'grab';
    });

    itemsContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - itemsContainer.offsetLeft;
        const walk = (x - startX) * 2; 
        itemsContainer.scrollLeft = scrollLeft - walk;
    });
});