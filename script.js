document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const cubes = document.querySelectorAll('.cube');
    const cubeSize = 80;
    const gap = 20;
    const cols = 3;

    // Initialize grid layout
    function initializeCubes() {
        cubes.forEach((cube, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            cube.style.left = `${col * (cubeSize + gap)}px`;
            cube.style.top = `${row * (cubeSize + gap)}px`;
        });
    }

    initializeCubes();

    // Drag mechanics
    let draggedCube = null;
    let offsetX, offsetY;

    cubes.forEach(cube => {
        cube.addEventListener('mousedown', startDrag);
    });

    function startDrag(e) {
        draggedCube = e.target;
        draggedCube.classList.add('dragging');
        
        const rect = draggedCube.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    function drag(e) {
        if (!draggedCube) return;
        
        const containerRect = container.getBoundingClientRect();
        const maxX = containerRect.width - draggedCube.offsetWidth;
        const maxY = containerRect.height - draggedCube.offsetHeight;
        
        // Calculate new position with boundaries
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
        // Apply constraints
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        draggedCube.style.left = `${newX}px`;
        draggedCube.style.top = `${newY}px`;
    }

    function stopDrag() {
        if (!draggedCube) return;
        draggedCube.classList.remove('dragging');
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        draggedCube = null;
    }
});
