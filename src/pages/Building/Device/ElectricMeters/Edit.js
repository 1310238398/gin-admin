import React, { PureComponent } from 'react';
import { Card, Col, Form, Input, Modal, Row, DatePicker, Checkbox, Select} from 'antd';
import moment from 'moment';
import { DicSelect } from '@/components/Dictionary';
import styles from './Edit.less';
import * as electricMetersService from '@/services/electricMeters';

const { TextArea } = Input;
const { Option } = Select;

@Form.create()
export default class GateEdit extends PureComponent {
  dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

  constructor(props) {
    super(props);
    const { editDevice } = props;
    this.state = {
      sham:{},
      formData: editDevice || {},
    };
  }

  componentWillMount() {
    this.analysis();
  }

  onModalOKClick = () => {
    const { selectBuilding, editDevice, onSaved } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (editDevice) {
          const formData = {
            ...editDevice,
            type_id: 3,
            // building_id: selectBuilding.key,
            name: values.name,
            device_model: values.device_model,
            room_name: values.room_name,
            meter_addr: values.meter_addr,
            etype: values.etype,
            vendor_id: values.vendor_id,
            memo: values.memo,
            installation_date: values.installation_date ? values.installation_date.format(this.dateFormat) : '',
            manufacture_date: values.manufacture_date ? values.manufacture_date.format(this.dateFormat) : '',
          };
          electricMetersService.update(formData).then(res => {
            if(res && !res.error){
              onSaved(formData);
            }
          });
        } else {
          const formData = {
            type_id: 3,
            building_id: selectBuilding.key,
            name: values.name,
            device_model: values.device_model,
            room_name: values.room_name,
            meter_addr: values.meter_addr,
            etype: values.etype,
            vendor_id: values.vendor_id,
            memo: values.memo,
            installation_date: values.installation_date ? values.installation_date.format(this.dateFormat) : '',
            manufacture_date: values.manufacture_date ? values.manufacture_date.format(this.dateFormat) : '',
          };
          electricMetersService.create(formData).then(res => {
            if(res && !res.error){
              onSaved();
            }
          });
        }
      }
    });
  };

  analysis = () => {
    const { editDevice, selectBuildingPath } = this.props;
    let buildings; let level;
    if(editDevice) {
      buildings = editDevice.building_name.split('-');
      level = editDevice.building_id === '' ? 0 : buildings.length;
      if(level === 3 && editDevice.building_name.indexOf('F') === -1) {
        level = 4;
      }
    } else {
      buildings = selectBuildingPath.map(item => item.title);
      level = buildings.length;
    }
    // sham
    const sham = {
      mount: level === 0 ? '' : (level === 1 ? `${buildings[0]} 配电室`: `${buildings[0]} - ${buildings[1]} 分配电室`),
      level,
      charge:level >= 3,
      gather:level > 0,
      payment:1,
      url:'',
    };
    this.setState({sham});
  };

  shamCheckboxHandle = (event,name) => {
    const {target:{checked}} = event;
    const {sham} = this.state;
    sham[name] = checked;
    this.setState({sham:{...sham}});
  };

  shamSelectChangeHandle  = (event,name) => {
    const {target:{checked}} = event;
    const {sham} = this.state;
    sham[name] = checked;
    this.setState({sham:{...sham}});
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { formData, sham } = this.state;
    const {
      form: { getFieldDecorator },
      editVisible,
      editDevice,
      selectBuildingPath,
    } = this.props;

    const disabledDate = (current) => {
      return current && current > moment().startOf('day');
    };
    const manufacture_date =
      formData && formData.manufacture_date
        ? moment(formData.manufacture_date, 'YYYY-MM-DD')
        : null;
    const installation_date =
      formData && formData.installation_date
        ? moment(formData.installation_date, 'YYYY-MM-DD')
        : null;
    const formItemLayout = {
      labelAlign: 'left',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    const col = {
      sm: 23,
      md: 11,
      offset: 1,
    };
    return (
      <Modal
        title={editDevice ? '编辑电表设备' : '新增电表设备'}
        width={800}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.gate}>
          <Form {...formItemLayout}>
            <Row>
              <Col {...col}>
                <Form.Item label="电表管控区域">
                  {getFieldDecorator('building_name', {
                    initialValue:
                      formData.building_name || (selectBuildingPath && selectBuildingPath[selectBuildingPath.length - 1].title) || '未绑定',
                    rules: [
                      {
                        message: '请输入电表位置',
                      },
                    ],
                  })(<Input placeholder="电表位置" readOnly />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="电表安装位置">
                  {getFieldDecorator('building_mount', {
                    initialValue: sham.mount,
                    rules: [
                      {
                        message: '请输入电表安装位置',
                      },
                    ],
                  })(<Input placeholder="电表安装位置" readOnly />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="电表名称">
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
                <Form.Item label="电表管控等级">
                  <Select defaultValue={sham.level} style={{ width: '100%' }}>
                    <Option value={0}>未绑定</Option>
                    <Option value={1}>区域表</Option>
                    <Option value={2}>楼栋表</Option>
                    <Option value={3}>楼层表</Option>
                    <Option value={4}>户表</Option>
                    <Option value={5}>户表分表</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="电表地址（表号）">
                  {getFieldDecorator('meter_addr', {
                    initialValue: formData.meter_addr || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入电表地址（表号）',
                      },
                    ],
                  })(<Input placeholder="请输入电表地址（表号）" />)}
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
                <Form.Item label="电表类型">
                  {getFieldDecorator('etype', {
                    initialValue: formData.etype || 1,
                    rules: [{ required: true, message: '请选择电表类型' }],
                  })(
                    <DicSelect
                      vmode="int"
                      pcode="OPER$#electric_meters_type"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="厂商名称">
                  {getFieldDecorator('vendor', {
                    initialValue: formData.vendor,
                    rules: [{ required: false, message: '请输入厂商名称' }],
                  })(<Input placeholder="请输入厂商名称" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备生产日期">
                  {getFieldDecorator('manufacture_date', {
                    initialValue: manufacture_date,
                    rules: [{ required: false, message: '设备生产日期' }],
                  })(
                    <DatePicker disabledDate={disabledDate} format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="设备安装日期">
                  {getFieldDecorator('installation_date', {
                    initialValue: installation_date,
                    rules: [{ required: false, message: '设备安装日期' }],
                  })(
                    <DatePicker disabledDate={disabledDate} format="YYYY-MM-DD" showToday={false} style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="计费表计">
                  <Checkbox checked={sham.charge} onChange={event => this.shamCheckboxHandle(event,'charge')}>计费表计</Checkbox>
                </Form.Item>
                {sham.charge && (
                <Form.Item label="付费方式">
                  <Select defaultValue={sham.payment} style={{ width: '100%' }}>
                    <Option value={1}>预付费</Option>
                    <Option value={2}>后付费</Option>
                  </Select>
                </Form.Item>
)}
              </Col>
              <Col {...col}>
                <Form.Item label="远传">
                  <Checkbox checked={sham.gather} onChange={event => this.shamCheckboxHandle(event,'gather')}>远传表计</Checkbox>
                </Form.Item>
                {sham.gather && (
                <Form.Item label="远传地址">
                  <Input placeholder="请输入远传地址" />
                </Form.Item>
)}
              </Col>
              <Col sm={23} md={23} offset={1}>
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
