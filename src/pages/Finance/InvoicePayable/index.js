import React, { PureComponent } from 'react';
import { Card, Form, Input } from 'antd';
import List from './List';
import Edit from './Edit';

import styles from './index.less';
import ZoneTree from '@/components/ZoneTree';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '../../../components/SearchCard';
import * as invoicePayableService from '@/services/invoicePayable';

@Form.create()
export default class extends PureComponent {
  state = {
    selectBuilding: null,
    selectBuildingPath: null,
    loading: true,
    editVisible: false,
    Data: null,
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

  getList = (resetCurrent = false) => {
    this.setState({ loading: true });
    const formData = this.props.form.getFieldsValue();
    if (resetCurrent) this.current = 0;
    const searchData = {
      q: 'page',
      pageSize: this.pageSize,
      current: this.current,
      ...formData,
    };
    if (this.state.selectBuilding !== null) searchData.buildingID = this.state.selectBuilding.key;
    invoicePayableService.lists(searchData).then(res => {
      this.setState({
        loading: false,
        data: res,
      });
    });
  };

  onAddClick = () => {
    this.setState({ Data: null, editVisible: true });
  };

  onItemEditClick = device => {
    this.setState({ Data: { ...device } }, () => {
      this.setState({ editVisible: true });
    });
  };

  onClose = () => {
    this.setState({ editVisible: false });
  };

  onSaved = () => {
    this.getList();
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
      <SearchCard
        form={this.props.form}
        onSearch={() => {
          this.getList(true);
        }}
        onReset={this.onResetFormClick}
      >
        <SearchItem label="企业名称">
          {getFieldDecorator('enterpriseName')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="抬头信息">
          {getFieldDecorator('headName')(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="税号">
          {getFieldDecorator('taxNumber')(<Input placeholder="请输入" />)}
        </SearchItem>
      </SearchCard>
    );
  }

  render() {
    const {
      selectBuilding,
      selectBuildingPath,
      editVisible,
      Data,
      data: { list, pagination },
      loading,
    } = this.state;
    return (
      <PageHeaderLayout title="企业开票信息管理">
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
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
        {/* <Card className={styles.gate}>
          {this.renderSearchForm()}
          <List
            selectBuilding={selectBuilding}
            list={list}
            pagination={pagination}
            loading={loading}
            onTableChange={this.onTableChange}
            onAddClick={this.onAddClick}
            onItemEditClick={this.onItemEditClick}
          />
        </Card> */}
        {/* 编辑窗口 */}
        {editVisible ? (
          <Edit
            editVisible={editVisible}
            Data={Data}
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
