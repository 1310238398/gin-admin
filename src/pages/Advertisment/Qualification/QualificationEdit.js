/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal, DatePicker } from 'antd';
import { connect } from 'dva';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import AdvertiserSelect from '@/components/AdvertiserSelect/AdvertiserSelect';
import styles from './Qualification.less';

@Form.create()
@connect(state => ({
  qualification: state.qualification,
}))
export default class QualificationEdit extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'qualification/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'qualification/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick(value) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };
        formData.file_url = values.file_url[0];
        formData.status = value;
        this.props.dispatch({
          type: 'qualification/submit',
          payload: formData,
        });
      }
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      qualification: { formData, formTitle, formVisible },
      form: { getFieldDecorator },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };
    const colCjy = {
      sm: 24,
      md: 24,
    };
    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(1)}>
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
        width={900}
        bodyStyle={{ paddingRight: 30, paddingLeft: 30 }}
      >
        <Card title="资质信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="名称">
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
                <Form.Item label="广告主">
                  {getFieldDecorator('advertiser_id', {
                    initialValue: formData.advertiser_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<AdvertiserSelect />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item label="资质文件路径">
                  {getFieldDecorator('file_url', {
                    initialValue: formData.file_url ? [formData.file_url] : '',
                    rules: [
                      {
                        required: true,
                        message: '请上传',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="资质过期时间">
                  {getFieldDecorator('date', {
                    initialValue: formData.date || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<DatePicker />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div className={styles.callout}>
            <p>1.可以上传图片文件类型为:jpg,jpeg,png,gif,bmp.</p>
            <p> 2.组织机构证大小不超过200KB，其它图片大小不超过2M，压缩包文件不超过10M.</p>
            <p> 3.请确保至少提交营业执照、法人身份证、ICP证，否则不予审核.</p>
            <p>
              4.具体资质要求及审核流程请下载广告资质审核文档. 5.可以上传压缩文件类型为:zip,rar,7z.
            </p>
          </div>
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
