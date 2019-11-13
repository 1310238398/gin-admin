import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Modal, notification, Button, Menu, Icon, message, Select } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import VideoEquipmentList from './VideoEquipmentList';
import VideoEquipmentEdit from './VideoEquipmentEdit';

import styles from './index.less';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../../components/SearchCard';
import * as VideoEquipmentService from '@/services/s_videoEquipment';
import VideoEquipmentGroupEdit from './VideoEquipmentGroupEdit';
const { SubMenu } = Menu;

@connect(({ videoEquipment, loading }) => ({
  videoEquipment,
  loading: loading.models.videoEquipment,
}))
@Form.create()
export default class VideoEquipment extends PureComponent {
  state = {
    selectBuilding: null,
    selectBuildingPath: null,
    selectedRowKeys: [],
    selectedRows: [],
    treeSelectedKeys: [],
    editVisible: false,
    data: {
      list: [],
      pagination: {},
    },
    result: '',
  };

  pageSize = 10;

  current = 1;

  componentDidMount() {
    this.props.dispatch({
      type: 'videoEquipment/queryTreeStore',
    });

    this.props.dispatch({
      type: 'videoEquipment/listThird',
    });

    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: {},
      pagination: {},
    });
  }

  onNewparten = () => {
    this.props.dispatch({
      type: 'videoEquipment/loadFZForm',
      payload: {
        type: 'A',
      },
    });
  };

  onCloseGroup = () => {
    this.props.dispatch({
      type: 'videoEquipment/treeVisible',
      payload: false,
    });
  };

  renderDataForm() {
    const {
      videoEquipment: { treeVisible },
    } = this.props;
    if (treeVisible) {
      return (
        <VideoEquipmentGroupEdit
          editVisible={treeVisible}
          onClose={this.onCloseGroup}
          onGroupSaved={this.onGroupSaved}
        />
      );
    }
  }

  handleClickedit = data => {
    this.props.dispatch({
      type: 'videoEquipment/loadFZForm',
      payload: {
        record_id: data.record_id,
        type: 'E',
      },
    });
  };

  onAddClick = () => {
    const { selectBuilding } = this.state;
    this.props.dispatch({
      type: 'videoEquipment/loadSPForm',
      payload: {
        type: 'A',
        group_id: selectBuilding,
      },
    });
  };

  onItemEditClick = device => {
    this.props.dispatch({
      type: 'videoEquipment/loadSPForm',
      payload: {
        type: 'E',
        record_id: device.record_id,
      },
    });
    this.props.dispatch({
      type: 'videoEquipment/seeListInfo',
      payload: {
        record_id: device.record_id,
      },
    });
  };

  /**
   * 删除选中的设备
   */
  onItemMigrationClick = device => {
    Modal.confirm({
      title: `确定删除视频设备【${device.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        VideoEquipmentService.delEq(device).then(() => {
          notification.success({
            key: 'deleteDevice',
            message: '设备删除成功',
            description: `视频设备【${device.name}】已经删除!`,
          });
          this.props.dispatch({
            type: 'videoEquipment/fetchEQ',
            search: { position_id: this.getParentID() },
            pagination: {},
          });
        });
      },
    });
  };

  onClose = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormVisible',
      payload: false,
    });
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: { position_id: this.getParentID() },
      pagination: {},
    });
  };

  onSaved = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormVisible',
      payload: false,
    });
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: { position_id: this.getParentID() },
      pagination: {},
    });
  };

  getParentID = () => {
    const { treeSelectedKeys } = this.state;
    let parentID = '';
    if (treeSelectedKeys.length > 0) {
      [parentID] = treeSelectedKeys;
    }
    return parentID;
  };

  onSelect(key) {
    const keys = [key.record_id];
    this.setState({
      treeSelectedKeys: keys,
      selectBuilding: key.record_id,
      selectBuildingPath: key,
    });

    const {
      videoEquipment: { search },
    } = this.props;

    const item = {
      position_id: '',
    };

    if (keys.length > 0) {
      [item.position_id] = keys;
    }

    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: { ...search, ...item },
      pagination: {},
    });

    this.clearSelectRows();
    this.props.dispatch({
      type: 'videoEquipment/seeListInfo',
      payload: keys.record_id,
    });
  }

  deleClickdel = rec => {
    this.getSBList(rec.record_id);
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此分组？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.del.bind(this, rec),
    });
  };

  /**
   * 删除传值
   */
  del = rec => {
    const { result } = this.state;
    const list = result.list || [];
    if (rec.children && rec.children.length > 0) {
      message.warn('该分组下面存在下级菜单，不允许删除，如需删除请先将下级菜单删除');
    } else if (list && list.length > 0) {
      message.warn('该分组下面存在视频监控设备，不允许删除');
    } else {
      this.props.dispatch({
        type: 'videoEquipment/del',
        payload: rec.record_id,
      });
    }
    this.props.dispatch({
      type: 'videoEquipment/queryTreeStore',
    });
    // 重新加载表格数据
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: {},
      pagination: {},
    });
  };

  // 删除的分组下面是否存在设备
  getSBList = item => {
    let result;
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
    };
    if (item !== null) searchData.position_id = item;
    VideoEquipmentService.queryEQ(searchData).then(res => {
      this.setState({
        result: res,
      });
    });
  };

  onGroupSaved = () => {
    this.props.dispatch({
      type: 'videoEquipment/treeVisible',
      payload: false,
    });
    this.props.dispatch({
      type: 'videoEquipment/queryTreeStore',
    });
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: {},
      pagination: {},
    });
  };

  onResetFormClick = () => {
    const { form } = this.props;
    form.resetFields();
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      search: { position_id: this.getParentID() },
      pagination: {},
    });
  };

  onTableChange = event => {
    this.props.dispatch({
      type: 'videoEquipment/fetchEQ',
      pagination: {
        current: event.current,
        pageSize: event.pageSize,
      },
    });
  };

  onSearchFormSubmit = e => {
    if (e) {
      e.preventDefault();
    }
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'videoEquipment/fetchEQ',
        search: {
          ...values,
          position_id: this.getParentID(),
        },
        pagination: {},
      });
      this.clearSelectRows();
    });
  };

  clearSelectRows = () => {
    const { selectedRowKeys } = this.state;
    if (selectedRowKeys.length === 0) {
      return;
    }
    this.setState({ selectedRowKeys: [], selectedRows: [] });
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const {
      videoEquipment: { selectList },
    } = this.props;
    return (
      <SearchCard
        form={this.props.form}
        onSearch={this.onSearchFormSubmit}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="设备名称">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>

        <SearchItem label="三方系统">
          {getFieldDecorator('third_id', {
            rules: [{ required: false, message: '请选择' }],
          })(
            <Select placeholder="请选择" style={{ width: '100%' }}>
              {selectList.map(item => (
                <Select.Option key={item.record_id} value={item.record_id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </SearchItem>
        <SearchItem label="设备类型">
          {getFieldDecorator('device_type')(
            <DicSelect
              vmode="int"
              pcode="OPER$#monitor_category"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  // 左侧菜单递归
  renderNavMenuItems(menusData) {
    if (!menusData) {
      return [];
    }

    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              <span onClick={() => this.onSelect(item)}>
                <span>{item.name}</span>
                <Icon type="edit" onClick={() => this.handleClickedit(item)} />
                <Icon
                  type="close"
                  onClick={e => {
                    e.stopPropagation();
                    this.deleClickdel(item);
                  }}
                />
              </span>
            }
            key={item.record_id}
          >
            {this.renderNavMenuItems(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={item.record_id}>
          <span onClick={() => this.onSelect(item)}>
            {item.name}{' '}
            <span>
              <Icon type="edit" onClick={() => this.handleClickedit(item)} />
              <Icon type="close" onClick={() => this.deleClickdel(item)} />
            </span>
          </span>
        </Menu.Item>
      );
    });
  }

  render() {
    const { selectBuilding, selectBuildingPath, editVisible, editDevice } = this.state;
    const {
      videoEquipment: {
        loading,
        dataList,
        data: { list, pagination },
        formVisible,
      },
    } = this.props;
    return (
      <PageHeaderLayout title="视频设备管理">
        <Card className={styles.gate}>
          <table>
            <tbody>
              <tr>
                <td className={styles.left}>
                  {/* <SubMenuList datas={dataList} onSelect={this.onTreeNodeSelect} /> */}
                  <div>
                    <Button icon="plus" type="primary" onClick={() => this.onNewparten()}>
                      新建
                    </Button>
                  </div>
                  <div style={{ display: 'flex', flex: 'wrap' }}>
                    <Menu
                      style={{ width: 256 }}
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      mode="inline"
                    >
                      {this.renderNavMenuItems(dataList)}
                    </Menu>
                    {this.renderDataForm()}
                  </div>
                </td>
                <td className={styles.right}>
                  {this.renderSearchForm()}
                  <VideoEquipmentList
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
        {formVisible ? (
          <VideoEquipmentEdit
            editVisible={formVisible}
            selectBuilding={selectBuilding}
            selectBuildingPath={selectBuildingPath}
            onClose={this.onClose}
            onSaved={this.onSaved}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
