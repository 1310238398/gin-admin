import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, InputNumber, Icon, Button } from 'antd';
import { newUUID } from '@/utils/utils';

@Form.create()
export default class AdvertBilling extends React.Component {
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
          <Form.Item label="计费类型">
            {getFieldDecorator(`data[${k}].btype`, {
              initialValue: this.getValue(mvalue, k).btype || 'cpm',
              rules: [
                {
                  required: true,
                  message: '请选择计费类型',
                },
              ],
            })(
              <Select style={{ width: '100%' }}>
                <Select.Option value="cpm">曝光（cpm）</Select.Option>
                <Select.Option value="cpc">点击（cpc）</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col {...col}>
          <Form.Item label="计数">
            {getFieldDecorator(`data[${k}].count`, {
              initialValue: this.getValue(mvalue, k).count || 0,
              rules: [
                {
                  required: true,
                  message: '请填写',
                },
              ],
            })(<InputNumber placeholder="请输入" min={0} step={1} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col {...col}>
          <Form.Item label="金额（单位：分）">
            {getFieldDecorator(`data[${k}].amount`, {
              initialValue: this.getValue(mvalue, k).amount || 0,
              rules: [
                {
                  required: true,
                  message: '请填写金额',
                },
              ],
            })(
              <InputNumber
                placeholder="请输入金额"
                min={0}
                step={1}
                style={{ width: '80%', marginRight: 10 }}
              />
            )}
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
            <Icon type="plus" /> 增加计费规则
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
