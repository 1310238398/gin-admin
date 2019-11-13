import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

import {
  EffectComposer,
  OutlineEffect,
  BlendFunction,
  EffectPass,
  RenderPass,
} from 'postprocessing';
import { Interaction } from 'three.interaction';

/**
 * 3D园区类
 */
export class Building3D {
  AllBuilding = {};

  AllBuildingSelectType = {};

  Buildings = {};

  // 园区全部模型 及 配置
  data = {
    'A-0': { name: 'LU', file: 'LU' },

    'A1-1': { name: 'A1-1', position: [-22500, 14000, -17500], file: 'A14' },
    'A1-2': { name: 'A1-2', position: [-23000, 12000, -10000], file: 'A9' },
    'A1-3': { name: 'A1-3', position: [-29500, 15000, -17500], file: 'A11' },
    'A1-4': { name: 'A1-4', position: [-29500, 12000, -10500], file: 'A8' },
    'A1-5': { name: 'A1-5', position: [-37500, 17000, -13000], file: 'A10' },

    'A2-1': { name: 'A2-1', position: [-21500, 12500, 0], file: 'A7' },
    'A2-2': { name: 'A2-2', position: [-20500, 11500, 9500], file: 'A12' },
    'A2-3': { name: 'A2-3', position: [-27500, 12000, 0], file: 'A1' },
    'A2-4': { name: 'A2-4', position: [-27500, 11500, 8700], file: 'A6' },
    'A2-5': { name: 'A2-5', position: [-36500, 14000, 0], file: 'A0' },
    'A2-6': { name: 'A2-6', position: [-35500, 12500, 9000], file: 'A5' },

    'A3-1': { name: 'A3-1', position: [-21500, 12000, 18000], file: 'A13' },
    'A3-2': { name: 'A3-2', position: [-20500, 9000, 27000], file: 'A3' },
    'A3-3': { name: 'A3-3', position: [-26500, 11000, 27000], file: 'A15' },
    'A3-4': { name: 'A3-4', position: [-35500, 12000, 18000], file: 'A4' },
    'A3-5': { name: 'A3-5', position: [-34000, 20000, 27000], file: 'A2' },

    'A4-1': { name: 'A4-1', position: [12000, 12000, -16000], file: 'A22' },
    'A4-2': { name: 'A4-2', position: [6500, 11000, -18000], file: 'A34' },
    'A4-3': { name: 'A4-3', position: [5500, 16000, -8900], file: 'A18' },
    'A4-4': { name: 'A4-4', position: [-5500, 16000, -9000], file: 'A17' },
    'A4-5': { name: 'A4-5', position: [-5500, 12000, -17000], file: 'A23' },
    'A4-6': { name: 'A4-6', position: [-13000, 13000, -17500], file: 'A37' },

    'A5-1': { name: 'A5-1', position: [10500, 17000, 1000], file: 'A19' },
    'A5-2': { name: 'A5-2', position: [7500, 17000, 10000], file: 'A21' },
    'A5-3': { name: 'A5-3', position: [500, 34000, 1000], file: 'A24' },
    'A5-4': { name: 'A5-4', position: [-7500, 17000, 10000], file: 'A20' },
    'A5-5': { name: 'A5-5', position: [-12000, 17000, 1000], file: 'A16' },

    'A6-1': { name: 'A6-1', position: [37000, 16000, -10000], file: 'A35' },
    'A6-2': { name: 'A6-2', position: [29500, 14000, -10000], file: 'A25' },
    'A6-3': { name: 'A6-3', position: [29500, 14000, -17000], file: 'A28' },
    'A6-4': { name: 'A6-4', position: [22500, 11500, -9500], file: 'A26' },
    'A6-5': { name: 'A6-5', position: [22500, 14000, -17000], file: 'A27' },

    'A7-1': { name: 'A7-1', position: [37500, 12500, 100], file: 'A32' },
    'A7-2': { name: 'A7-2', position: [37500, 12500, 9000], file: 'A31' },
    'A7-3': { name: 'A7-3', position: [29500, 12500, 9000], file: 'A33' },
    'A7-4': { name: 'A7-4', position: [29500, 12500, 100], file: 'A40' },
    'A7-5': { name: 'A7-5', position: [23000, 12500, 9000], file: 'A29' },
    'A7-6': { name: 'A7-6', position: [22500, 12500, 100], file: 'A30' },
    'A8-1': { name: 'A8-1', position: [37500, 17000, 27500], file: 'A38' },

    B0: { name: 'B0', file: 'B0' },
    B1: { name: 'B1', file: 'B1' },
    B2: { name: 'B2', file: 'B2' },
    B3: { name: 'B3', file: 'B3' },
    B4: { name: 'B4', file: 'B4' },
  };

