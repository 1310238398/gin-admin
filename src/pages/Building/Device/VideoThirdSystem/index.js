import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Modal, notification } from 'antd';
import VideoThirdSystemList from './VideoThirdSystemList';
import VideoThirdSystemEdit from './VideoThirdSystemEdit';

import styles from './index.less';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import VideoEquipmentThirdService from '@/services/s_videoEquipmentThird';

@connect(state => ({
  videoEquipmentThird: state.videoEquipmentThird,
}))
@Form.create()
export default class VideoThirdSystem extends PureComponent {
  state = {
    selectBuilding: null,
    selectBuildingPath: null,
    loading: true,
    editVisible: false,
    editDevice: null,
    data: {
      list: [],
      pagination: {},
    },
    formType: '',
  };

  pageSize = 10;

  current = 1;

  componentWillMount() {
    this.getList(this.current, this.pageSize);
  }

  // 列表显示
  getList = (current, pageSize) => {
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    const searchData = {
      q: 'page',
      pageSize,
      current,
      ...formData,
    };
    if (this.state.selectBuilding !== null) searchData.buildingID = this.state.selectBuilding.key;
    VideoEquipmentThirdService.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  onAddClick = () => {
    this.setState({ editDevice: null, editVisible: true, formType: 'A' });
  };

  onItemEditClick = device => {
    this.setState({ editDevice: { ...device }, editVisible: true, formType: 'E' });
  };

  /**
   * 删除选中的视频厂商
   */
  onItemMigrationClick = device => {
    Modal.confirm({
      title: `确定删除视频厂商【${device.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        VideoEquipmentThirdService.del(device).then(() => {
          notification.success({
            key: 'deleteDevice',
            message: '视频厂商删除成功',
            description: `视频厂商【${device.name}】已经删除!`,
          });
          this.getList(this.current, this.pageSize);
        });
      },
    });
  };

  onClose = () => {
    this.setState({ editVisible: false }, () => {
      this.getList(this.current, this.pageSize);
    });
  };

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, editDevice: { ...device } }, () => {
        this.getList(this.current, this.pageSize);
      });
    } else {
      this.setState({ editVisible: false, editDevice: null }, () => {
        this.getList(this.current, this.pageSize);
      });
    }
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList(this.current, this.pageSize);
  };

  onTableChange = event => {
    this.props.dispatch({
      type: 'videoEquipmentThird/fetch',
      pagination: {
        current: event.current,
        pageSize: event.pageSize,
      },
    });
    this.getList(event.current, event.pageSize);
  };

  render() {
    const {
      selectBuilding,
      selectBuildingPath,
      editVisible,
      editDevice,
      data: { list, pagination },
      loading,
      formType,
    } = this.state;
    return (
      <PageHeaderLayout title="视频厂商系统管理">
        <Card className={styles.gate}>
          <table>
            <tbody>
              <tr>
                <td className={styles.right}>
                  <VideoThirdSystemList
                    selectBuilding={selectBuilding}
                    list={list}
                    pagination={pagination}
                    loading={loading}
                    onTableChange={this.onTableChange}
                    onAddClick={this.onAddClick}
                    onItemEditClick={this.onItemEditClick}
                    onItemMigrationClick={this.onItemMigrationClick}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        {/* 编辑窗口 */}
        {editVisible ? (
          <VideoThirdSystemEdit
            editVisible={editVisible}
            editDevice={editDevice}
            selectBuilding={selectBuilding}
            selectBuildingPath={selectBuildingPath}
            onClose={this.onClose}
            onSaved={this.onSaved}
            type={formType}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
