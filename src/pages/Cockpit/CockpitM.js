import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Link } from 'dva/router';
import { getCockpitData } from '@/services/s_mockData';
import styles from './Cockpit.less';

@connect(state => ({
  parkstatistics: state.parkstatistics,
}))
class CockpitM extends PureComponent {
  state = {
    btnHover: false,
    btnClick: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'parkstatistics/fetchContentData',
    });
    // getCockpitData().then(v => {
    //   this.setState({ topData: v });
    // });
  }

  handleHover = () => {
    const { btnHover } = this.state;
    if (btnHover) {
      return;
    }
    this.setState({ btnHover: true });
  };

  handleBlur = () => {
    const { btnHover, btnClick } = this.state;
    if (!btnHover || btnClick) {
      return;
    }
    this.setState({ btnHover: false });
  };

  handleClick = () => {
    if (this.doClick) {
      return;
    }
    this.doClick = true;
    const { btnClick } = this.state;
    const click = !btnClick;
    this.setState({ btnClick: click }, () => {
      setTimeout(() => {
        let hover = true;
        if (!click) {
          hover = false;
        }
        this.setState({ btnHover: hover });
        this.doClick = false;
      }, 400);
    });
  };

  handleLocation = () => {
    router.push('/');
  };

  render() {
    const { btnHover, btnClick } = this.state;
    const {
      parkstatistics: { contentBasiaData },
    } = this.props;
    const mainStyle = {
      backgroundImage:
        'url(/assets/cockpit/bg-hover-min.jpg),url(/assets/cockpit/bg-hover-small.jpg),url(/assets/cockpit/bg-min.jpg)',
      transition: 'all .3s ease-in',
    };

    const itemsStyle = {
      opacity: 1,
      transform: 'scale(1)',
      transition: 'all .3s ease',
      pointerEvents: 'auto',
    };

    return (
      <div className={styles.main} style={btnClick ? mainStyle : null}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <div
              className={styles.topLeftLogo}
              onClick={() => {
                this.handleLocation();
              }}
            />
          </div>
          <div className={styles.topCenter}>
            <span>总建筑面积： {contentBasiaData.total_area}</span>
            <span>
              已入驻公司：
              {contentBasiaData.enterprise_number}
            </span>
            <span>
              园区总人数：
              {contentBasiaData.user_number}人
            </span>
          </div>
          <div className={styles.topRight} />
        </div>
        <ul className={styles.items} style={btnClick ? itemsStyle : null}>
          <li>
            <Link to="/cockpitm/parkview">园区一览</Link>
          </li>
          <li>
            <Link to="/cockpitm/zsprocess/jingzhun">招商招租</Link>
          </li>
          <li>
            <Link to="/cockpitm/2">能耗分析</Link>
          </li>
          <li>
            <Link to="/cockpitm/3">收入分析</Link>
          </li>
          <li>
            <Link to="/cockpitm/4">车流分析</Link>
          </li>
          <li>
            <Link to="/cockpitm/5">人流分析</Link>
          </li>
          <li>
            <Link to="/cockpitm/videomonitor">视频监控</Link>
          </li>
        </ul>
        <div className={btnHover ? styles.bottomHover : ''} />
        <div
          className={styles.bottom}
          onMouseEnter={() => {
            this.handleHover();
          }}
          onMouseLeave={() => {
            this.handleBlur();
          }}
          onClick={e => {
            e.stopPropagation();
            this.handleClick();
          }}
        >
          <div className={styles.bottomLogo} />
        </div>
      </div>
    );
  }
}
export default CockpitM;
