import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Button, Menu, DatePicker, Tag, Dropdown } from 'antd';
import TableList from '../../components/TableList';
import moment from 'moment';
import { formatTimestamp } from '../../utils/utils';
import OrderManagementInfo from './OrderManagementInfo/OrderManagementInfo';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { SearchCard, SearchItem } from '@/components/SearchCard';
import { DicSelect, DicShow } from '@/components/Dictionary';

@connect(state => ({
  orderManagement: state.orderManagement,
}))
@Form.create()
export default class OrderManagement extends PureComponent {
  state = {
    shoporderInfoFrame: {
      visible: false,
      // data: null,
    },
  };

  pagination = {};

  componentDidMount() {
    this.onBtnSearchClick();
  }

  onBtnSearchClick = () => {
    this.pagination = {
      current: 1,
      pageSize: 10,
    };
    const formData = this.props.form.getFieldsValue();
    if (formData.settlefromto) {
      formData.from = formData.settlefromto[0].unix();
      formData.to = formData.settlefromto[1].unix();
    }
    // // 修改时间精度到秒
    // if (this.queryForm.fromto) {
    //   this.state.from = this.queryForm.fromto[0].unix();
    //   this.state.to = this.queryForm.fromto[1].unix();
    //   this.queryForm['from'] = this.state.from;
    //   this.queryForm['to'] = this.state.to;
    // } else {
    //   this.queryForm['from'] = this.state.from;
    //   this.queryForm['to'] = this.state.to;
    // }
    // if (this.queryForm.settlefromto) {
    //   this.state.settlefrom = this.queryForm.settlefromto[0].unix();
    //   this.state.settleto = this.queryForm.settlefromto[1].unix();
    //   this.queryForm.from = this.state.settlefrom;
    //   this.queryForm.to = this.state.settleto;
    // } else {
    //   this.queryForm.settle_from = this.state.settlefrom;
    //   this.queryForm.settle_to = this.state.settleto;
    // }
    // if (!isNullOrUndefined(this.queryForm.setted)) {
    //   this.queryForm.setted = parseInt(this.queryForm.setted, 10);
    // }
    // if (!isNullOrUndefined(this.queryForm.complain_status)) {
    //   this.queryForm.complain_statustted = parseInt(this.queryForm.complain_status, 10);
    // }
    // if (!isNullOrUndefined(this.queryForm.refund_status)) {
    //   this.queryForm.refund_status = parseInt(this.queryForm.refund_status, 10);
    // }
    // if (!isNullOrUndefined(this.queryForm.order_status)) {
    //   this.queryForm.order_status = parseInt(this.queryForm.order_status, 10);
    // }

    // delete this.queryForm.fromto;
    // delete this.queryForm.settlefromto;
    this.queryListData(formData, this.pagination);
  };

  /**
   * 分页事件
   */
  onTableChange = pagination => {
    const params = this.queryForm;
    this.queryListData(params, pagination);
  };

  /**
   * 清空按钮点击事件
   */
  onBtnClearClick = () => {
    this.props.form.resetFields();
    this.onBtnSearchClick();
  };

  /**
   * 打开店铺信息查看界面
   * @param {店铺信息记录} rec
   */
  showStoreStatueInfoFrame = rec => {
    this.props.dispatch({
      type: 'orderManagement/setOrderInfo',
      payload: rec,
    });
    this.setState({
      shoporderInfoFrame: {
        visible: true,
        // data: rec,
      },
    });
  };

