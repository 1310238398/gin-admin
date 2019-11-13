import React, { PureComponent } from 'react';
import { Badge, Card, Form, Input, Modal, DatePicker, Select } from 'antd';
import moment from 'moment';
import { DicSelect } from '@/components/Dictionary';
import ZoneTree from '@/components/ZoneTree';
import List from './List';
import Edit from './Edit';
import styles from './index.less';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import * as electricChargesService from '@/services/electricChanges';

@Form.create()
export default class ElectricityFeeList extends PureComponent {
  state = {
    selectBuilding: null,
    selectBuildingPath: null,
    loading: true,
    editVisible: false,
    editDevice: null,
    yunxuVisible: false,
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
    // 时间处理
    if (formData.settlefromto) {
      formData.from = formData.settlefromto[0].unix();
      formData.to = formData.settlefromto[1].unix();
    }
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: 1,
      ...formData,
    };
    if (this.state.selectBuilding !== null) searchData.buildingID = this.state.selectBuilding.key;
    electricChargesService.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  getList2 = () => {
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    // 时间处理
    if (formData.settlefromto) {
      formData.from = formData.settlefromto[0].unix();
      formData.to = formData.settlefromto[1].unix();
    }
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    if (this.state.selectBuilding !== null) searchData.buildingID = this.state.selectBuilding.key;
    electricChargesService.query(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };
  // 禁止缴费
  onItemUnbindClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ editVisible: true, yunxuVisible: false });
    });
  };

  // 允许缴费
  onItemEditClick = device => {
    this.setState({ editDevice: { ...device } }, () => {
      this.setState({ editVisible: true, yunxuVisible: true });
    });
  };

  // 导出
  onItemExportClick = () => {
    const formData = this.props.form.getFieldsValue();
    if (formData && formData.date) {
      const startTime = formData.date[0].format('YYYY-MM-DDTHH:mm:ssZ');
      const endTime = formData.date[1].format('YYYY-MM-DDTHH:mm:ssZ');
      delete formData.date;
      formData.startTime = startTime;
      formData.endTime = endTime;
    }

    const link = document.createElement('a');
    link.href = electricChargesService.download({
      startTime: formData.startTime,
      endTime: formData.endTime,
      id: formData.id,
    });
    link.target = '_blank';
    link.download = '用电量明细.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
    this.current = 1;
    this.getList();
  };

  onClose = () => {
    this.setState({ editVisible: false, yunxuVisible: false });
  };

  onTableChange = pagination => {
    this.current = pagination.current;
    this.pageSize = pagination.pageSize;
    this.getList2();
  };

  onSaved = device => {
    if (device) {
      this.setState({ editVisible: false, yunxuVisible: false, editDevice: { ...device } }, () => {
        this.getList();
      });
    } else {
      this.setState({ editVisible: false, yunxuVisible: false, editDevice: null }, () => {
        this.getList();
      });
    }
  };

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
    return (
      <SearchCard form={this.props.form} onSearch={this.getList} onReset={this.onResetFormClick}>
        <SearchItem label="设备名称">
          {getFieldDecorator('name')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="电表表号">
          {getFieldDecorator('meterAddr')(<Input placeholder="请输入" />)}
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
        <SearchItem label="业主姓名">
          {getFieldDecorator('ownerName')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="业主电话">
          {getFieldDecorator('ownerTel')(<Input placeholder="请输入" />)}
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
        <SearchItem label="缴费状态">
          {getFieldDecorator('paymentStatus')(
            <Select placeholder="缴费状态">
              <Select.Option key="feeStatus-green" value={1}>
                <Badge color="green" text="允许缴费" />
              </Select.Option>
              <Select.Option key="feeStatus-red" value={2}>
                <Badge color="red" text="禁止缴费" />
              </Select.Option>
            </Select>
          )}
        </SearchItem>
        {/* <SearchItem label="用电量查询时间">
          {getFieldDecorator('settlefromto', {})(
            <RangePicker
              style={{ width: '100%' }}
              showTime={{
                defaultValue: moment('00:00:00'),
              }}
              placeholder={['开始时间', '结束时间']}
              format={dateFormat}
              // onChange={this.settletimeonChange}
              // onOk={this.settletimeonOk}
            />
          )}
        </SearchItem> */}
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
      yunxuVisible,
    } = this.state;
    return (
      <PageHeaderLayout title="电费业务管理">
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
                    onItemExportClick={this.onItemExportClick}
                    onItemBindClick={this.onItemEditClick}
                    onItemUnbindClick={this.onItemUnbindClick}
                    onChangeTel={this.getList}
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
            yunxuVisible={yunxuVisible}
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
