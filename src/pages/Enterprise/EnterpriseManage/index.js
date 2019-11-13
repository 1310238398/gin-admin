import React, { PureComponent } from 'react';
import { Input, Form, Radio, Row, Col, Divider, Icon } from 'antd';

import PicturesWall from '@/components/PicturesWall/PicturesWall';
import CategorySelect from './CategorySelect';
import SpecificationTag from './SpecificationTag';
import SpecificationTable from './SpecificationTable';
import StandardModal from './StandardModal';
import styles from './index.less';

@Form.create({
  mapPropsToFields: props => {
    const data = props.data ? props.data : {};
    return {
      name: Form.createFormField({
        value: data.name,
      }),
      goods_category_id: Form.createFormField({
        value: data.goods_category_id,
      }),
      des: Form.createFormField({
        value: data.des,
      }),
      delivery: Form.createFormField({
        value: data.delivery ? data.delivery : '1',
      }),
      images: Form.createFormField({
        value: data.images,
      }),
      norm_name: Form.createFormField({
        value: data.norm_name,
      }),
      norm_value: Form.createFormField({
        value: data.norm_value ? data.norm_value : [],
      }),
      norm_list: Form.createFormField({
        value: data.norm_list ? data.norm_list : [],
      }),
    };
  },
  onFieldsChange: (props, changedFields) => {
    props.onChange(changedFields);
  },
})
class CommodityForm extends PureComponent {
  state = {
    visibleStand: false,
  };

  onClick = () => {
    this.setState({
      visibleStand: true,
    });
  };

  handleDataFormCancel = () => {
    this.setState({
      visibleStand: false,
    });
  };

  renderStandModal = () => {
    if (this.state.visibleStand) {
      return <StandardModal visible onCancel={this.handleDataFormCancel} />;
    }
  };

  render() {
    let { data } = this.props;
    if (!data) {
      data = {};
    }

    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const formItem2Layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    return (
      <Form>
        <Form.Item>
          <Row>
            <Col span={4} className={styles.formTitle}>
              <span>*</span>
              商品信息
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入商品名称',
              },
            ],
          })(<Input placeholder="请输入商品名称" maxLength={50} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品分类">
          {getFieldDecorator('goods_category_id', {
            rules: [
              {
                required: true,
                message: '请输入商品分类',
              },
            ],
          })(<CategorySelect />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="商品描述">
          {getFieldDecorator('des', {})(
            <Input.TextArea
              autosize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入商品描述"
              maxLength={200}
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="配送">
          {getFieldDecorator('delivery', {})(
            <Radio.Group>
              <Radio value="1">支持</Radio>
              <Radio value="2">不支持</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              <span style={{ color: '#f5222d', fontSize: 14, marginRight: 4 }}>*</span>
              商品规格
            </span>
          }
        >
          <span style={{ color: 'red' }}>最多上传5张图片</span>
          {getFieldDecorator('images', {})(
            <PicturesWall
              bucket="mall"
              name="data"
              num={5}
              listType="picture-card"
              accept="image/*"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Divider />
          <Row>
            <Col span={4} className={styles.formTitle}>
              价格库存
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label={
            <span>
              <Icon type="question-circle" onClick={() => this.onClick()} />
              &nbsp; 商品规格
            </span>
          }
        >
          <div className={styles.formBorder}>
            <Form.Item {...formItem2Layout} label="规格名">
              {getFieldDecorator('norm_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入规格名',
                  },
                ],
              })(<Input placeholder="请输入规格名" style={{ width: 580 }} maxLength={50} />)}
            </Form.Item>
            <Form.Item {...formItem2Layout} label="规格值">
              {getFieldDecorator('norm_value', {
                rules: [
                  {
                    required: false,
                    message: '请输入规格值',
                  },
                ],
              })(<SpecificationTag />)}
            </Form.Item>
          </div>
        </Form.Item>
        {data.norm_name ? (
          <Form.Item {...formItemLayout} label="规格明细">
            <div className={styles.formBorder}>
              {getFieldDecorator('norm_list', {
                rules: [
                  {
                    required: false,
                    message: '请输入规格明细',
                  },
                ],
              })(<SpecificationTable sname={data.norm_name} />)}
            </div>
          </Form.Item>
        ) : null}
        {this.renderStandModal()}
      </Form>
    );
  }
}

export default CommodityForm;
