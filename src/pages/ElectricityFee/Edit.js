import React, { PureComponent } from 'react';
import { Card, Col, Form, Input, Modal, Row, DatePicker, Table, Select } from 'antd';
import moment from 'moment';
import { DicSelect,DicSelectTwo } from '@/components/Dictionary';

import styles from './Edit.less';
import * as electricChargesService from '@/services/electricChanges';

const { TextArea } = Input;

@Form.create()
export default class GateEdit extends PureComponent {
  dateFormat = 'YYYY-MM-DDTHH:mm:ssZ';

  constructor(props) {
    super(props);
    const { editDevice } = props;
    this.state = {
      sham: {},
      formData: editDevice || {},
      list: [],
      loading: false,
      showReason: false,
      onReason:'',
    };
  }

  componentWillMount() {
    this.analysis();
  }

  onModalOKClick = () => {
    const { selectBuilding, editDevice, onSaved,yunxuVisible } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (editDevice) {
          const formData = {
            record_id:editDevice.record_id,
            status:yunxuVisible?1:2,
            reason:values.reason==='99'?values.reasonu:values.reason,
           };
          electricChargesService.update(formData).then(res => {
            if (res && !res.error) {
              onSaved(formData);
            }
          });
        }
      }
    });
  };

  analysis = () => {
    const { editDevice, selectBuildingPath } = this.props;
    let buildings;
    let level;
    if (editDevice) {
      buildings = editDevice.building_name.split('-');
      level = editDevice.building_id === '' ? 0 : buildings.length;
      if (level === 3 && editDevice.building_name.indexOf('F') === -1) {
        level = 4;
      }
    } else {
      buildings = selectBuildingPath.map(item => item.title);
      level = buildings.length;
    }
    // sham
    const sham = {
      mount:
        level === 0
          ? ''
          : level === 1
          ? `${buildings[0]} 配电室`
          : `${buildings[0]} - ${buildings[1]} 分配电室`,
      level,
      charge: level >= 3,
      gather: level > 0,
      payment: 1,
      url: '',
    };
    this.setState({ sham });
  };

  shamCheckboxHandle = (event, name) => {
    const {
      target: { checked },
    } = event;
    const { sham } = this.state;
    sham[name] = checked;
    this.setState({ sham: { ...sham } });
  };

  shamSelectChangeHandle = (event, name) => {
    const {
      target: { checked },
    } = event;
    const { sham } = this.state;
    sham[name] = checked;
    this.setState({ sham: { ...sham } });
  };

  onModalCancelClick = () => {
    const { onClose } = this.props;
    onClose();
  };

  showReason = e => {
    if (e === '其他原因') {
      this.setState({ showReason: true });
    }
    if (e !== '其他原因') {
      this.setState({ showReason: false });
    }
  };

  render() {
    const { formData, sham, showReason } = this.state;
    const columns = [
      {
        title: '门牌号',
        dataIndex: 'logo',
        key: 'logo',
        width: 150,
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        width: 250,
      },
    ];

    const {
      form: { getFieldDecorator },
      editVisible,
      editDevice,
      yunxuVisible,
      selectBuildingPath,
    } = this.props;

    const { list, loading } = this.state;
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
        title={yunxuVisible ? '确定允许以下电表进行缴费' : '确定禁止以下电表进行缴费'}
        width={800}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <p style={{margin:10}}>
          {yunxuVisible
            ? '确定后，此电表对应的用户可以完成线上缴费'
            : '确定后，此电表对应的用户将无法完成线上缴费'}
        </p>

        <div>
          {/* <Table
            loading={loading}
            rowKey={record => record.record_id}
            dataSource={list}
            columns={columns}
            pagination={false}
            scroll={{ x: 450 }}
          /> */}
          <table width="100%" style={{margin:10}}>
            <tbody>
              <tr>
                <td>
                  房间号
                </td>
                <td>
                  电表设备名称
                </td>
              </tr>
              <tr>
                <td>
                  {editDevice.building_name}
                </td>
                <td>
                  {editDevice.name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {yunxuVisible === false ? (
          <Card bordered={false} className={styles.gate}>
            <Form {...formItemLayout}>
              <Row>
                <Col {...col}>
                  <Form.Item label="禁止原因">
                    {getFieldDecorator('reason', {
                      initialValue: formData.reason || '',
                      rules: [
                        {
                          required: true,
                          message: '请选择',
                        },
                      ],
                    })(
                      <DicSelectTwo
                        pcode="OPER$#forbid-ele"
                        selectProps={{ placeholder: '请选择' }}
                        onChange={this.showReason}
                      />
                    )}
                  </Form.Item>
                </Col>
                {showReason ? (
                  <Col {...col}>
                    <Form.Item label="原因">
                      {getFieldDecorator('reasonu', {
                        initialValue: formData.reasonu || '',
                        rules: [
                          {
                            required: true,
                            message: '',
                          },
                        ],
                      })(<Input.TextArea></Input.TextArea>)}
                    </Form.Item>
                  </Col>
                ) : null}
              </Row>
            </Form>
          </Card>
        ) : null}
      </Modal>
    );
  }
}
