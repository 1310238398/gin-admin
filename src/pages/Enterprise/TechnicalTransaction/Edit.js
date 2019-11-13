import React, { PureComponent } from 'react';
import { Card, Form, Input, Modal, Select, DatePicker } from 'antd';
import moment from 'moment';
import { DicSelect } from '@/components/Dictionary';
import styles from './Edit.less';
import * as Service from '@/services/technicalTransaction';

const { RangePicker } = DatePicker;

const { TextArea } = Input;

@Form.create()
export default class extends PureComponent {
  constructor(props) {
    super(props);
    const { editDevice } = props;
    this.state = {
      formData: editDevice || {},
    };
  }

  onModalOKClick = () => {
    const { editDevice, onSaved } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const the_term_start = moment(values.the_term[0]).format( 'YYYY-MM-DD');
        const the_term_end = moment(values.the_term[1]).format( 'YYYY-MM-DD');
        if (Object.keys(editDevice).length > 0) {
          const formData = {
            ...editDevice,
            code: values.code,
            name: values.name,
            the_term: values.the_term,
            industry: values.industry,
            listing_price: values.listing_price,
            current_latest_price: values.current_latest_price,
            quotation_number: values.quotation_number,
            project_details: values.project_details,
            memo: values.memo,
            the_term_start,
            the_term_end,
            category: values.category,
            publish_status: values.publish_status,
            status: values.status,
          };
          Service.update(formData).then((data) => {
            if(!data.error){
              onSaved(formData);
            }
          });
        } else {
          const formData = {
            code: values.code,
            name: values.name,
            the_term: values.the_term,
            industry: values.industry,
            listing_price: values.listing_price,
            current_latest_price: values.current_latest_price,
            quotation_number: values.quotation_number,
            project_details: values.project_details,
            memo: values.memo,
            category: values.category,
            the_term_start,
            the_term_end,
            publish_status: values.publish_status,
            status: values.status,
          };
          Service.create(formData).then((data) => {
            if(!data.error){
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
    } = this.props;
    let the_term = null;
    if(this.state.formData.the_term_start) {
      the_term = [moment(this.state.formData.the_term_start),moment(this.state.formData.the_term_end)];
    }
    return (
      <Modal
        title={editDevice ? '编辑项目' : '新增项目'}
        width={800}
        visible={editVisible}
        okText="保存"
        cancelText="关闭"
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <Card bordered={false} className={styles.card}>
          <Form labelAlign="left" className={styles.form}>
            <table className={styles.table}>
              <tr>
                <td>
                  <Form.Item label="编号" className={styles.item}>
                    {getFieldDecorator('code', {
                      initialValue: formData.code,
                      rules: [{
                        required: true,
                        min: 1,
                        max: 30,
                        message: '项目编号必须输入，且在30位以内',
                      }],
                    })(<Input placeholder="编号" />)}
                  </Form.Item>
                </td>
                <td>
                  <Form.Item label="名称">
                    {getFieldDecorator('name', {
                      initialValue: formData.name,
                      rules: [{ required: true, message: '项目名称必须输入' }],
                    })(<Input placeholder="名称" />)}
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Item label="所属行业">
                    {getFieldDecorator('industry', {
                      initialValue: formData.industry,
                      rules: [{ required: false, message: '项目所属行业必须输入' }],
                    })(<Input placeholder="所属行业" />)}
                  </Form.Item>
                </td>
                <td>
                  <Form.Item label="挂牌价格（万元）">
                    {getFieldDecorator('listing_price', {
                      initialValue: formData.listing_price,
                      rules: [{
                        required: true,
                        min: 1,
                        max: 15,
                        message: '项目挂牌价格必须输入，且在15位以内' }],
                    })(<Input placeholder="挂牌价格（万元）" />)}
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Item label="项目状态">
                    {getFieldDecorator('status', {
                      initialValue: formData.status,
                      rules: [{ required: true, message: '请选择项目状态' }],
                    })(
                      <DicSelect
                        vmode="int"
                        pcode="OPER$#project_status"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </Form.Item>
                </td>
                <td>
                  <Form.Item label="发布状态">
                    {getFieldDecorator('publish_status', {
                      initialValue: formData.publish_status,
                      rules: [{ required: true, message: '请选择发布状态' }],
                    })(
                      <Select placeholder="请选择" style={{ width: '100%' }}>
                        <Select.Option value={1}>已发布</Select.Option>
                        <Select.Option value={2}>未发布</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Item label="项目类型">
                    {getFieldDecorator('category', {
                      initialValue: formData.category,
                      rules: [{ required: true, message: '请选择项目类型' }],
                    })(
                      <DicSelect
                        vmode="int"
                        pcode="OPER$#project_type"
                        selectProps={{ placeholder: '请选择' }}
                      />
                    )}
                  </Form.Item>
                </td>
                <td>
                  <Form.Item label="挂牌期限">
                    {getFieldDecorator('the_term', {
                      initialValue: the_term,
                      rules: [{ required: true, message: '项目挂牌期限必须输入' }],
                    })(<RangePicker />)}
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Form.Item label="项目详情(URL)">
                    {getFieldDecorator('project_details', {
                      initialValue: formData.project_details,
                      rules: [{ required: true, message: '项目详情必须输入' }],
                    })(<TextArea rows={2} placeholder="项目详情" />)}
                  </Form.Item>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
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
                </td>
              </tr>
            </table>
          </Form>
        </Card>
      </Modal>
    );
  }
}
