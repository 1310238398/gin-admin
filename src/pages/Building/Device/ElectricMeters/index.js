import React, { PureComponent } from 'react';
import { Badge, Card, Form, Input, Modal, notification, Select } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import ZoneTree from '@/components/ZoneTree';
import List from './List';
import Edit from './Edit';
import Bind from './Bind';

import styles from './index.less';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../../components/SearchCard';
import * as electricMetersService from '@/services/electricMeters';

@Form.create()
export default class ElectricMeters extends PureComponent {
  state = {
    selectBuilding: null,
    selectBuildingPath: null,
    loading: true,
    editVisible: false,
    bindVisible: false,
    editDevice: null,
    data: {
      list: [],
      pagination: {},
    },
  };

  pageSize = 10;

  current = 1;

  componentWillMount() {
    this.getList();
  }

  /**
   * 选中树节点
   * @param key 节点key (空间的 record_id )
   * @param type 建筑类型 (空间的 type )
   */
  /**
   * 选中树节点
   * @param node 节点
   * @param nodePath 节点的路径
   */
  onTreeNodeSelect = (node, nodePath) => {
    this.setState(
      {
        selectBuilding: node,
        selectBuildingPath: nodePath,
      },
      () => {
        this.getList();
      }
    );
  };

  getList = () => {
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    if (this.state.selectBuilding !== null) searchData.buildingID = this.state.selectBuilding.key;
    electricMetersService.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  onAddClick = () => {
    this.setState({ editDevice: null, editVisible: true });
  };

  onItemEditClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ editVisible: true });
    });
  };

  // 电表冲正
  onItemReverseClick = device => {
    Modal.confirm({
      title: `确定将电表【${device.name}】冲正？`,
      content: (
        <p>
          冲正后的 <span style={{ color: 'red' }}>电表的余额</span> 将会被重置为{' '}
          <span style={{ color: 'red' }}>0</span> ！
        </p>
      ),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        electricMetersService.reverse(device).then(res => {
          if (res && res.status && !res.error) {
            notification.success({
              key: 'reverseDevice',
              message: '设备冲正成功',
              description: `电表【${device.name}】已经冲正!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  /**
   * 电表绑定新门牌
   */
  onItemBindClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ bindVisible: true });
    });
  };

  /**
   * 解绑电表
   */
  onItemUnbindClick = device => {
    Modal.confirm({
      title: `确定解绑电表【${device.name}】？`,
      content: (
        <p>
          解绑后电表将被闲置（<span style={{ color: 'red' }}>不属于任何门牌</span>）！
        </p>
      ),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        electricMetersService.unbind(device).then(res => {
          if (res && res.status && !res.error) {
            notification.success({
              key: 'UnbindDevice',
              message: '电表解绑成功',
              description: `电表【${device.name}】已经解绑!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  onClose = () => {
    this.setState({ editVisible: false, bindVisible: false });
  };

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, bindVisible: false, editDevice: { ...device } }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, bindVisible: false, editDevice: null }, () => {
        this.getList();
      });
    }
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.getList();
  };

  onTableChange = event => {
    this.current = event.current;
    this.pageSize = event.pageSize;
    this.getList();
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="设备名称">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="电表表号">
          {getFieldDecorator('meterAddr')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="欠费状态">
          {getFieldDecorator('feeStatus')(
            <Select placeholder="欠费状态">
              <Select.Option key="feeStatus-green" value={1}>
                <Badge color="green" text="正常" />
              </Select.Option>
              <Select.Option key="feeStatus-red" value={2}>
                <Badge color="red" text="欠费" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        <SearchItem label="电表类型">
          {getFieldDecorator('etype')(
            <DicSelect
              vmode="int"
              pcode="OPER$#electric_meters_type"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      selectBuilding,
      selectBuildingPath,
      bindVisible,
      editVisible,
      editDevice,
      data: { list, pagination },
      loading,
    } = this.state;
    return (
      <PageHeaderLayout title="电表管理">
        <Card className={styles.gate}>
          <table>
            <tbody>
              <tr>
                <td className={styles.left}>
                  <ZoneTree onSelect={this.onTreeNodeSelect} />
                </td>
                <td className={styles.right}>
                  {this.renderSearchForm()}
                  <List
                    selectBuilding={selectBuilding}
                    list={list}
                    pagination={pagination}
                    loading={loading}
                    onTableChange={this.onTableChange}
                    onAddClick={this.onAddClick}
                    onItemEditClick={this.onItemEditClick}
                    onItemReverseClick={this.onItemReverseClick}
                    onItemBindClick={this.onItemBindClick}
                    onItemUnbindClick={this.onItemUnbindClick}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        {/* 编辑窗口 */}
        {editVisible ? (
          <Edit
            editVisible={editVisible}
            editDevice={editDevice}
            selectBuilding={selectBuilding}
            selectBuildingPath={selectBuildingPath}
            onClose={this.onClose}
            onSaved={this.onSaved}
          />
        ) : null}
        {bindVisible ? (
          <Bind
            editVisible={bindVisible}
            editDevice={editDevice}
            onClose={this.onClose}
            onSaved={this.onSaved}
          />
        ) : null}
      </PageHeaderLayout>
    );
  }
}
