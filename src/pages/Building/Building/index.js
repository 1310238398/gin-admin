import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Modal } from 'antd';
import { Building3D } from './Building3D';
import { parseBuildingStatus, parseBuildingStatusText } from '../../../utils/utils';
import ParkStatistics from '@/pages/Building/ParkStatistics/ParkStatistics';
import * as builingService from '@/services/building';
import styles from './index.less';

@connect(state => ({
  building: state.building,
}))
class ParkView extends PureComponent {
  AllBuilding = [];

  constructor(props) {
    super(props);
    this.state = {
      areaData: [],
      activeArea: '', // 当前选中的区域
      activeType: 0, // 当前选中的状态
      areaVisible: false,
      chartVisible: false,
    };
  }

  componentDidMount() {
    this.B3D = new Building3D(this.mount, this.handelBuildingClick);
    this.getAllData();
  }

  componentWillUnmount() {
    if (this.B3D) {
      this.B3D.Destory();
    }
  }

  getAllData() {
    builingService.HouseQuery({ q: 'list', btype: 90 }).then(data => {
      this.setState({ areaData: data.list ? data.list : [] });
    });

    builingService.HouseQuery({ q: 'list', btype: 80 }).then(data => {
      this.handleBuilding(data.list ? data.list : []);
    });
  }

  handleBuilding = data => {
    // 设定建筑列表
    const items = [];
    // 设定建筑的状态
    for (let i = 0; i < data.length; i += 1) {
      const building = data[i];
      building.flag_type = parseBuildingStatus(building);
      building.flag_type_text = parseBuildingStatusText(building);
      items.push(building);
    }
    this.AllBuilding = items;
    this.flagsSetting();
  };

  // 关闭弹出框
  handleModalCancel = () => {
    this.setState({ chartVisible: false });
  };

  // 切换弹出框
  handleSiderClick = () => {
    const { chartVisible } = this.state;
    this.setState({ chartVisible: !chartVisible });
  };

  // 打开关闭区域列表
  handleAreaOpenButtonClick = () => {
    const { areaVisible } = this.state;
    this.setState({ areaVisible: !areaVisible });
  };

  // 区域切换
  handleAreaButtonClick = id => {
    const { activeArea } = this.state;
    if (activeArea !== id) {
      this.setState({ activeArea: id });
      this.flagsSetting(id);
    }
  };

  // 建筑点击后
  handelBuildingClick = id => {
    router.push(`/building/floorframe/${id}`);
  };

  // 楼盘状态切换
  handleTypeButtonClick = type => {
    const { activeType } = this.state;
    if (activeType !== type) {
      this.setState({ activeType: type });
      this.flagsSetting(undefined, type);
    }
  };

  /**
   * 根据筛选条件设定是否选中
   */

  flagsSetting(ActiveArea, ActiveType) {
    let { activeArea, activeType } = this.state;
    if (ActiveArea !== undefined) {
      activeArea = ActiveArea;
    }
    if (ActiveType !== undefined) {
      activeType = ActiveType;
    }
    for (let i = 0; i < this.AllBuilding.length; i += 1) {
      if (
        (activeArea === '' || this.AllBuilding[i].parent_id === activeArea) &&
        (activeType === 0 || this.AllBuilding[i].flag_type === activeType)
      ) {
        this.AllBuilding[i].select = true;
      } else {
        this.AllBuilding[i].select = false;
      }
    }

    // 触发批量创建标牌
    this.B3D.createAllSprite(this.AllBuilding);
  }

  render() {
    const { chartVisible, areaVisible, activeArea, activeType, areaData: AllAreas } = this.state;
    return (
      <div
        className={styles.main}
        ref={mount => {
          this.mount = mount;
        }}
      >
        {!chartVisible && (
          <button type="button" onClick={this.handleSiderClick} className={styles.dataButton}>
            <i />
            园区数据
          </button>
        )}
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
          </Modal>
        )}
        <div className={styles.typeBox}>
          <ul>
            <li
              className={activeType === 0 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(0);
              }}
            >
              全部
            </li>
            <li
              className={activeType === 20 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(20);
              }}
            >
              <i className={styles['type-20']} /> 已售完
            </li>
            <li
              className={activeType === 21 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(21);
              }}
            >
              <i className={styles['type-21']} /> 待售
            </li>
            <li
              className={activeType === 30 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(30);
              }}
            >
              <i className={styles['type-30']} /> 已租完
            </li>
            <li
              className={activeType === 31 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(31);
              }}
            >
              <i className={styles['type-31']} /> 待租
            </li>
            <li
              className={activeType === 40 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(40);
              }}
            >
              <i className={styles['type-40']} /> 租售完成
            </li>
            <li
              className={activeType === 41 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(41);
              }}
            >
              <i className={styles['type-41']} /> 待租待售
            </li>
            <li
              className={activeType === 42 ? styles.active : styles.no}
              onClick={() => {
                this.handleTypeButtonClick(42);
              }}
            >
              <i className={styles['type-42']} /> 租售中
            </li>
          </ul>
        </div>
        <div className={styles.areaBox} style={{ right: areaVisible ? '0' : '-220px' }}>
          <button type="button" onClick={this.handleAreaOpenButtonClick}>
            <i className={areaVisible ? styles.open : styles.close} /> 区域
          </button>
          <dl>
            <dt
              className={activeArea === '' ? styles.on : styles.no}
              onClick={() => this.handleAreaButtonClick('')}
            >
              全部区域
            </dt>
            {AllAreas &&
              AllAreas.length > 0 &&
              AllAreas.map(area => {
                return (
                  <dd
                    onClick={() => this.handleAreaButtonClick(area.record_id)}
                    className={activeArea === area.record_id ? styles.on : styles.no}
                    key={area.record_id}
                  >
                    <i className={styles.close} />
                    {area.code} {area.name}
                  </dd>
                );
              })}
          </dl>
        </div>
      </div>
    );
  }
}

export default ParkView;
