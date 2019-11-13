import React, { PureComponent } from 'react';
// import { Modal, Tag, Button, Card,Table,Menu, Dropdown } from "antd";
import { Modal, Form, Button, Card } from 'antd';
import { connect } from 'dva';
import TableList from '../../../components/TableList';
import styles from './ShowPageGroupInfo.less';

// const FormItem = Form.Item;
@connect(state => ({
  pageGroupingManagement: state.pageGroupingManagement,
}))
@Form.create()
export default class ShowPageGroupInfo extends PureComponent {
  state = {};

  pagination = {};

  componentDidMount() {
    this.props.dispatch({
      type: 'pageGroupingManagement/queryTagInfo',
      goodstagid: this.props.data.goods_tag_id,
    });
  }

  /**
   * 分页事件
   */
  onTableChange = pagination => {
    // const params = this.queryForm
    this.queryListData(pagination);
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(pagination) {
    this.props.dispatch({
      type: 'pageGroupingManagement/queryTagInfo',
      pagination,
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      data,
      pageGroupingManagement: {
        goodData: { goodslist, pagination },
        goodLoading,
      },
    } = this.props;
    const footerJsx = [
      <Button key="close" onClick={this.props.onShowPageGroupingInfoFrameCloseCallback}>
        关闭
      </Button>,
    ];
    // 列定义
    const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width: colWidthNormal,
        key: 'name',
      },

      {
        title: '商品分类',
        dataIndex: 'category_name',
        width: colWidthShort,
        key: 'category_name',
      },
      {
        title: '所属商铺',
        dataIndex: 'store_name',
        width: colWidthShort,
        key: 'store_name',
      },
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
      <Modal
        className={styles.frame}
        visible
        title="查看首页分组"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onShowPageGroupingInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <table
          style={{
            width: '100%',
          }}
        >
          <tbody>
            <tr>
              <td className={styles.title}>分组名称：</td>
              <td className={styles.label} colSpan={2}>
                {data.tag_name}
              </td>
              <td className={styles.title}>分组图标：</td>

              <td className={styles.label} colSpan={2}>
                <img alt="头像" src={data.image_path} className={styles.headImage} />
              </td>
            </tr>
            <tr>
              <td className={styles.title}>状态：</td>
              <td className={styles.label} colSpan={2}>
                {data.show ? '正常' : '隐藏'}
              </td>
            </tr>
          </tbody>
        </table>

        <Card bordered={false}>
          <TableList
            loading={goodLoading}
            dataSource={goodslist}
            columns={columns}
            onChange={this.onTableChange}
            pagination={paginationProps}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
