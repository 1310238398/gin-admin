import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Col, Form, Input, Modal, Row, TreeSelect } from 'antd';
import { DicSelect } from '@/components/Dictionary';
import * as VideoEquipmentService from '@/services/s_videoEquipment';
const { TextArea } = Input;

@connect(state => ({
  videoEquipment: state.videoEquipment,
}))
@Form.create()
export default class VideoEquipmentGroupEdit extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'videoEquipment/fetchTree',
    });
  }

  onModalOKClick = () => {
    const {
      videoEquipment: { formID },
      onGroupSaved,
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (formID) {
          const {
            videoEquipment: { formData: oldFormData },
          } = this.props;
          const formData = { ...oldFormData, ...values };
          VideoEquipmentService.update(formData).then(() => {
            onGroupSaved(formData);
          });
        } else {
          const formData = {
            name: values.name,
            parent_id: values.parent_id,
            code: values.code,
            memo: values.memo,
          };
          VideoEquipmentService.create(formData).then(() => {
            onGroupSaved();
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
    const {
      videoEquipment: { treeData, formData, formID },
      form: { getFieldDecorator },
      editVisible,
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
        title={formID ? '编辑视频分组' : '新增视频分组'}
        width={600}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false}>
          <Form>
            <Row span={24}>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="分组名">
                  {getFieldDecorator('name', {
                    initialValue: formData.name,
                    rules: [{ required: true, message: '请输入分组名' }],
                  })(<Input placeholder="请输入分组名" />)}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="上级分组">
                  {getFieldDecorator('parent_id', {
                    initialValue: formData.parent_id,
                    rules: [{ required: false, message: '请选择上级分组' }],
                  })(
                    <TreeSelect
                      showSearch
                      treeDefaultExpandedKeys={[treeData.length > 0 && treeData[0].record_id]}
                      treeNodeFilterProp="title"
                      style={{ minWidth: 200 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...colC}>
                <Form.Item {...formItemLayoutjy} label="分组编号">
                  {getFieldDecorator('code', {
                    initialValue: formData.code,
                    rules: [
                      {
                        required: false,
                        message: '请输入分组编号',
                      },
                    ],
                  })(<Input placeholder="请输入分组编号" />)}
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
