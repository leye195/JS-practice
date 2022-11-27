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
    camera.position.x = -15;
    camera.position.z = 15;

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
    const x = 2.5;
    const y = 2.5;

    const shape = new THREE.Shape();
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);

    shape.moveTo(x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      steps: 5, // 깊이 방향 분할수
      depth: 5, // 깊이 길이
      bevelEnabled: true, // beveling 처리여부
      bevelThickness: 1.25, // beveling 두께
      bevelSize: 1.25, // 외각선으로 부터 얼마나 beveling 진행 거리
      bevelSegments: 10, // beveling 단계 수
    });
    const fillMateral = new THREE.MeshPhongMaterial({ color: 0xffaa3a });
    const cube = new THREE.Mesh(geometry, fillMateral);

    // 노란색 선 material 생성
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), // wireframe형태의 geometry
      lineMaterial
    );

    const group = new THREE.Group();
    group.add(cube);
    group.add(line);

    this._scene.add(group);
    this._cube = group;
  }

  /*_setupLatheModel() {
    const points = [];

    for (let i = 0; i < 10; i++) {
      points.push(
        new THREE.Vector2(Math.sin(i * 0.5) * 0.35 + 2, (i - 5) * 0.2)
      );
    }
    const geometry = new THREE.LatheGeometry(points, 60, 0, Math.PI);
    const material = new THREE.MeshPhongMaterial({ color: 0xffaaff });
    const mesh = new THREE.Mesh(geometry, material);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), // wireframe형태의 geometry
      lineMaterial
    );

    const group = new THREE.Group();
    group.add(mesh);
    group.add(line);

    this._scene.add(group);
  }*/

  /*_setupShapeModel() {
    //const geometry = new THREE.TorusKnotGeometry(0.25, 0.05, 64, 32, 6, 3);
    const x = 2.5;
    const y = 2.5;

    const shape = new THREE.Shape();
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);

    shape.moveTo(x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
    shape.closePath();

    const geometry = new THREE.ShapeGeometry(shape);

    const fillMateral = new THREE.MeshPhongMaterial({ color: 0xffaa3a });
    const cube = new THREE.Mesh(geometry, fillMateral);

    // 노란색 선 material 생성
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry), // wireframe형태의 geometry
      lineMaterial
    );

    const group = new THREE.Group();
    group.add(cube);
    group.add(line);

    this._scene.add(group);
    this._cube = group;
  }*/

  /*_setupCurveModel() {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }

      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(8);

    const geometry = new THREE.BufferGeometry();
    const points = path.getPoint(30);
    geometry.setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.Line(geometry, material);

    this._scene.add(line);
  }*/

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
    // this._cube.rotation.x = time;
    // this._cube.rotation.y = time;
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
