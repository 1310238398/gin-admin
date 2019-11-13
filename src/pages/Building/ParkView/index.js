import React, { PureComponent } from 'react';
import { Modal } from 'antd';
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

// import DetailModal from '@/pages/InvestmentStatistics/DetailModal';
import ParkStatistics from '@/pages/Building/ParkStatistics/ParkStatistics';

import styles from './index.less';

function SiderButton(props) {
  return (
    <div className={styles.siderButton} onClick={props.onClick}>
      <img src={props.open ? '/assets/sider-btn-close.png' : '/assets/sider-btn-open.png'} alt="" />
      <span>数据展示</span>
    </div>
  );
}

class ParkView extends PureComponent {
  state = {
    chartVisible: false,
    // detailVisible: false,
    // activeItem: {},
    data: [
      { name: 'A1-1', flag: 1, type: -1, position: [-22500, 14000, -17000], file: 'A14' },
      { name: 'A1-2', flag: 1, type: 1, position: [-23000, 12000, -10000], file: 'A9' },
      { name: 'A1-3', flag: 1, type: 1, position: [-29500, 15000, -17000], file: 'A11' },
      { name: 'A1-4', flag: 1, type: 1, position: [-29500, 12000, -10500], file: 'A8' },
      { name: 'A1-5', flag: 1, type: 1, position: [-37500, 17000, -13000], file: 'A10' },

      { name: 'A2-1', flag: 1, type: 0, position: [-21500, 12500, 0], file: 'A7' },
      { name: 'A2-2', flag: 1, type: 0, position: [-20500, 11500, 9000], file: 'A12' },
      { name: 'A2-3', flag: 1, type: 0, position: [-27500, 11500, 0], file: 'A1' },
      { name: 'A2-4', flag: 1, type: 0, position: [-27500, 11500, 10000], file: 'A6' },
      { name: 'A2-5', flag: 1, type: 1, position: [-35500, 13500, 0], file: 'A0' },
      { name: 'A2-6', flag: 1, type: 1, position: [-35500, 12500, 10000], file: 'A5' },

      { name: 'A3-1', flag: 1, type: 0, position: [-21500, 12000, 19000], file: 'A13' },
      { name: 'A3-2', flag: 1, type: 1, position: [-20500, 9000, 28000], file: 'A3' },
      { name: 'A3-3', flag: 1, type: 1, position: [-26500, 11000, 27000], file: 'A15' },
      { name: 'A3-4', flag: 1, type: 0, position: [-35500, 12000, 19000], file: 'A4' },
      { name: 'A3-5', flag: 1, type: 0, position: [-34000, 20000, 28000], file: 'A2' },

      { name: 'A4-1', flag: 1, type: 1, position: [12500, 12000, -17000], file: 'A22' },
      { name: 'A4-2', flag: 1, type: -1, position: [6500, 12000, -18000], file: 'A34' },
      { name: 'A4-3', flag: 1, type: 1, position: [5500, 16000, -9000], file: 'A18' },
      { name: 'A4-4', flag: 1, type: 1, position: [-5500, 16000, -9000], file: 'A17' },
      { name: 'A4-5', flag: 1, type: 1, position: [-5500, 12000, -17000], file: 'A23' },
      { name: 'A4-6', flag: 1, type: 1, position: [-13000, 13000, -17500], file: 'A37' },

      { name: 'A5-1', flag: 1, type: -1, position: [10500, 17000, 1000], file: 'A19' },
      { name: 'A5-2', flag: 1, type: 0, position: [6500, 17000, 10000], file: 'A21' },
      { name: 'A5-3', flag: 1, type: 1, position: [500, 34000, 1000], file: 'A24' },
      { name: 'A5-4', flag: 1, type: -1, position: [-7500, 17000, 10000], file: 'A20' },
      { name: 'A5-5', flag: 1, type: -1, position: [-12000, 17000, 1000], file: 'A16' },

      { name: 'A6-1', flag: 1, type: 1, position: [37000, 16000, -10000], file: 'A35' },
      { name: 'A6-2', flag: 1, type: 1, position: [29500, 14000, -10000], file: 'A25' },
      { name: 'A6-3', flag: 1, type: 1, position: [29500, 14000, -17000], file: 'A28' },
      { name: 'A6-4', flag: 1, type: 1, position: [22500, 14000, -10000], file: 'A26' },
      { name: 'A6-5', flag: 1, type: -1, position: [22500, 14000, -17000], file: 'A27' },

      { name: 'A7-1', flag: 1, type: 1, position: [37500, 12500, 1000], file: 'A32' },
      { name: 'A7-2', flag: 1, type: 1, position: [37500, 12500, 10000], file: 'A31' },
      { name: 'A7-3', flag: 1, type: 1, position: [29500, 12500, 10000], file: 'A33' },
      { name: 'A7-4', flag: 1, type: -1, position: [29500, 12500, 1000], file: 'A40' },
      { name: 'A7-5', flag: 1, type: 1, position: [22500, 12500, 10000], file: 'A29' },
      { name: 'A7-6', flag: 1, type: -1, position: [22500, 12500, 1000], file: 'A30' },
      { name: 'A8-1', flag: 1, type: 1, position: [37500, 17000, 27500], file: 'A38' },

      { name: 'B0', file: 'B0' },
      { name: 'B1', file: 'B1' },
      { name: 'B2', file: 'B2' },
      { name: 'B3', file: 'B3' },
      { name: 'B4', file: 'B4' },
    ],
  };