  // 取消屏蔽
  ReleaseShield = rec => {
    this.props.dispatch({
      type: 'orderManagement/ReleaseShield',
      param: rec,
    });

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  // 屏蔽
  Shield = rec => {
    this.props.dispatch({
      type: 'orderManagement/Sheild',
      param: rec,
    });

    // // 重新加载表格数据
    // this.queryListData(this.queryForm, this.pagination);
  };

  /**
   * 子窗口关闭回调
   */
  closeSubFrame = () => {
    // 关闭窗口
    this.props.dispatch({
      type: 'orderManagement/setOrderInfo',
      payload: null,
    });
    this.setState({
      shoporderInfoFrame: {
        visible: false,
        // data: null,
      },
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(params, pagination) {
    this.props.dispatch({
      type: 'orderManagement/queryShopStatueTotalInfo',
      params,
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  renderSearchForm() {
    const { getFieldDecorator } = this.props.form;
    // const {
    //   orderManagement: { OrderStatueList, deliveryStatus },
    // } = this.props;
    const { RangePicker } = DatePicker;
    // 日期控件样式
    const dateFormat = 'YYYY/MM/DD';
    return (
      <SearchCard
        form={this.props.form}
        onSearch={this.onBtnSearchClick}
        onReset={this.onBtnClearClick}
      >
        <SearchItem label="订单编号">
          {getFieldDecorator('order_id', {})(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="买家">
          {getFieldDecorator('user_name', {})(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="商铺">
          {getFieldDecorator('store_name', {})(<Input placeholder="请输入" />)}
        </SearchItem>
        <SearchItem label="订单状态">
          {getFieldDecorator('order_status', {})(
            <DicSelect
              vmode="string"
              pcode="mall$#order$#orderstatus"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="配送状态">
          {getFieldDecorator('delivery_status', {})(
            <DicSelect
              vmode="string"
              pcode="mall$#order$#distribution"
              selectProps={{ placeholder: '请选择' }}
            />
          )}
        </SearchItem>
        <SearchItem label="下单时间">
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
        </SearchItem>
      </SearchCard>
    );
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      orderManagement: {
        tableData: { list, pagination },
        // OrderStatueList,
        // deliveryStatus,
        loading,
      },
    } = this.props;

    // 列定义
    // const colWidthShort = 100;
    // const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: 'operation',
        fixed: 'left',
        width: 70,
        render: (text, record) => (
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.showStoreStatueInfoFrame(record)}>查看</Menu.Item>
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
      {
        title: '订单编号',
        dataIndex: 'order_id',
        width: 100,
        key: 'order_id',
      },
      {
        title: '买家名称',
        dataIndex: 'user_name',
        // width: colWidthNormal,
        key: 'user_name',
      },
      {
        title: '买家账号',
        dataIndex: 'user_tel',
        // width: 140,
        key: 'user_tel',
      },
      {
        title: '所属店铺',
        dataIndex: 'store_name',
        // width: 140,
        key: 'store_name',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
        // width: 70,
        key: 'order_status',
        render: value => {
          const statusColor = {
            1: 'blue',
            21: 'blue',
            22: 'blue',
            23: 'green',
            3: 'red',
            4: 'blue',
            5: 'blue',
            6: 'green',
            7: 'green',
            8: 'red',
          };
          return (
            <DicShow
              pcode="mall$#order$#orderstatus"
              code={[value]}
              show={name => (
                <Tag color={statusColor[value]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      {
        title: '店铺电话',
        dataIndex: 'store_tel',
        // width: colWidthShort,
        key: 'store_tel',
      },
      {
        title: '优惠金额(元)',
        dataIndex: 'cut_price',
        // width: colWidthShort,
        key: 'cut_price',
        render: text => {
          let s;

          if (String(text).length === 2) {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}0.${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            // s = parseFloat(s);
            return s;
          }

          if (String(text).length === 1) {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}0.0${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            // s = parseFloat(s);
            return s;
          } else if (`${text}`.substring(1, `${text}`.length - 2) === '.') {
            s =
              `${text}`.substring(0, `${text}`.length - 2) +
              `${text}`.substring(`${text}`.length - 2, `${text}`.length);
            return s;
          } else {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}.${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            return s;
          }
        },
      },
      {
        title: '订单金额(元)',
        dataIndex: 'price',
        // width: colWidthNormal,
        key: 'price',
        render: text => {
          let s;
          if (`${text}`.substring(0, `${text}`.length - 2) === '') {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}0.0${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            // s = parseFloat(s);
            return s;
          } else if (`${text}`.substring(1, `${text}`.length - 2) === '.') {
            s =
              `${text}`.substring(0, `${text}`.length - 2) +
              `${text}`.substring(`${text}`.length - 2, `${text}`.length);
            return s;
          } else {
            s = `${`${text}`.substring(0, `${text}`.length - 2)}.${`${text}`.substring(
              `${text}`.length - 2,
              `${text}`.length
            )}`;
            return s;
          }
        },
      },
      // {
      //   title: '投诉标志',
      //   dataIndex: 'complain_status',
      //   width: 70,
      //   key: 'complain_status',
      //   render: gender => {
      //     // <Option value={1}>正常</Option>
      //     // <Option value={2}>注销</Option>
      //     switch (gender) {
      //       case 1:
      //         return <Tag color="blue">无投诉</Tag>;
      //       case 2:
      //         return <Tag color="green">有投诉</Tag>;
      //       case 3:
      //         return <Tag color="red">已处理</Tag>;
      //       case 4:
      //         return <Tag color="blue">不处理</Tag>;
      //       default:
      //         return null;
      //     }
      //   },
      // },
      {
        title: '下单时间',
        dataIndex: 'created',
        // width: 150,
        key: 'created',
        render: text => {
          if (text) {
            return formatTimestamp(text);
          } else {
            return '';
          }
        },
      },
      {
        title: '配送状态',
        dataIndex: 'delivery_status',
        // width: 70,
        key: 'delivery_status',
        render: value => {
          const codeColor = ['blue', 'blue', 'green', 'red'];
          return (
            <DicShow
              pcode="mall$#order$#distribution"
              code={[value]}
              show={name => (
                <Tag color={codeColor[value - 1]} key={name}>
                  {name}
                </Tag>
              )}
            />
          );
        },
      },
      // {
      //   title: '退款标志',
      //   dataIndex: 'refund_status',
      //   width: 70,
      //   key: 'refund_status',
      //   render: gender => {
      //     // <Option value={1}>正常</Option>
      //     // <Option value={2}>注销</Option>
      //     switch (gender) {
      //       case 1:
      //         return <Tag color="blue">无退款</Tag>;
      //       case 2:
      //         return <Tag color="green">有退款</Tag>;
      //       default:
      //         return null;
      //     }
      //   },
      // },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return (
          <span>
            共{total}
            条记录
          </span>
        );
      },
      ...pagination,
    };

    const resultJsx = (
      <div>
        <PageHeaderLayout title="订单管理">
          <Card bordered={false}>
            {this.renderSearchForm()}
            <TableList
              style={{ marginTop: 20 }}
              loading={loading}
              rowKey={record => record.id}
              dataSource={list}
              columns={columns}
              scroll={{ x: 1700 }}
              onChange={this.onTableChange}
              pagination={paginationProps}
            />
          </Card>
        </PageHeaderLayout>
        {this.state.shoporderInfoFrame.visible && (
          <OrderManagementInfo
            // data={this.state.shoporderInfoFrame.data}
            onShopInfoFrameCloseCallback={this.closeSubFrame}
            ReleaseShieldCallback={this.ReleaseShield}
            ShieldCallback={this.Shield}
          />
        )}
      </div>
    );
    return resultJsx;
  }
}
