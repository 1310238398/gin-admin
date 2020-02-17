/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal, InputNumber, Tabs, Radio } from 'antd';
import { connect } from 'dva';
import { DicSelect } from '@/components/Dictionary';
import AdvertBilling from './AdvertBilling';
import AdvertShows from './AdvertShow';

const RadioGroup = Radio.Group;
@Form.create()
@connect(state => ({
  advertPosition: state.advertPosition,
}))
export default class AdvertPositionEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertPosition/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertPosition/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick() {
    const { callback } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = { ...values };
        if (formData.atype === 3) {
          formData.configs = [formData.value];
        } else {
          formData.configs = [];
        }
        this.billing.validateFields((errbill, valuesbill) => {
          if (!errbill) {
            const { keys, data } = valuesbill;
            console.log(keys.map(k => data[k]));
            const billings = keys.map(k => data[k]);
            formData.billings = billings;
          }
        });
        this.shows.validateFields((errshow, valuesshow) => {
          if (!errshow) {
            const { keys, data } = valuesshow;
            console.log(keys.map(k => data[k]));
            const valuesshows = keys.map(k => data[k]);
            formData.shows = valuesshows;
          }
        });
        console.log(formData);
        debugger;
        this.props.dispatch({
          type: 'advertPosition/submit',
          payload: formData,
        });
        callback();
      }
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      advertPosition: { formData, formTitle, formVisible },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const col = {
      sm: 24,
      md: 8,
    };
    const colCjy = {
      sm: 24,
      md: 24,
    };

    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick()}>
        保存
      </Button>,
    ];

    const resultJsx = (
      <Modal
        visible={formVisible}
        title={formTitle}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{
          paddingRight: 30,
          paddingLeft: 30,
          height: 550,
          overflowY: 'scroll',
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <Card title="基本信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="广告位标识码">
                  {getFieldDecorator('code', {
                    initialValue: formData.code || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="200" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="广告位名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
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
                <Form.Item label="广告位类型">
                  {getFieldDecorator('atype', {
                    initialValue: formData.atype || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="mall$#advertisPostion"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col
                {...col}
                style={{
                  display: getFieldValue('atype') === 3 ? 'block' : 'none',
                }}
              >
                <Form.Item label="信息流所属位置(多个以英文逗号分隔)">
                  {getFieldDecorator('value', {
                    initialValue:
                      formData.configs && formData.configs.length > 0
                        ? formData.configs[0].value
                        : '',
                    rules: [
                      {
                        required: getFieldValue('atype') === 3,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="多个以英文逗号分隔" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="最大投放数量">
                  {getFieldDecorator('max_count', {
                    initialValue: formData.max_count || 0,
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      min={0}
                      max={9999999}
                      step={1}
                      defaultValue={0}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="是否允许关闭">
                  {getFieldDecorator('allow_close', {
                    initialValue: formData.allow_close || 1,
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(
                    <RadioGroup>
                      <Radio value={1} defaultChecked={1}>
                        允许
                      </Radio>
                      <Radio value={2}>不允许</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="倒计时长（单位：s）">
                  {getFieldDecorator('countdown', {
                    initialValue: formData.countdown || 0,
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      min={0}
                      max={9999999}
                      step={1}
                      defaultValue={0}
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formData.memo || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input.TextArea placeholder="请输入" autosize={{ minRows: 2, maxRows: 6 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="计费规则" bordered={false}>
          <AdvertBilling
            ref={el => {
              this.billing = el;
            }}
            value={formData.billings}
          />
        </Card>
        <Card title="广告位展示信息" bordered={false}>
          <AdvertShows
            ref={el => {
              this.shows = el;
            }}
            value={formData.shows}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
