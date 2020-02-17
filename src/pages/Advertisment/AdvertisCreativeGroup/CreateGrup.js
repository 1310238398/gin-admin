import React from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Select, Input, Icon, Button, InputNumber } from 'antd';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import { VideoInput } from '@/components/Info';
import { newUUID } from '@/utils/utils';

@Form.create()
export default class CreateGrup extends React.Component {
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

    let { value } = this.state;
    value = value.map(item => {
      const v = { ...item };
      switch (item.file_type) {
        case 1:
          v.img_file_url = item.file_url !== '' ? [item.file_url] : [];
          break;
        case 2:
          v.video_file_url = item.file_url;
          break;
        default:
          break;
      }
      return v;
    });

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
            <Form.Item label="创意名称">
              {getFieldDecorator(`data[${k}].name`, {
                initialValue: this.getValue(mvalue, k).name || '',
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<Input placeholder="请输入" maxLength="100" />)}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="素材类型">
              {getFieldDecorator(`data[${k}].file_type`, {
                initialValue: this.getValue(mvalue, k).file_type || 1,
                rules: [
                  {
                    required: true,
                    message: '请选择',
                  },
                ],
              })(
                <Select style={{ width: '60%' }}>
                  <Select.Option value={1}>图片</Select.Option>
                  <Select.Option value={2}>视频</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item
              label="素材上传"
              style={{
                display: getFieldValue(`data[${k}].file_type`) === 1 ? 'block' : 'none',
              }}
            >
              {getFieldDecorator(`data[${k}].img_file_url`, {
                initialValue: this.getValue(mvalue, k).img_file_url,
                rules: [
                  {
                    required: getFieldValue(`data[${k}].file_type`) === 1,
                    message: '请上传',
                  },
                ],
              })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item
              label="文件上传"
              style={{
                display: getFieldValue(`data[${k}].file_type`) === 2 ? 'block' : 'none',
              }}
            >
              {getFieldDecorator(`data[${k}].video_file_url`, {
                initialValue: this.getValue(mvalue, k).video_file_url,
                rules: [
                  {
                    required: getFieldValue(`data[${k}].file_type`) === 2,
                    message: '请上传',
                  },
                ],
              })(<VideoInput />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32} style={{borderBottom:'1px soild #ececec'}}>
          <Col {...col}>
            <Form.Item label="创意标题">
              {getFieldDecorator(`data[${k}].title`, {
                initialValue: this.getValue(mvalue, k).title || '',
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<Input placeholder="请输入" style={{ width: '80%' }} />)}
            </Form.Item>
          </Col>
          <Col {...col}>
            <Form.Item label="链接地址">
              {getFieldDecorator(`data[${k}].link_addr`, {
                initialValue: this.getValue(mvalue, k).link_addr || '',
                rules: [
                  {
                    required: true,
                    message: '请填写',
                  },
                ],
              })(<Input placeholder="请输入" style={{ width: '80%', marginRight: 10 }} />)}
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
            <Icon type="plus" /> 新增创意
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
