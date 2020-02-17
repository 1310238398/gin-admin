import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, DatePicker, Input, Icon, Button } from 'antd';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import { newUUID } from '@/utils/utils';
import moment from 'moment';

@Form.create()
export default class Qualifaication extends React.Component {
  static defaultProps = {
    value: [],
    onChange: () => {},
  };

  static propTypes = {
    // 样式对象
    value: PropTypes.array,
    // 事件
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || [],
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.value !== preState.value) {
      return { ...preState, value: nextProps.value };
    }
    return preState;
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = [...keys, newUUID()];
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  getMap = data => {
    const obj = {};
    for (let i = 0; i < data.length; i += 1) {
      obj[data[i].record_id] = data[i];
    }
    return obj;
  };

  getValue = (m, k) => {
    if (m[k]) {
      return m[k];
    }
    return {};
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const { value } = this.state;
    const mvalue = this.getMap(value);

    const col = {
      sm: 24,
      md: 8,
    };

    getFieldDecorator('keys', { initialValue: value.map(item => item.record_id) });
    const keys = getFieldValue('keys');
    const formItems = keys.map(k => (
      <Row gutter={32} key={k}>
        <Col {...col}>
          <Form.Item label="资质名称">
            {getFieldDecorator(`data[${k}].name`, {
              initialValue: this.getValue(mvalue, k).name || '',
              rules: [
                {
                  required: true,
                  message: '请选择',
                },
              ],
            })(<Input placeholder="请输入" maxLength="100" />)}
          </Form.Item>
        </Col>
        <Col {...col}>
          <Form.Item label="资质文件路径">
            {getFieldDecorator(`data[${k}].file_url`, {
              initialValue: this.getValue(mvalue, k).file_url
                ? [this.getValue(mvalue, k).file_url]
                : '',
              rules: [
                {
                  required: true,
                  message: '请上传',
                },
              ],
            })(<PicturesWall num={1} bucket="mall" listType="text" />)}
          </Form.Item>
        </Col>
        <Col {...col}>
          <Form.Item label="资质过期时间">
            {getFieldDecorator(`data[${k}].expiration`, {
              initialValue: this.getValue(mvalue, k).expiration?moment(this.getValue(mvalue, k).expiration) : '',
              rules: [
                {
                  required: true,
                  message: '请填写',
                },
              ],
            })(<DatePicker style={{ marginRight: 10 }} />)}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Form.Item>
        </Col>
      </Row>
    ));

    return (
      <Form colon={false}>
        {formItems}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 增加资质
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
