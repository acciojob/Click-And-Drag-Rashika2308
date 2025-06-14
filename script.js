document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const cubes = document.querySelectorAll('.cube');
    const containerRect = container.getBoundingClientRect();
    
    function initializeCubes() {
        const cubeSize = 80;
        const gap = 20;
        const cols = Math.floor(containerRect.width / (cubeSize + gap));
        
        cubes.forEach((cube, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            
            cube.style.width = `${cubeSize}px`;
            cube.style.height = `${cubeSize}px`;
            cube.style.left = `${col * (cubeSize + gap)}px`;
            cube.style.top = `${row * (cubeSize + gap)}px`;
        });
    }
    
    initializeCubes();
    
    let draggedCube = null;
    let offsetX, offsetY;
    
    cubes.forEach(cube => {
        cube.addEventListener('mousedown', startDrag);
    });
    
    function startDrag(e) {
        draggedCube = e.target;
        draggedCube.classList.add('dragging');
        
        const cubeRect = draggedCube.getBoundingClientRect();
        offsetX = e.clientX - cubeRect.left;
        offsetY = e.clientY - cubeRect.top;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }
    
    function drag(e) {
        if (!draggedCube) return;
        
        const containerRect = container.getBoundingClientRect();
        const maxX = containerRect.width - draggedCube.offsetWidth;
        const maxY = containerRect.height - draggedCube.offsetHeight;
        
        let newX = e.clientX - containerRect.left - offsetX;
        let newY = e.clientY - containerRect.top - offsetY;
        
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
    
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
});
