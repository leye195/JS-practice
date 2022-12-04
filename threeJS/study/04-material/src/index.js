import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    this._setupControls();

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
    camera.position.z = 7;
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
    /*const material = new THREE.MeshPhysicalMaterial({
      color: 0x0f9fff,
      emissive: 0x000000,
      roughness: 1,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0,
      wireframe: false,
      flatShading: false,
    });*/

    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(
      "https://images.unsplash.com/photo-1546453667-8a8d2d07bc20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80 387w, https://images.unsplash.com/photo-1546453667-8a8d2d07bc20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80 687w",
      (texture) => {
        // repeat는 wrapS와 wrapT과 함께 사용할수 있음
        texture.repeat.x = 1;
        texture.repeat.y = 1;

        // x,y축 방향으로
        texture.wrapS = THREE.ClampToEdgeWrapping; // THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping; // THREE.RepeatWrapping;

        // uv좌표의 시작 위치를 조정
        texture.offset.x = 0;
        texture.offset.y = 0;

        texture.rotation = THREE.MathUtils.degToRad(0);
        texture.center.x = 0.5;
        texture.center.y = 0.5;

        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestMipmapNearestFilter;
      }
    );
    const material = new THREE.MeshStandardMaterial({
      map,
    });

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    box.position.set(0, 0, 0);
    this._scene.add(box);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
    );
    sphere.position.set(1, 0, 0);
    this._scene.add(sphere);
  }

  _setupMeshModel() {
    /* const material = new THREE.MeshLambertMaterial({
      color: 0x223093,
      emissive: "0x555500", // 재질 자체에서 방출하는 색상 값
      wireframe: false, // 선으로 표현할지 여부

      // visible: true, // 랜더링시 mesh 보임 여부
      transparent: true, // 불투명도 사용 여부
      opacity: 0.5, // 불투명도 값
      side: THREE.DoubleSide, // 앞면, 뒷면 or 모두 랜더링
    });*/
    const material = new THREE.MeshPhongMaterial({
      color: 0x5c8aff,
      emissive: 0x0000aa,
      specular: 0x00ffff,
      shininess: 5,
      flatShading: true,
      wireframe: false,
    });

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
    );
    sphere.position.set(2, 0, 0);

    this._scene.add(box);
    this._scene.add(sphere);
  }

  _setupModelLine() {
    const vertices = [
      -1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0, 1, -1, -1, -1, -1, -1, 1, 1, -1,
      -1, 1, -1, -1, 1, 0,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.LineDashedMaterial({
      color: 0xffaaff,
      dashSize: 0.1, // 각 dash의 길이
      gapSize: 0.2, // 각 dash간의 거리
      scale: 1, // dash 영역에 대한 표현 횟수를 몇배로 할 것인지
    });
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    this._scene.add(line);
  }

  _setupPointsModel() {
    // 좌표 저장 배열
    const vertices = [];

    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(5); // (-5, 5) 사이 난수 값
      const y = THREE.MathUtils.randFloatSpread(5);
      const z = THREE.MathUtils.randFloatSpread(5);

      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
      // 3은 vertice에 저장된 좌표가 x,y,z 3개로 이뤄졌다는것을 의미
    );

    const material = new THREE.PointsMaterial({
      color: 0xff0000, // point 색상
      size: 0.01, // point 크기 값
      sizeAttenuation: true, // point가 카메라 거리에 따라 크기가 변화하는지 여부
    });

    const points = new THREE.Points(geometry, material);
    this._scene.add(points);
  }

  _setupControls() {
    new OrbitControls(this._camera, this._divContainer);
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