  Flags = {};

  objects = [];

  constructor(container, clickHandle) {
    this.container = container;
    this.clickHandle = clickHandle;
    this.opts = {
      cameraAngle: 45,
      cameraPosition: [0, 77534, -101173],
      height: container.clientHeight,
      lightColor: 0xdddddd,
      lightIntensity: 0.5,
      lightPosition: [100000, 100000, 100000],
      maxDistance: 300000,
      minDistance: 50000,
      modelPosition: [-20000, 160, -1771],
      modelScale: 1,
      sceneBg: '/models/dark-bg.png',
      width: container.clientWidth,
    };

    this.scene = new THREE.Scene();
    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      this.opts.cameraAngle,
      this.opts.width / this.opts.height,
      1,
      this.opts.maxDistance * 2
    );
    // 设定相机初始位置
    this.camera.position.set(...this.opts.cameraPosition);
    this.scene.add(this.camera);

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.opts.width, this.opts.height);

    // 将渲染器的dom元素挂载到节点
    this.container.appendChild(this.renderer.domElement);

    // 初始化滤镜(依赖包：postprocessing)
    this.composer = new EffectComposer(this.renderer);
    const outlineEffect = new OutlineEffect(this.scene, this.camera, {
      blendFunction: BlendFunction.SCREEN,
      blur: false,
      edgeStrength: 2.5,
      pulseSpeed: 0.0,
      visibleEdgeColor: 0xffffff,
      xRay: true,
    });
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const outlinePass = new EffectPass(this.camera, outlineEffect);
    outlinePass.renderToScreen = true;
    this.composer.addPass(outlinePass);
    this.effect = outlineEffect;

    // 初始化环境光
    const ambientLight = new THREE.AmbientLight('0xcccccc', 1);
    this.scene.add(ambientLight);

    // 载入场景控制器
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = this.opts.minDistance;
    controls.maxDistance = this.opts.maxDistance;

    // 初始化光源
    const pointLight = new THREE.SpotLight(this.opts.lightColor, this.opts.lightIntensity);
    pointLight.position.set(...this.opts.lightPosition);
    this.camera.add(pointLight);

    // 增加场景背景
    this.scene.background = new THREE.TextureLoader().load(this.opts.sceneBg);

    // 绑定交互事件
    this.interaction = new Interaction(this.renderer, this.scene, this.camera);

    // 增加resize监听事件
    window.addEventListener('resize', this.handleResize, false);

    this.start();

    // 场景加载
    this.initialization();
  }

  start() {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate.bind(this));
    }
  }

  stop() {
    window.cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.composer.render();
    this.frameId = window.requestAnimationFrame(this.animate.bind(this));
  }

  initialization() {
    const buildingNames = Object.keys(this.data);
    // 加载各楼模型
    buildingNames.forEach(name => {
      this.loadObject(this.data[name]);
    });
  }

  Destory() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.container.removeChild(this.renderer.domElement);
  }

  /**
   * 窗口尺寸改变后
   */
  handleResize = () => {
    this.opts.width = this.container.clientWidth;
    this.opts.height = this.container.clientHeight;
    this.camera.aspect = this.opts.width / this.opts.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.opts.width, this.opts.height);
  };

  loadObject(item) {
    new MTLLoader().load(`/models/${item.file}.mtl`, mtl => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load(`/models/${item.file}.obj`, obj => {
        obj.position.x = this.opts.modelPosition[0] * this.opts.modelScale;
        obj.position.y = this.opts.modelPosition[1] * this.opts.modelScale;
        obj.position.z = this.opts.modelPosition[2] * this.opts.modelScale;
        obj.scale.set(this.opts.modelScale, this.opts.modelScale, this.opts.modelScale);
        this.addObjectFlag(item, obj);
        this.scene.add(obj);
      });
    });
  }

  addObjectFlag(item, obj) {
    // 增加鼠标经过事件
    obj.on('mouseover', ev => {
      for (const o of this.objects) {
        if (o instanceof THREE.Mesh) {
          this.effect.deselectObject(o);
        }
      }
      const {
        data: { target },
      } = ev;
      if (target instanceof THREE.Group) {
        for (const t of target.children) {
          if (t instanceof THREE.Mesh) {
            this.effect.selectObject(t);
          }
        }
      } else if (target instanceof THREE.Mesh) {
        this.effect.selectObject(target);
      }
    });

    // 鼠标离开事件
    obj.on('mouseout', ev => {
      const {
        data: { target },
      } = ev;
      if (target instanceof THREE.Group) {
        for (const t of target.children) {
          if (t instanceof THREE.Mesh) {
            this.effect.deselectObject(t);
          }
        }
      } else if (target instanceof THREE.Mesh) {
        this.effect.deselectObject(target);
      }
    });
    // 鼠标点击事件
    obj.on('click', event => {
      if (this.clickHandle) {
        const { target } = event;
        if (Object.hasOwnProperty.call(target, 'record_id')) {
          this.clickHandle(target.record_id);
        }
      }
    });

    const { children } = obj;
    this.Buildings[item.name] = obj;

    // 如果建筑的数据已经获取 自动创建标牌
    if (Object.hasOwnProperty.call(this.AllBuildingSelectType, item.name)) {
      this.createSprite(item.name);
    }

    this.objects = [...this.objects, ...children];
  }

  // 全部重新创建标签
  createAllSprite(AllBuilding) {
    for (let i = 0; i < AllBuilding.length; i += 1) {
      if (Object.hasOwnProperty.call(this.AllBuildingSelectType, AllBuilding[i].name)) {
        if (this.AllBuildingSelectType[AllBuilding[i].name] !== AllBuilding[i].select) {
          // 设定当前建筑的选中状态
          this.AllBuildingSelectType[AllBuilding[i].name] = AllBuilding[i].select;
          this.createSprite(AllBuilding[i].name);
        }
      } else {
        // 设定更新建筑的信息
        this.AllBuilding[AllBuilding[i].name] = AllBuilding[i];
        // 设定当前建筑的选中状态
        this.AllBuildingSelectType[AllBuilding[i].name] = AllBuilding[i].select;
        this.createSprite(AllBuilding[i].name);
      }
    }
  }

  /**
   * 此方法只能为受管理的建筑添加标牌
   * @param {*} name
   */
  createSprite(name) {
    if (Object.hasOwnProperty.call(this.Buildings, name)) {
      if (!Object.hasOwnProperty.call(this.Buildings[name], 'record_id')) {
        this.Buildings[name].record_id = this.AllBuilding[name].record_id;
      }

      const item = this.data[name];
      const { flag_type } = this.AllBuilding[name];
      const { flag_type_text } = this.AllBuilding[name];
      const select = this.AllBuildingSelectType[name];

      let img = `/flags/${flag_type}.png`;
      if (!select) {
        img = `/flags/0.png`;
      }

      const image = new Image();
      const canvas = document.createElement('canvas');
      canvas.width = 570;
      canvas.height = 395;
      const texture = new THREE.Texture(canvas);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.font = '100px Arial';
      ctx.lineWidth = 25;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      image.onload = () => {
        ctx.drawImage(image, 0, 0, 570, 395);
        ctx.fillText(name, 285, 100);
        ctx.fillText(flag_type_text, 285, 200);
        texture.needsUpdate = true;
      };

      const material = new THREE.SpriteMaterial({ map: texture });
      const flag = new THREE.Sprite(material);
      flag.scale.set(3000, 2200, 1);
      flag.position.set(...item.position);
      image.src = img;

      // 如果建筑有标牌 移除原有标牌
      if (Object.hasOwnProperty.call(this.Flags, name)) {
        this.Buildings[name].remove(this.Flags[name]);
      }
      // 为建筑设置标牌
      this.Buildings[name].add(flag);

      // 将标牌添加到管理组中
      this.Flags[name] = flag;
    }
  }
}