  componentDidMount() {
    this.opts = {
      width: this.mount.clientWidth,
      height: this.mount.clientHeight,
      cameraAngle: 45,
      cameraPosition: [0, 77534, -101173],
      minDistance: 50000,
      maxDistance: 300000,
      lightColor: 0xdddddd,
      lightIntensity: 0.5,
      lightPosition: [100000, 100000, 100000],
      sceneBg: '/models/dark-bg.png',
      modelPosition: [-20000, 160, -1771],
      modelScale: 1,
    };

    // 创建场景
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
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.opts.width, this.opts.height);

    // 将渲染器的dom元素挂载到节点
    this.mount.appendChild(this.renderer.domElement);

    // 初始化滤镜(依赖包：postprocessing)
    this.composer = new EffectComposer(this.renderer);
    const outlineEffect = new OutlineEffect(this.scene, this.camera, {
      blendFunction: BlendFunction.SCREEN,
      edgeStrength: 2.5,
      pulseSpeed: 0.0,
      visibleEdgeColor: 0xffffff,
      blur: false,
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

    // 加载模型
    this.objects = [];
    this.loadObject({ name: 'LU', file: 'LU' });
    const { data } = this.state;
    data.forEach(v => {
      this.loadObject(v);
    });
  }

  componentWillUnmount() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.mount.removeChild(this.renderer.domElement);
  }

  // 加载模型
  loadObject = item => {
    new MTLLoader().load(`/models/${item.file}.mtl`, mtl => {
      mtl.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load(`/models/${item.file}.obj`, obj => {
        obj.position.x = this.opts.modelPosition[0] * this.opts.modelScale;
        obj.position.y = this.opts.modelPosition[1] * this.opts.modelScale;
        obj.position.z = this.opts.modelPosition[2] * this.opts.modelScale;
        obj.scale.set(this.opts.modelScale, this.opts.modelScale, this.opts.modelScale);

        if (item.flag === 1) {
          this.addObjectFlag(item, obj);
        }
        this.scene.add(obj);
      });
    });
  };

  addObjectFlag = (item, obj) => {
    const canvas = document.createElement('canvas');
    canvas.width = 90;
    canvas.height = 57;
    const texture = new THREE.Texture(canvas);
    const ctx = canvas.getContext('2d');

    const img = new Image();
    switch (item.type) {
      case 1:
        img.src = '/models/green.png';
        break;
      case -1:
        img.src = '/models/red.png';
        break;
      default:
        img.src = '/models/yellow.png';
        break;
    }

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.font = '30px Arial';
      ctx.lineWidth = 5;
      ctx.textAlign = 'center';
      ctx.fillText(item.name, 45, 32);
      texture.needsUpdate = true;
    };

    const material = new THREE.SpriteMaterial({ map: texture });
    const textObj = new THREE.Sprite(material);
    textObj.scale.set(2000, 2000, 2000);
    textObj.position.set(...item.position);
    obj.add(textObj);

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
    obj.on('click', () => {
      // this.handleObjectClick(item);
    });
    const { children } = obj;
    this.objects = [...this.objects, ...children];
  };

  // handleObjectClick = item => {
  //   this.setState({ detailVisible: true, activeItem: { code: item.name, name: item.name } });
  // };

  // handleDetailCancel = () => {
  //   this.setState({ detailVisible: false });
  // };

  // 显示隐藏

  handleModalCancel = () => {
    this.setState({ chartVisible: false });
  };

  handleResize = () => {
    this.camera.aspect = this.opts.width / this.opts.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.opts.width, this.opts.height);
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    window.cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.composer.render();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  handleSiderClick = () => {
    const { chartVisible } = this.state;
    this.setState({ chartVisible: !chartVisible });
  };

  render() {
    // const { chartVisible, detailVisible, activeItem } = this.state;
    const { chartVisible } = this.state;
    return (
      <div
        className={styles.main}
        ref={mount => {
          this.mount = mount;
        }}
      >
        {!chartVisible && (
          <div className={styles.closeSider}>
            <div className={styles.closeSiderLeft} />
            <div className={styles.closeSiderRight}>
              <SiderButton open={chartVisible} onClick={this.handleSiderClick} />
            </div>
          </div>
        )}
        <ul className={styles.topFlag}>
          <li>
            <span>已招商</span>
          </li>
          <li>
            <span>未招商</span>
          </li>
          <li>
            <span onClick={this.handleSiderClick}>部分招商</span>
          </li>
        </ul>
        {chartVisible && (
          <Modal
            destroyOnClose
            visible={chartVisible}
            className={styles.darkModal}
            maskClosable={false}
            closable
            width="68%"
            centered
            maskStyle={{
              background: 'transparent',
            }}
            onCancel={() => {
              this.handleModalCancel();
            }}
            footer={null}
          >
            <ParkStatistics show={chartVisible} />
            {/* <div className={styles.openSider}>
              <div className={styles.openSiderLeft}>
                <ParkStatistics show={chartVisible} />
              </div>
              <div className={styles.openSiderRight}>
                <SiderButton open={chartVisible} onClick={this.handleSiderClick} />
              </div>
            </div> */}
          </Modal>
        )}
        {/* <DetailModal
          visible={detailVisible}
          onCancel={() => {
            this.handleDetailCancel();
          }}
          {...activeItem}
        /> */}
      </div>
    );
  }
}

export default ParkView;
