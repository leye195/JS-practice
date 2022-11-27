import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // window.deviceRatio를 활용하여 설정
    divContainer.appendChild(renderer.domElement); // container의 child로 추가
    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();
    this._setupControls();

    window.onresize = this.resize.bind(this); // renderer와 camera를 size에 맞게 재설정
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const { clientWidth: width, clientHeight: height } = this._divContainer;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 50;

    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);

    light.position.set(-1, 5, 4);
    this._scene.add(light);
  }

  _setupModel() {
    const solarSystem = new THREE.Object3D();
    this._scene.add(solarSystem);

    const radius = 1;
    const widthSegements = 12;
    const heightSegments = 12;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegements,
      heightSegments
    );

    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
      flatShading: true,
    });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);

    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);

    const earchMaterial = new THREE.MeshPhongMaterial({
      color: 0x2255ff,
      emissive: 0x112233,
      flatShading: true,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earchMaterial);
    earthOrbit.position.x = 10;
    earthOrbit.add(earthMesh);

    const moonOrbit = new THREE.Object3D();
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0xe3e3e3,
      emissive: 0x222222,
      flatShading: true,
    });

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.position.x = 2;
    moonOrbit.add(moonMesh);

    this._moonOrbit = moonOrbit;
    this._earthOrbit = earthOrbit;
    this._solarSystem = solarSystem;
  }

  // control 정의 함수
  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
  }

  resize() {
    const { clientWidth: width, clientHeight: height } = this._divContainer;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  }

  update(time) {
    time *= 0.001; // ms -> s 단위로 변경

    this._moonOrbit.rotation.y = time * 4;
    this._earthOrbit.rotation.y = time * 2;
    this._solarSystem.rotation.y = time / 2;
  }

  render(time) {
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }
}

window.onload = function () {
  new App();
};
