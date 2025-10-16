function initBlockchainAnimation() {
    const canvas = document.getElementById('blockchain-canvas');
    if (!canvas) return;

    // Configuração da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Posição da câmera
    camera.position.z = 15;

    // Cores da paleta
    const colors = {
        azulEscuro: 0x2F4F6C,
        azulPetroleo: 0x4CA1A3,
        branco: 0xFFFFFF,
        cinzaAzulado: 0x405D75
    };

    // Array para armazenar os blocos
    const blocks = [];
    const connections = [];

    // Criar blocos (cubos) conectados em cadeia
    const numBlocks = 8;
    const spacing = 3;

    for (let i = 0; i < numBlocks; i++) {
        // Geometria do bloco
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

        // Material com cor alternada
        const color = i % 2 === 0 ? colors.azulPetroleo : colors.azulEscuro;
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.2,
            shininess: 100
        });

        const cube = new THREE.Mesh(geometry, material);

        // Posicionar blocos em uma curva
        const angle = (i / numBlocks) * Math.PI * 2;
        const radius = 5;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle) * radius;
        cube.position.z = Math.sin(angle * 2) * 2;

        // Adicionar borda ao bloco
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: colors.branco, linewidth: 2 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        cube.add(wireframe);

        scene.add(cube);
        blocks.push(cube);

        // Criar conexões entre blocos
        if (i > 0) {
            const points = [];
            points.push(blocks[i - 1].position);
            points.push(cube.position);

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
                color: colors.azulPetroleo,
                transparent: true,
                opacity: 0.6
            }));
            scene.add(line);
            connections.push(line);
        }
    }

    // Conectar último bloco ao primeiro (cadeia circular)
    const points = [];
    points.push(blocks[numBlocks - 1].position);
    points.push(blocks[0].position);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: colors.azulPetroleo,
        transparent: true,
        opacity: 0.6
    }));
    scene.add(line);
    connections.push(line);

    // Adicionar partículas flutuantes
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: colors.branco,
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors.azulPetroleo, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colors.azulEscuro, 0.8, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Animação
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotacionar blocos individualmente
        blocks.forEach((block, index) => {
            block.rotation.x += 0.01;
            block.rotation.y += 0.01;

            // Movimento de flutuação
            block.position.y += Math.sin(time + index) * 0.002;
        });

        // Rotacionar a cena inteira
        scene.rotation.y += 0.002;

        // Animar partículas
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Responsividade
    window.addEventListener('resize', function () {
        if (canvas.clientWidth > 0 && canvas.clientHeight > 0) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initBlockchainAnimation();

    // Handle form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const nameInput = document.getElementById('nameInput');
            const emailInput = document.getElementById('emailInput');
            const successMessageDiv = document.getElementById('successMessage');

            if (nameInput && emailInput && successMessageDiv) {
                const name = nameInput.value;
                const email = emailInput.value;

                if (name && email) {
                    successMessageDiv.textContent = `Parabéns, ${name}! Você foi inscrito com sucesso. Verifique seu e-mail (${email}) para acessar o conteúdo exclusivo.`;
                    successMessageDiv.style.display = 'block';

                    // Clear form and hide message after 5 seconds
                    setTimeout(() => {
                        nameInput.value = '';
                        emailInput.value = '';
                        successMessageDiv.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }
});

