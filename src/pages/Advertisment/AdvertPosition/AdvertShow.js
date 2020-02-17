import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, InputNumber, Icon, Button, Input } from 'antd';
import { newUUID } from '@/utils/utils';

@Form.create()
export default class AdvertShows extends React.Component {
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
      <div key={k}>
        <Row gutter={32}>
          <Col {...col}>
            <Form.Item label="广告展示类型" key={k}>
              {getFieldDecorator(`data[${k}].stype`, {
                initialValue: this.getValue(mvalue, k).stype || 1,
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
              })(
                <Select style={{ width: '60%' }}>
                  <Select.Option value={1}>图片</Select.Option>
                  <Select.Option value={2}>图文</Select.Option>
                  <Select.Option value={3}>视频</Select.Option>
                  <Select.Option value={4}>文字</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="宽（单位：px）">
              {getFieldDecorator(`data[${k}].width`, {
                initialValue: this.getValue(mvalue, k).width || 0,
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(
                <InputNumber
                  placeholder="请输入"
                  min={0}
                  max={9999999}
                  step={1}
                  style={{ width: '60%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="高">
              {getFieldDecorator(`data[${k}].height`, {
                initialValue: this.getValue(mvalue, k).height || 0,
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(
                <InputNumber
                  placeholder="请输入"
                  min={0}
                  max={9999999}
                  step={1}
                  style={{ width: '60%' }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32} style={{ borderBottom: '1px solid #ececec' }}>
          <Col {...col}>
            <Form.Item label="格式要求(多个以英文逗号分隔)">
              {getFieldDecorator(`data.[${k}].format_limit`, {
                initialValue: this.getValue(mvalue, k).format_limit || '',
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
              })(<Input placeholder="多个以英文逗号分隔" style={{ width: '60%' }} />)}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="文件大小限制（单位：KB）">
              {getFieldDecorator(`data[${k}].file_size`, {
                initialValue: this.getValue(mvalue, k).file_size || 0,
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(
                <InputNumber
                  placeholder="请输入"
                  min={0}
                  max={9999999}
                  step={1}
                  style={{ width: '60%' }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="字数限制">
              {getFieldDecorator(`data[${k}].word_num`, {
                initialValue: this.getValue(mvalue, k).word_num || 0,
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(
                <InputNumber
                  placeholder="请输入"
                  min={0}
                  max={9999999}
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
      </div>
    ));

    return (
      <Form colon={false}>
        {formItems}
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 新增广告位展示
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
