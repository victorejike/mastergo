import * as THREE from "./node_modules/three/build/three.module.js";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const canvas = document.getElementById("avatarCanvas");
const avatarNote = document.getElementById("avatarNote");
const stackCards = document.querySelectorAll(".stack-card");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const signupForm = document.getElementById("signupForm");

const baseNote = "Hey! Let's build something awesome 🚀";

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
camera.position.set(0, 1, 6);
camera.lookAt(0, 0.8, 0);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(3, 5, 5);
dirLight.castShadow = true;
scene.add(dirLight);

const purpleLight = new THREE.PointLight(0x6b4eff, 3, 10);
purpleLight.position.set(-3, 2, 2);
scene.add(purpleLight);

// Avatar group
const avatar = new THREE.Group();
const avatarVisual = new THREE.Group();
avatar.add(avatarVisual);
scene.add(avatar);

const mat = new THREE.MeshStandardMaterial({ color: 0x6b4eff });
const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5c5a3 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x11131c });

function buildFallbackAvatar() {
    avatarVisual.clear();

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), skinMat);
    head.position.y = 2.1;
    avatarVisual.add(head);

    // Eyes
    [-0.2, 0.2].forEach(x => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), darkMat);
        eye.position.set(x, 2.15, 0.5);
        avatarVisual.add(eye);
    });

    // Smile
    const smileCurve = new THREE.TorusGeometry(0.18, 0.03, 8, 20, Math.PI);
    const smile = new THREE.Mesh(smileCurve, darkMat);
    smile.position.set(0, 1.9, 0.5);
    smile.rotation.z = Math.PI;
    avatarVisual.add(smile);

    // Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 1.4, 32), mat);
    body.position.y = 0.9;
    avatarVisual.add(body);

    // Arms
    [[-0.85, 0.9], [0.85, 0.9]].forEach(([x, y]) => {
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 1.0, 16), mat);
        arm.position.set(x, y, 0);
        arm.rotation.z = x < 0 ? 0.4 : -0.4;
        avatarVisual.add(arm);
    });

    // Legs
    [[-0.28, -0.4], [0.28, -0.4]].forEach(([x, y]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 1.2, 16), darkMat);
        leg.position.set(x, y, 0);
        avatarVisual.add(leg);
    });

    avatarVisual.add(platform);
}

// Floating code particles
const particles = [];
const particleGroup = new THREE.Group();
scene.add(particleGroup);

for (let i = 0; i < 18; i++) {
    const geo = new THREE.OctahedronGeometry(0.08 + Math.random() * 0.08);
    const pMat = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x6b4eff : 0xffffff,
        emissive: 0x6b4eff,
        emissiveIntensity: 0.4
    });
    const p = new THREE.Mesh(geo, pMat);
    p.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 2 - 1
    );
    p.userData.speed = 0.005 + Math.random() * 0.01;
    p.userData.offset = Math.random() * Math.PI * 2;
    particleGroup.add(p);
    particles.push(p);
}

// Platform
const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 0.15, 64),
    new THREE.MeshStandardMaterial({ color: 0x6b4eff, emissive: 0x3a1fcc, emissiveIntensity: 0.3 })
);
platform.position.y = -1.1;
avatarVisual.add(platform);

const loader = new GLTFLoader();
loader.load(
    "./avatar.glb",
    gltf => {
        avatarVisual.clear();

        const model = gltf.scene;
        model.traverse(node => {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetHeight = 3.6;
        const scale = targetHeight / maxDimension;

        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -box.min.y * scale + -1.2, -center.z * scale);
        model.rotation.y = 0.15;
        model.rotation.x = 0.02;
        avatarVisual.add(model);

        avatarVisual.add(platform);
    },
    undefined,
    () => {
        buildFallbackAvatar();
    }
);

// State
let targetRotY = 0;
let targetRotX = 0;
let targetScale = 1;
let currentScale = 1;
let bobTime = 0;
let resizeFrame = null;

function setNote(text) {
    avatarNote.textContent = text;
}

function resetInteraction() {
    targetRotY = 0;
    targetRotX = 0;
    targetScale = 1;
    setNote(baseNote);
}

function applyCardReaction(index) {
    targetRotX = 0;
    targetScale = 1.12;

    if (index === 0) {
        targetRotY = -0.45;
        setNote("HTML + CSS for the form! 🌐");
        return;
    }

    if (index === 1) {
        targetRotY = 0;
        setNote("Three.js for the 3D avatar! 🎮");
        return;
    }

    targetRotY = 0.45;
    setNote("JavaScript makes me react! ⚡");
}

function applyFocusReaction(message, rotationX, rotationY) {
    targetRotX = rotationX;
    targetRotY = rotationY;
    setNote(message);
}

function handleResize() {
    if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
    }

    resizeFrame = requestAnimationFrame(() => {
        const section = canvas.parentElement;
        const width = section.clientWidth;
        const height = section.clientHeight;

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Card hover reactions
stackCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        const i = parseInt(card.dataset.index);
        applyCardReaction(i);
    });
    card.addEventListener("mouseleave", () => {
        resetInteraction();
    });
});

// Form reactions
nameInput.addEventListener("focus", () => {
    applyFocusReaction("Nice to meet you! 👋", 0.35, -0.1);
});

emailInput.addEventListener("focus", () => {
    applyFocusReaction("Drop your email! 📧", -0.35, 0.1);
});

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    targetScale = 1.4;
    setNote("Welcome to EjiCode! 🎉");
    setTimeout(() => { targetScale = 1; }, 1200);
});

window.addEventListener("resize", handleResize);
handleResize();
setNote(baseNote);

function animate() {
    requestAnimationFrame(animate);
    bobTime += 0.02;

    avatar.rotation.y += (targetRotY - avatar.rotation.y) * 0.08;
    avatar.rotation.x += (targetRotX - avatar.rotation.x) * 0.08;
    currentScale += (targetScale - currentScale) * 0.08;
    avatar.scale.setScalar(currentScale);
    avatar.position.y = Math.sin(bobTime) * 0.08;

    particles.forEach(p => {
        p.position.y += p.userData.speed;
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
        if (p.position.y > 3.5) p.position.y = -3.5;
    });

    purpleLight.intensity = 2.2 + Math.sin(bobTime * 2) * 0.9;

    renderer.render(scene, camera);
}

animate();
