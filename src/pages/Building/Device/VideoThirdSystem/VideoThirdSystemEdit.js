import React, { PureComponent } from 'react';
import { Card, Col, Form, Input, Modal, Row } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import styles from './VideoThirdSystemEdit.less';
import VideoEquipmentThirdService from '@/services/s_videoEquipmentThird';

const { TextArea } = Input;

@Form.create()
export default class VideoThirdSystemEdit extends PureComponent {
  dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

  constructor(props) {
    super(props);
    const { editDevice } = props;
    this.state = {
      formData: editDevice || {},
    };
  }

  onModalOKClick = () => {
    const { selectBuilding, editDevice, onSaved } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (editDevice) {
          const formData = {
            ...editDevice,
            name: values.name,
            vendor: values.vendor,
            memo: values.memo,
            extra: values.extra,
          };
          VideoEquipmentThirdService.update(formData).then(() => {
            onSaved(formData);
          });
        } else {
          const formData = {
            name: values.name,
            vendor: values.vendor,
            memo: values.memo,
            extra: values.extra,
          };
          VideoEquipmentThirdService.create(formData).then(() => {
            onSaved();
          });
        }
      }
    });
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { formData } = this.state;
    const {
      form: { getFieldDecorator },
      editVisible,
      editDevice,
    } = this.props;

    const formItemLayoutjy = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    const colC = {
      sm: 24,
      md: 24,
    };
    return (
      <Modal
        title={editDevice ? '编辑视频厂商' : '新增视频厂商'}
        width={600}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.gate}>
          <Form>
            <Row span={24}>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="系统名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="厂商">
                  {getFieldDecorator('vendor', {
                    initialValue: formData.vendor,
                    rules: [{ required: true, message: '请选择厂商标识' }],
                  })(
                    <DicSelect
                      vmode="string"
                      pcode="OPER$#device_monitor_vendor"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="连接参数">
                  {getFieldDecorator('extra', {
                    initialValue: formData.extra,
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formData.memo || '',
                    rules: [
                      {
                        required: false,
                        message: '备注',
                      },
                    ],
                  })(<TextArea rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    );
  }
}
