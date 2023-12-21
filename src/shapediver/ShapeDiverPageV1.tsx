import { useEffect, useRef } from 'react';
import * as THREE from 'three';


const App = () => {
    const canvasRef = useRef(null);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const intersection = new THREE.Vector3();
    let isDragging = false;
    let indicationSphere;

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const init = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        console.log(renderer)
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const createIndicationSphere = (position) => {
            if (!indicationSphere) {
                const geometry = new THREE.SphereGeometry(0.1, 32, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                indicationSphere = new THREE.Mesh(geometry, material);
                scene.add(indicationSphere);
            }
            indicationSphere.position.copy(position);
        };

        const updateIndicationSpherePosition = () => {
            if (indicationSphere) {
                indicationSphere.position.copy(intersection);
            }
        };

        const onMouseClick = (event) => {
            const intersected = getIntersectedPoint(event);

            if (intersected) {
                createIndicationSphere(intersected.point);
            }
        };

        const onMouseDown = (event) => {
            const intersected = getIntersectedPoint(event);

            if (intersected && intersected.object === indicationSphere) {
                isDragging = true;
            }
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        const onMouseMove = (event) => {
            if (!isDragging) return;

            const intersected = getIntersectedPoint(event);

            if (intersected) {
                intersection.copy(intersected.point);
                updateIndicationSpherePosition();
                // Call updateShapeDiverParameter() here if necessary
            }
        };

        const getIntersectedPoint = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            mouse.set(x, y);
            raycaster.setFromCamera(mouse, camera);

            const intersects = raycaster.intersectObjects(scene.children);

            return intersects.length > 0 ? intersects[0] : null;
        };

        window.addEventListener('click', onMouseClick, false);
        window.addEventListener('mousedown', onMouseDown, false);
        window.addEventListener('mouseup', onMouseUp, false);
        window.addEventListener('mousemove', onMouseMove, false);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();
    };

    return <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default App;
