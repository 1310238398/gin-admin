import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Form, Row, Col, Button, Input, InputNumber } from 'antd';
import styles from './FloorContenWindow.less';

@connect(state => ({
  building: state.building,
}))
@Form.create()
class FloorContentInfoEdit extends PureComponent {
  state = {};

  componentDidMount() {
    const { infoId } = this.props;
    this.props.dispatch({
      type: 'building/queryTypeDetail',
      payload: infoId,
      buildingType: 'plateNum',
    });
  }

  onCloseWin = () => {
    const { callback } = this.props;
    callback();
  };

  onInfoSaveCallback = () => {
    const { form, onSubmit } = this.props;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      values.record_id = this.props.infoId;
      values.code = this.props.building.plateNumDetail.code;
      const formData = { ...values };
      onSubmit(formData);
    });
  };

  testField = value => {
    switch (value) {
      case 1:
        return 'block';
      case 2:
        return 'block';
      case 3:
        return 'block';
      default:
        return 'none';
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      infoType,
      building: { plateNumDetail },
    } = this.props;
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
    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button key="unauth" onClick={this.onInfoSaveCallback}>
        保存
      </Button>,
    ];
    return (
      <Modal
        visible
        footer={footerJsx}
        title={null}
        onCancel={this.onCloseWin}
        width={873}
        className="lightModal"
      >
        <div className={styles.FloorContentWin}>
          <div
            className={styles.Floorwin}
            style={{
              borderBottom: '1px solid #EAEFFF',
              marginBottom: '20px',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            {plateNumDetail.name}
          </div>
          <Form>
            {infoType === 'floor' ? (
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="建筑标号">
                    {getFieldDecorator('code', {
                      initialValue: plateNumDetail.code,
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="建筑名称">
                    {getFieldDecorator('name', {
                      initialValue: plateNumDetail.name ? plateNumDetail.name : plateNumDetail.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
            {infoType === 'layer' ? (
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="楼层名称">
                    {getFieldDecorator('name', {
                      initialValue: plateNumDetail.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
            {infoType === 'plate' ? (
              <Row>
                <Col span={8}>
                  <Form.Item {...formItemLayout} label="门牌名称">
                    {getFieldDecorator('name', {
                      initialValue: plateNumDetail.name,
                      rules: [
                        {
                          required: true,
                          message: '请输入',
                        },
                      ],
                    })(<Input placeholder="请输入" style={{ width: '80%' }} />)}
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="建筑面积">
                  {getFieldDecorator('floor_area', {
                    initialValue: plateNumDetail.floor_area,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={0.01}
                      rows={4}
                      style={{ width: '80%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="使用面积">
                  {getFieldDecorator('usage_area', {
                    initialValue: plateNumDetail.usage_area,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={0.01}
                      rows={4}
                      style={{ width: '80%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="计费面积">
                  {getFieldDecorator('billing_area', {
                    initialValue: plateNumDetail.billing_area,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <InputNumber
                      placeholder="请输入"
                      step={0.01}
                      rows={4}
                      style={{ width: '80%' }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <Form.Item {...formItemLayoutmome} label="规划用途">
                  {getFieldDecorator('planned_use', {
                    initialValue: plateNumDetail.planned_use ? plateNumDetail.planned_use : 1,
                    rules: [{ required: true, message: '请输入规划用途' }],
                  })(
                    <RadioGroup>
                      <Radio value={1}>出售</Radio>
                      <Radio value={2}>自持</Radio>
                      <Radio value={3}>租售</Radio>
                    </RadioGroup>
                  )}
                </Form.Item>
              </Col>
            </Row> */}
            {/* <Row> */}
            {/* <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="销售状态"
                  style={{
                    display: this.testField(getFieldValue('planned_use')),
                  }}
                >
                  {getFieldDecorator('sales_status', {
                    initialValue: plateNumDetail && plateNumDetail.sales_status,
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <RadioGroup
                      options={optionsell}
                      onChange={this.onChangeSell}
                      // value={this.state.sellState}
                    />
                  )}
                </Form.Item>
              </Col> */}
            {/* <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="出租状态"
                  style={{
                    display: this.testField(getFieldValue('planned_use')),
                  }}
                >
                  {getFieldDecorator('rental_status', {
                    initialValue: plateNumDetail && plateNumDetail.rental_status,
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <RadioGroup
                      options={optionrease}
                      onChange={this.onChangeRease}
                      //   value={this.state.leaseState}
                    />,
                    <RadioGroup
                      options={optionUse}
                      onChange={this.onChangeUse}
                      //   value={this.state.useState}
                    />
                  )}
                </Form.Item>
              </Col> */}
            {/* <Col span={12}>
                <Form.Item
                  {...formItemLayout}
                  label="出租状态"
                  style={{
                    display: this.testField(getFieldValue('planned_use')),
                  }}
                >
                  {getFieldDecorator('lease_status', {
                    initialValue: plateNumDetail && plateNumDetail.lease_status,
                    rules: [{ required: true, message: '请选择' }],
                  })(
                    <RadioGroup
                      options={optionrease}
                      onChange={this.onChangeRease}
                      //   value={this.state.leaseState}
                    />,
                    <RadioGroup
                      options={optionUse}
                      onChange={this.onChangeUse}
                      //   value={this.state.useState}
                    />
                  )}
                </Form.Item>
              </Col> */}

            {/* </Row> */}
            {/* <Row className={styles.Rowq}>
              <Col span={24}>*楼栋状态更改后，对应的门牌状态也会同步更改</Col>
            </Row> */}
          </Form>
        </div>
      </Modal>
    );
  }
}
export default FloorContentInfoEdit;
