import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';

import StockTable from './StockTable';
import styles from './CommodityManagement.less';

@Form.create({
  mapPropsToFields: props => {
    const data = props.data ? props.data : {};
    return {
      norm_list: Form.createFormField({
        value: data.norm_list ? data.norm_list : [],
      }),
    };
  },
  onFieldsChange: (props, changedFields) => {
    props.onChange(changedFields);
  },
})
class StockForm extends PureComponent {
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

    return (
      <Form>
        <Form.Item>
          <Row>
            <Col span={12} className={styles.formTitle}>
              库存信息
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...formItemLayout}>
          <div>
            {getFieldDecorator('norm_list', {
              rules: [
                {
                  required: false,
                  message: '',
                },
              ],
            })(<StockTable />)}
          </div>
        </Form.Item>
      </Form>
    );
  }
}

export default StockForm;
