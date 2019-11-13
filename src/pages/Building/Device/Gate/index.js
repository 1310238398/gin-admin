import React, { PureComponent } from 'react';
import { Card, Form, Input, Modal, notification } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import ZoneTree from '@/components/ZoneTree';
import GateList from './GateList';
import GateEdit from './GateEdit';

import styles from './index.less';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../../components/SearchCard';
import * as entryGatesService from '@/services/entrygates';

@Form.create()
export default class Gate extends PureComponent {
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
  };

  pageSize = 10;

  current = 1;

  componentWillMount() {
    this.getList();
  }

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
    entryGatesService.query(searchData).then(res => {
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

  /**
   * 删除选中的设备
   */
  onItemMigrationClick = device => {
    Modal.confirm({
      title: `确定删除门禁设备【${device.name}】？`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        entryGatesService.del(device).then(res => {
          if (res && !res.error) {
            notification.success({
              key: 'deleteDevice',
              message: '设备删除成功',
              description: `门禁设备【${device.name}】已经删除!`,
            });
            this.getList();
          }
        });
      },
    });
  };

  onClose = () => {
    this.setState({ editVisible: false }, () => {
      // this.getList();
    });
  };

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, editDevice: { ...device }, selectBuilding: null, selectBuildingPath: null}, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, editDevice: null, selectBuilding: null, selectBuildingPath: null }, () => {
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
        <SearchItem label="门禁类型">
          {getFieldDecorator('deviceType')(
            <DicSelect
              vmode="int"
              pcode="OPER$#entrance_category"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="厂商">
          {getFieldDecorator('vendorID', {
            rules: [{ required: false, message: '请选择厂商' }],
          })(
            <DicSelect
              vmode="int"
              pcode="OPER$#device_vendor"
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
      editVisible,
      editDevice,
      data: { list, pagination },
      loading,
    } = this.state;
    return (
      <PageHeaderLayout title="门禁设备管理">
        <Card className={styles.gate}>
          <table>
            <tbody>
              <tr>
                <td className={styles.left}>
                  <ZoneTree onSelect={this.onTreeNodeSelect} />
                </td>
                <td className={styles.right}>
                  {this.renderSearchForm()}
                  <GateList
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
          <GateEdit
            editVisible={editVisible}
            editDevice={editDevice}
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
