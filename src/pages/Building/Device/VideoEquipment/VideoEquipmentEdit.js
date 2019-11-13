import React, { PureComponent } from 'react';
import { Card, Col, Form, Input, Modal, Row, DatePicker, Button, Select } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import moment from 'moment';
import { connect } from 'dva';
import styles from './VideoEquipmentEdit.less';
import * as VideoEquipmentService from '@/services/s_videoEquipment';
import SpecificationTag from '../NumberPlate/SpecificationTag';
import NumberPlateDetail from '../NumberPlate/NumberPlateDetail';
import ShowModal from '../MonitorShow/Modal/index';

const { TextArea } = Input;
const { Option } = Select;

@connect(state => ({
  videoEquipment: state.videoEquipment,
}))
@Form.create()
export default class VideoEquipmentEdit extends PureComponent {
  dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

  componentWillMount() {
    const { selectBuilding } = this.props;
    this.props.dispatch({
      type: 'videoEquipment/seeListInfo',
      payload: {
        record_id: selectBuilding,
      },
    });
  }
  onModalOKClick = () => {
    const {
      selectBuilding,
      onSaved,
      videoEquipment: { formSBID },
      videoEquipment: { positions },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (formSBID) {
          const {
            videoEquipment: { formSBData: oldFormData },
          } = this.props;
          const formSBData = { ...oldFormData, ...values };

          if (formSBData.installation_date) {
            formSBData.installation_date = formSBData.installation_date.format(this.dateFormat);
          }
          if (formSBData.manufacture_date) {
            formSBData.manufacture_date = formSBData.manufacture_date.format(this.dateFormat);
          }
          VideoEquipmentService.updateEq(formSBData).then(() => {
            onSaved(formSBData);
          });
        } else {
          const formSBData = {
            name: values.name,
            device_code: values.device_code,
            device_type: values.device_type,
            device_model: values.device_model,
            norm_value: values.norm_value,
            memo: values.memo,
            positions: values.positions,
            third_id: values.third_id,
            installation_date: values.installation_date
              ? values.installation_date.format(this.dateFormat)
              : null,
            manufacture_date: values.manufacture_date
              ? values.manufacture_date.format(this.dateFormat)
              : null,
          };
          VideoEquipmentService.createEq(formSBData).then(() => {
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

  onAddGroup = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormVisibleStock',
      payload: true,
    });
  };

  handleDataFormCancel = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormVisibleStock',
      payload: false,
    });
  };

  handleDataFormSubmit = addlist => {
    const { form } = this.props;
    let positions = form.getFieldValue('positions');

    let exists = false;
    for (let i = 0; i < positions.length; i += 1) {
      if (positions[i].record_id === addlist.record_id) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      positions = [...positions, addlist];
    }

    form.setFieldsValue({ positions });

    this.handleDataFormCancel();
  };

  onAddSeeLive = () => {
    const {
      videoEquipment: { formSBData },
    } = this.props;
    this.props.dispatch({
      type: 'videoEquipment/loadSeeForm',
      payload: formSBData,
      callback: this.handleCallback.bind(this),
    });
  };

  handleCallback = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormSeeVisible',
      payload: true,
    });
  };

  handleFormCancel = () => {
    this.props.dispatch({
      type: 'videoEquipment/changeFormSeeVisible',
      payload: false,
    });
  };

  renderDataForm() {
    const {
      videoEquipment: { formSeeVisible, formSeeTitle, formSeeData },
    } = this.props;
    return (
      formSeeVisible && (
        <ShowModal
          visible={formSeeVisible}
          title={formSeeTitle}
          formData={formSeeData}
          onCancel={this.handleFormCancel}
        />
      )
    );
  }

  renderGroupForm() {
    const {
      videoEquipment: { formVisibleStock },
    } = this.props;
    return (
      <NumberPlateDetail
        visible={formVisibleStock}
        onCancel={this.handleDataFormCancel}
        onSubmit={this.handleDataFormSubmit}
      />
    );
  }

  render() {
    const {
      videoEquipment: { formSBData, selectList, formSBID, positions },
      form: { getFieldDecorator },
      editVisible,
    } = this.props;
    const manufacture_date =
      formSBData && formSBData.manufacture_date
        ? moment(formSBData.manufacture_date, 'YYYY-MM-DD')
        : null;
    const installation_date =
      formSBData && formSBData.installation_date
        ? moment(formSBData.installation_date, 'YYYY-MM-DD')
        : null;
    const position = formSBData && formSBData.positions ? formSBData.positions : positions;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
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
    const col = {
      sm: 24,
      md: 12,
    };
    const colC = {
      sm: 24,
      md: 24,
    };
    return (
      <Modal
        title={formSBID ? '编辑视频设备' : '新增视频设备'}
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
                <Form.Item {...formItemLayout} label="视频设备编号">
                  {getFieldDecorator('device_code', {
                    initialValue: formSBData.device_code || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入视频设备编号',
                      },
                    ],
                  })(<Input placeholder="请输入视频设备编号" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="视频设备名称">
                  {getFieldDecorator('name', {
                    initialValue: formSBData.name,
                    rules: [{ required: true, message: '请输入视频设备名称' }],
                  })(<Input placeholder="请输入视频设备名称" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="设备类型">
                  {getFieldDecorator('device_type', {
                    initialValue: formSBData.device_type,
                    rules: [{ required: true, message: '请选择设备类型' }],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="OPER$#monitor_category"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="三方系统">
                  {getFieldDecorator('third_id', {
                    initialValue: formSBData.third_id,
                    rules: [{ required: true, message: '请选择三方系统' }],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      {selectList.map(item => (
                        <Select.Option key={item.record_id} value={item.record_id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="设备生产日期">
                  {getFieldDecorator('manufacture_date', {
                    initialValue: manufacture_date,
                    rules: [{ required: false, message: '设备生产日期' }],
                  })(
                    <DatePicker format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="设备安装日期">
                  {getFieldDecorator('installation_date', {
                    initialValue: installation_date,
                    rules: [{ required: false, message: '设备安装日期' }],
                  })(
                    <DatePicker format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item {...formItemLayout} label="所属分组">
                  {getFieldDecorator('norm_value', {
                    rules: [{ required: false, message: '所属分组' }],
                  })(
                    <Button icon="plus" type="primary" onClick={() => this.onAddGroup()}>
                      新增所属分组
                    </Button>
                  )}
                </Form.Item>
              </Col>
              <Col {...col} className={styles.seeBtn}>
                <Form.Item {...formItemLayout}>
                  <Button type="primary" icon="eye" onClick={() => this.onAddSeeLive()}>
                    {' '}
                    查看实况
                  </Button>
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="所属分组列表">
                  {getFieldDecorator('positions', {
                    initialValue: position,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<SpecificationTag />)}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formSBData.memo || '',
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
        {this.renderDataForm()}
        {this.renderGroupForm()}
      </Modal>
    );
  }
}
