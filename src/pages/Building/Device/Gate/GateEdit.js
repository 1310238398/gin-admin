import React, { PureComponent } from 'react';
import { Card, Col, Form, Input, Modal, Row, DatePicker } from 'antd';
import moment from 'moment';
import { DicSelect } from '@/components/Dictionary';
import styles from './GateEdit.less';
import * as entryGatesService from '@/services/entrygates';

const { TextArea } = Input;

@Form.create()
export default class GateEdit extends PureComponent {
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
            type_id: 1,
            // building_id: selectBuilding.key,
            // building_type: selectBuilding.type,
            name: values.name,
            serial: values.serial,
            vendor_id: values.vendor_id,
            device_type: values.device_type,
            device_model: values.device_model,
            memo: values.memo,
            installation_date: values.installation_date
              ? values.installation_date.format(this.dateFormat)
              : null,
            manufacture_date: values.manufacture_date
              ? values.manufacture_date.format(this.dateFormat)
              : null,
            vendor: values.vendor,
          };
          entryGatesService.update(formData).then(res => {
            if(res && !res.error){
              onSaved(formData);
            }
          });
        } else {
          const formData = {
            type_id: 1,
            building_id: selectBuilding.key,
            building_type: selectBuilding.type,
            name: values.name,
            serial: values.serial,
            vendor_id: values.vendor_id,
            device_type: values.device_type,
            device_model: values.device_model,
            memo: values.memo,
            installation_date: values.installation_date
              ? values.installation_date.format(this.dateFormat)
              : null,
            manufacture_date: values.manufacture_date
              ? values.manufacture_date.format(this.dateFormat)
              : null,
            vendor: values.vendor,
          };
          entryGatesService.create(formData).then(res => {
            if(res && !res.error){
              onSaved();
            }
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
      selectBuildingPath,
    } = this.props;
    const manufacture_date =
      formData && formData.manufacture_date
        ? moment(formData.manufacture_date, 'YYYY-MM-DD')
        : null;
    const installation_date =
      formData && formData.installation_date
        ? moment(formData.installation_date, 'YYYY-MM-DD')
        : null;
    const col = {
      sm: 23,
      md: 11,
      offset: 1,
    };

    const colPo = {
      sm: 23,
      md: 23,
      offset: 1,
    };

    return (
      <Modal
        title={editDevice ? '编辑门禁设备' : '新增门禁设备'}
        width={800}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.gate}>
          <Form>
            <Row span={24}>
              <Col {...col}>
                <Form.Item label="门禁所属位置">
                  {getFieldDecorator('building_name', {
                    initialValue:
                      formData.building_name ||
                      selectBuildingPath[selectBuildingPath.length - 1].title,
                    rules: [{ required: true, message: '请选择门禁类型' }],
                  })(<Input readOnly />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="门禁类型">
                  {getFieldDecorator('device_type', {
                    initialValue: formData.device_type,
                    rules: [{ required: true, message: '请选择门禁类型' }],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="OPER$#entrance_category"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="厂商标识">
                  {getFieldDecorator('vendor_id', {
                    initialValue: formData.vendor_id,
                    rules: [{ required: true, message: '请选择厂商标识' }],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="OPER$#device_vendor"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="门禁唯一序列号">
                  {getFieldDecorator('serial', {
                    initialValue: formData.serial || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入门禁列号',
                      },
                    ],
                  })(<Input placeholder="请输入门禁列号" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入设备名称',
                      },
                    ],
                  })(<Input placeholder="请输入设备名称" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备型号">
                  {getFieldDecorator('device_model', {
                    initialValue: formData.device_model || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入设备型号',
                      },
                    ],
                  })(<Input placeholder="请输入设备型号" />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="厂家名称">
                  {getFieldDecorator('vendor', {
                    initialValue: formData.vendor,
                    rules: [{ required: false, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备生产日期">
                  {getFieldDecorator('manufacture_date', {
                    initialValue: manufacture_date,
                    rules: [{ required: false, message: '设备生产日期' }],
                  })(
                    <DatePicker format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备安装日期">
                  {getFieldDecorator('installation_date', {
                    initialValue: installation_date,
                    rules: [{ required: false, message: '设备安装日期' }],
                  })(
                    <DatePicker format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...colPo}>
                <Form.Item label="备注">
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
