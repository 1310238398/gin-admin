import React, { PureComponent } from 'react';
// import { Modal, Tag, Button, Card,Table,Menu, Dropdown } from "antd";
import { Modal, Form, Input, Row, Col, Button, Radio, Card, Table, Dropdown, Menu } from 'antd';
import { connect } from 'dva';
import PicturesWall from '../../../components/PicturesWall/PicturesWall';
import styles from './PageGroupingInfo.less';
import CommoditySelection from '../CommoditySelection/CommoditySelection';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@connect(state => ({
  pageGroupingManagement: state.pageGroupingManagement,
}))
@Form.create()
export default class PageGroupingInfo extends PureComponent {
  state = {
    AddRecommendedMerchandiseFrame: {
      visible: false,
      data: null,
    },
  };

  pagination = {};

  componentDidMount() {
    if (this.props.data.goods_tag_id) {
      this.props.dispatch({
        type: 'pageGroupingManagement/queryTagInfo',
        goodstagid: this.props.data.goods_tag_id,
        pagination: {
          current: 1,
          pageSize: 10,
        },
      });
    }
  }

  // 添加商品
  onAddcommidity = () => {
    this.setState({
      AddRecommendedMerchandiseFrame: {
        visible: true,
        data: null,
      },
    });
  };

  // 关闭添加
  closeSubFrameRecommende = () => {
    // 关闭窗口
    this.setState({
      AddRecommendedMerchandiseFrame: {
        visible: false,
        data: null,
      },
    });
  };

  // 选择商品之后传值掉后台
  SelectcommCallback = data => {
    const goodstagid = this.props.data.goods_tag_id;
    this.props.dispatch({
      type: 'pageGroupingManagement/Selectcommtag',
      data,
      tagid: goodstagid,
    });

    // 关闭窗口
    this.closeSubFrameRecommende();
  };

  /**
   * 分页事件
   */
  onTableChange = pagination => {
    // const params = this.queryForm
    this.queryListData(pagination);
  };

