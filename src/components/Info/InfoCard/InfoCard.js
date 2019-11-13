import React, { PureComponent } from 'react';
import { Drawer, Button, Icon } from 'antd';
import DescriptionList from '../../DescriptionList';
import InfoDetail from '../InfoDetail';
import InfoOp from '../InfoOp';

const { Description } = DescriptionList;

export default class InfoCard extends PureComponent {
  flag = 'close';

  constructor(props) {
    super(props);
    this.info = React.createRef();
    this.ops = new InfoOp({
      callback: this.onCallBack,
    });
    this.state = {
      refresh: 0,
      visible: true,
    };
  }

  onCallBack = (ok, op) => {
    const { refresh } = this.state;
    if (ok === 'ok') {
      this.flag = 'ok';
      if (op === InfoOp.actionKeys.destroy || op === InfoOp.actionKeys.delete) {
        this.onClose();
        return;
      }
      this.setState({ refresh: refresh + 1 });
    }
  };

  onClose = () => {
    const { callback } = this.props;
    if (callback) {
      callback(this.flag);
    }
    this.setState({ visible: false });
  };

  showExtra = () => {
    const {
      infoManage: { formData },
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  render() {
    const { id } = this.props;
    // const desc = formData.desc ? formData.desc : {};
    const { refresh, visible } = this.state;
    return (
      <Drawer
        title="信息详情"
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible={visible}
        width="50%"
      >
        <InfoDetail
          ref={this.info}
          value={id}
          refresh={refresh}
          actions={record =>
            this.ops.getActions(record).map(item => {
              return (
                <Button key={item.key} onClick={() => item.handler(record)}>
                  {item.icon && <Icon type={item.icon} />}
                  {item.name}
                </Button>
              );
            })
          }
        />
      </Drawer>
    );
  }
}
