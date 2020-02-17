import React from 'react';
/* 引用组件 */
import { connect } from 'dva';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Radio,
  Button,
  TimePicker,
} from 'antd';
import moment from 'moment';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

/* 样式 */
import styles from './Store.less';

const RadioGroup = Radio.Group;
@Form.create()
@connect(state => ({
  storeSeting: state.store,
}))
/* 组件 */
export default class GeneralSetting extends React.PureComponent {
  /* 初始数据 */
  state = {
    disabled: false,
  };

  /* 挂载完成 */
  componentDidMount() {}

  /* 表单提交 */
  handleBtnClick = () => {
    const format = 'HH:mm';
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.open_time && values.open_time !== '') {
          values.open_time = values.open_time.format(format);
        } else {
          values.open_time = '';
        }
        if (values.close_time && values.close_time !== '') {
          values.close_time = values.close_time.format(format);
        } else {
          values.close_time = '';
        }

        const formData = { ...values };
        this.props.dispatch({
          type: 'store/applyStore',
          payload: formData,
        });
      }
    });
  };

  render() {
    /* 表单布局 */
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

    const col = {
      sm: 24,
      md: 12,
    };
    const colC = {
      sm: 24,
      md: 24,
    };
    /* 表单功能 */
    const { TextArea } = Input;
    const {
      form: { getFieldDecorator },
    } = this.props;
    /* 表单数据 */
    const formData ={};
    return (
      <PageHeaderLayout title="通用设置">
        <div className={styles.APPLYStore}>
          <div className={styles.TOPtitle}>
            <p>店铺设置</p>
          </div>
          <Card bordered={false} title="经营设置">
            <Form>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="经营状态">
                    {getFieldDecorator('store_code', {
                      initialValue: formData.store_code || '',
                      rules: [
                        {
                          required: true,
                          message: '请选择',
                        },
                      ],
                    })(
                      <RadioGroup name="radiogroup">
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                      </RadioGroup>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业开始时间">
                    {getFieldDecorator('open_time', {
                      initialValue:
                        formData.open_time && formData.open_time !== '0:0'
                          ? moment(formData.open_time, 'HH:mm')
                          : moment('08:00', 'HH:mm'),
                      rules: [
                        {
                          required: false,
                          message: '请选择',
                        },
                      ],
                    })(<TimePicker format="HH:mm" disabled={this.state.disabled} />)}
                  </Form.Item>
                </Col>
                <Col {...col}>
                  <Form.Item {...formItemLayout} label="营业结束时间">
                    {getFieldDecorator('close_time', {
                      initialValue:
                        formData.close_time && formData.close_time !== '0:0'
                          ? moment(formData.close_time, 'HH:mm')
                          : moment('21:00', 'HH:mm'),
                      rules: [
                        {
                          required: false,
                          message: '请选择',
                        },
                      ],
                    })(
                      <TimePicker
                        defaultValue={moment('21:00', 'HH:mm')}
                        format="HH:mm"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className={styles.TOPtitle}>
            <p>其他信息</p>
          </div>
          <Card bordered={false}>
            <Form>
              <div>
                <Row>
                  <Col {...colC} style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      style={{ marginTop: '10px' }}
                      onClick={this.handleBtnClick}
                    >
                      提交
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
