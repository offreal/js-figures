const select = document.getElementById('select');
const scale = document.getElementById('scale');
const createButton = document.getElementById('create');

const width = window.innerWidth;
const height = window.innerHeight;
const canvas = document.getElementById('canvas');

canvas.setAttribute('width', width);
canvas.setAttribute('height', height - document.querySelector('.header').offsetHeight);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0x000000);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
camera.position.set(0, 0, 1000);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });

createButton.addEventListener('click', event => {
  createFigure();
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createFigure() {
  let geomertry;

  switch (select.value) {
    case 'cube':
      geomertry = new THREE.BoxGeometry(10, 10, 10);
      break;
    case 'sphere':
      geomertry = new THREE.SphereGeometry(10, 12, 12);
      break;

    case 'piramid':
    default:
      geomertry = new THREE.CylinderGeometry(0, 4, 10, 4, 1);
  }

  geomertry.scale(scale.value, scale.value, scale.value);

  for (let i = 0; i < geomertry.faces.length; i++) {
    geomertry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
  }

  const mesh = new THREE.Mesh(geomertry, material);

  scene.add(mesh);

  mesh.position.x = getRandomIntInclusive(-400, 400);
  mesh.position.y = getRandomIntInclusive(-200, 200);
  mesh.position.z = getRandomIntInclusive(-400, 400);
}

const loop = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(loop);
};

loop();
