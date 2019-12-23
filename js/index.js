const canvas = document.getElementById('canvas');
const figuresList = document.getElementById('figuresList');

canvas.setAttribute('height', canvas.offsetHeight);
canvas.setAttribute('width', canvas.offsetWidth);

const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
const light = new THREE.AmbientLight(0xffffff);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: THREE.FaceColors });
const controls = new THREE.OrbitControls(camera, canvas);

let figures = [];

renderer.setClearColor(0x000000);
camera.position.set(0, 0, 40);
scene.add(light);
controls.update();
update();

document.getElementById('create').addEventListener('click', createFigureHandler);
figuresList.addEventListener('click', removeFigureHandler);

// create figure
function createFigureHandler() {
  const select = document.getElementById('select');
  const scale = document.getElementById('scale');

  let geomertry;

  switch (select.value) {
    case 'cube':
      geomertry = new THREE.BoxGeometry();
      break;
    case 'sphere':
      geomertry = new THREE.SphereGeometry(0.6, 12, 12);
      break;
    case 'piramid':
    default:
      geomertry = new THREE.CylinderGeometry(0, 0.7, 1.1, 4, 1);
  }

  geomertry.scale(scale.value, scale.value, scale.value);

  for (let i = 0; i < geomertry.faces.length; i++) {
    geomertry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
  }

  const mesh = new THREE.Mesh(geomertry, material);

  scene.add(mesh);
  setMeshRandomPos(mesh);
  addMeshToList(mesh);
}

// generate random value
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// change pos for mesh
function setMeshRandomPos(mesh) {
  mesh.position.x = getRandomIntInclusive(-20, 20);
  mesh.position.y = getRandomIntInclusive(-10, 10);
  mesh.position.z = getRandomIntInclusive(-20, 20);
}

// add figure uuid to list
function addMeshToList(mesh) {
  const listItem = document.createElement('li');
  const span = document.createElement('span');
  const itemBtn = document.createElement('button');

  itemBtn.type = 'button';
  itemBtn.dataset.uuid = mesh.uuid;
  itemBtn.innerHTML = 'X';

  span.innerHTML = mesh.uuid;

  listItem.appendChild(span);
  listItem.appendChild(itemBtn);
  figuresList.appendChild(listItem);

  figures.push(mesh); // add to array
}

// remove figure
function removeFigureHandler(event) {
  if (event.target.type === 'button') {
    figures = figures.filter(figure => {
      if (figure.uuid === event.target.dataset.uuid) {
        scene.remove(figure);
        event.target.parentNode.remove();
      }

      return figure.uuid !== event.target.dataset.uuid;
    });
  }
}

// update all changes
function update() {
  requestAnimationFrame(update);

  controls.update();
  renderer.render(scene, camera);
}
