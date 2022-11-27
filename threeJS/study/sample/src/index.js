import * as THREE from "three";

class App {
  constructor() {
    const divContainer = document.querySelector("#webgl-container");
    this._divContainer = divContainer;

    const renderer = new THREE.WebGLRenderer({ antialias: true }); // renderer 생성, 오브젝트들이 계단 현상 없이 부드럽게 표현됨
    renderer.setPixelRatio(window.devicePixelRatio); // window.deviceRatio를 활용하여 설정
    divContainer.appendChild(renderer.domElement); // container의 child로 추가
    this._renderer = renderer;

    const scene = new THREE.Scene(); // scene 생성
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModel();

    window.onresize = this.resize.bind(this); // renderer와 camera를 size에 맞게 재설정
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    // 3차원 그래픽을 출력할 width, height
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    //원근 카메라 생성
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2.5;
    this._camera = camera;
  }

  _setupLight() {
    // 광원 생성을 위한 빛 색상 및 광원의 세기 값 설정
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);

    // 광원 위치 설정
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 깊이
    const material = new THREE.MeshPhongMaterial({ color: 0x44a88 });
    const cube = new THREE.Mesh(geometry, material);

    this._scene.add(cube); // 구성 요소로 추가
    this._cube = cube;
  }

  resize() {
    // container 크기
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    // camera aspect 재설정 및 적용
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  update(time) {
    time *= 0.001; // ms -> s 단위로 변경
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
  }

  render(time) {
    // renderer가 camera의 시점을 이용하여 scene을 랜더링 실행
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }
}

window.onload = function () {
  new App();
};