  onClassifiedEditorSaveCallback = () => {
    const { onNewClassifiedEditors, onEditClassifiedEditors } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        // 保存数据
        if (this.props.mode === 2) {
          if (formData.image_path && formData.image_path.length > 0) {
            formData.image_path = formData.image_path.join('');
          } else {
            formData.image_path = '';
          }
          formData.goods_tag_id = this.props.data.goods_tag_id;

          // 编辑
          this.props.dispatch({
            type: 'pageGroupingManagement/updateTag',
            body: formData,
          });
          onEditClassifiedEditors();
        } else if (this.props.mode === 1) {
          if (formData.image_path && formData.image_path.length > 0) {
            formData.image_path = formData.image_path.join('');
          } else {
            formData.image_path = '';
          }

          // 新建
          this.props.dispatch({
            type: 'pageGroupingManagement/insertTag',
            body: formData,
          });
          onNewClassifiedEditors();
        }
      }
    });
  };

  deleCommdityTag = rec => {
    const Taggoods = this.props.data.goods_tag_id;
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此分组商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.delepageGroupingoff.bind(this, { rec, Taggoods }),
    });
  };

  delepageGroupingoff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/deleCommdityTag',
      goods_id: rec.rec.goods_id,
      tag_id: rec.Taggoods,
    });
  };

  // 上移
  Moveup = rec => {
    const Taggoods = this.props.data.goods_tag_id;
    Modal.confirm({
      title: '操作确认',
      content: '确认要上移此分组商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MoveupOff.bind(this, { rec, Taggoods }),
    });
  };

  MoveupOff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/upCommdityTag',
      goods_id: rec.rec.goods_id,
      tag_id: rec.Taggoods,
    });
  };

  // 下移
  Movedown = rec => {
    const Taggoods = this.props.data.goods_tag_id;
    Modal.confirm({
      title: '操作确认',
      content: '确认要下移此分组商品？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.MovedownOff.bind(this, { rec, Taggoods }),
    });
  };

  MovedownOff = rec => {
    this.props.dispatch({
      type: 'pageGroupingManagement/downCommdityTag',
      goods_id: rec.rec.goods_id,
      tag_id: rec.Taggoods,
    });
  };

  /**
   * 查询数据
   * @param {*} pagination
   */
  queryListData(pagination) {
    this.props.dispatch({
      type: 'pageGroupingManagement/queryTagInfo',
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  /**
   * 界面渲染
   */
  render() {
    // Item布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutradio = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const { getFieldDecorator } = this.props.form;

    const {
      data,
      mode,
      pageGroupingManagement: {
        goodData: { goodslist, pagination },
        goodLoading,
      },
    } = this.props;
    const footerJsx = [
      <Button key="close" onClick={this.props.onPageGroupingInfoFrameCloseCallback}>
        关闭
      </Button>,
      <Button key="unauth" onClick={this.onClassifiedEditorSaveCallback}>
        保存
      </Button>,
    ];
    // 列定义
    const colWidthShort = 100;
    const colWidthNormal = 120;
    const columns = [
      {
        title: '操作',
        key: '操作',
        width: 200,
        render: (text, record) => (
          //  <span>

          //    <a  onClick={() => this.deleCommdityTag(record)}> 删除</a>
          //    {record.index>1?
          //    [<Divider type="vertical" />,
          //    <a onClick={() => this.Moveup(record)}> 上移</a>]:null}
          //    {record.index<goodslist.length?
          //    [<Divider type="vertical" />,
          //    <a onClick={() => this.Movedown(record)}> 下移</a>]:null}
          //  </span>
          <Dropdown
            placement="bottomCenter"
            overlay={
              <Menu>
                <Menu.Item onClick={() => this.deleCommdityTag(record)}>删除</Menu.Item>
                {record.index > 1 ? (
                  <Menu.Item onClick={() => this.Moveup(record)}>上移</Menu.Item>
                ) : null}

                {record.index < goodslist.length ? (
                  <Menu.Item onClick={() => this.Movedown(record)}>下移</Menu.Item>
                ) : null}
              </Menu>
            }
          >
            <Button>操作</Button>
          </Dropdown>
        ),
      },
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
        title={mode === 2 ? '编辑首页分组' : '添加首页分组'}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onPageGroupingInfoFrameCloseCallback}
        footer={footerJsx}
      >
        <Form>
          <Row gutter={10} type="flex" justify="space-between">
            <Col>
              <Form.Item {...formItemLayout} label="分组名称">
                {getFieldDecorator('tag_name', {
                  initialValue: data.tag_name,
                  rules: [
                    {
                      required: true,
                      message: '请输入标题',
                    },
                  ],
                })(<Input placeholder="请输入" maxLength={100} />)}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item {...formItemLayout} label="分类图标">
                {getFieldDecorator('image_path', {
                  initialValue: data.image_path ? [data.image_path] : [],
                  rules: [
                    {
                      required: false,
                      message: '请输入来源',
                    },
                  ],
                })(<PicturesWall num={1} bucket="oper" data="name" listType="picture-card" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12} type="flex" justify="space-between">
            <Col span={9}>
              <FormItem {...formItemLayoutradio} label="状态">
                {getFieldDecorator('show', {
                  initialValue: data.show,
                  rules: [
                    {
                      required: true,
                      message: '请选择',
                    },
                  ],
                })(
                  <RadioGroup value={data.show}>
                    <Radio value>正常</Radio>
                    <Radio value={false}>隐藏</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
        {mode === 2 ? (
          <React.Fragment>
            <Card bordered={false} style={{ marginTop: '16px' }}>
              <div>
                <Button icon="plus" type="primary" onClick={() => this.onAddcommidity()}>
                  添加商品
                </Button>
              </div>
            </Card>
            <Card bordered={false}>
              <Table
                loading={goodLoading}
                dataSource={goodslist}
                columns={columns}
                onChange={this.onTableChange}
                pagination={paginationProps}
              />
            </Card>
          </React.Fragment>
        ) : null}
        {this.state.AddRecommendedMerchandiseFrame.visible && (
          <CommoditySelection
            // data={this.state.RecommendedMerchandiseInfoFrame.data}
            onAddInfoFrameCloseCallback={this.closeSubFrameRecommende}
            // ReleaseShieldCallback={this.ReleaseShield}
            arear={this.props.data.goods_tag_id}
            onSelectcommCallback={this.SelectcommCallback}
          />
        )}
      </Modal>
    );
    return resultJsx;
  }
}
