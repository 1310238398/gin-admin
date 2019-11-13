import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Modal } from 'antd';
import { md5Hash } from '../../utils/utils';
import toptitle from '../../assets/logo_ytc@2x.png';
import andor2x from '../../assets/andor2x.png';
import appleax from '../../assets/appleax.png';
import andorerweimasc from '../../assets/android.png';
import apple from '../../assets/apple.png';
import styles from './Index.less';

const FormItem = Form.Item;
@Form.create()
@connect(state => ({
  login: state.login,
  global: state.global,
}))
class Login extends PureComponent {
  state = {
    showType: false,
  };

  componentDidMount() {
    this.dispatch({
      type: 'login/loadCaptcha',
    });
  }

  reloadVerify = () => {
    this.dispatch({
      type: 'login/reloadCaptcha',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { login, form } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/submit',
          payload: {
            user_name: values.username,
            password: md5Hash(values.password),
            captcha_code: values.verify_code,
            captcha_id: login.captchaID,
          },
        });
      }
    });
  };

  dispatch = action => {
    const { dispatch } = this.props;
    dispatch(action);
  };

  renderMessage = (type, message) => (
    <Alert style={{ marginBottom: 24 }} message={message} type={type} closable />
  );

  // 下载方式弹窗
  showLoadType = () => {
    this.setState({
      showType: true,
    });
  };

  handleCancel = () => {
    this.setState({
      showType: false,
    });
  };

  renderLoadType = () => {
    if (this.state.showType) {
      return (
        <Modal
          title={null}
          visible={this.state.showType}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          className={styles.modalty}
        >
          <div className={styles.LoadList}>
            <p className={styles.LoadListTtile}>下载客户端</p>
          </div>
          <div className={styles.loadtypes}>
            <div className={styles.erweima}>
              <div className={styles.bgerweima}>
                <img src={andorerweimasc} alt="Android下载" className={styles.andorerweima} />
              </div>
            </div>
            <div className={styles.erweima}>
              <div className={styles.bgerweima}>
                <img src={apple} alt="ios下载" className={styles.andorerweima} />
              </div>
            </div>
          </div>
          <div className={styles.loadtypel}>
            <div>
              <img src={andor2x} alt="" className="andor2x" />
              <span>Android下载</span>
            </div>
            <div>
              <img src={appleax} alt="" className="appleax" />
              <span>ios下载</span>
            </div>
          </div>
        </Modal>
      );
    }
  };

  render() {
    const {
      form,
      login,
      global: { title },
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <div className={styles.leftlogo}>
          <img src={toptitle} className="logoyt" alt="" />
          <span className={styles.title}>{title}</span>
        </div>

        <Form onSubmit={this.handleSubmit}>
          {login.status === 'FAIL' &&
            login.submitting === false &&
            this.renderMessage('warning', login.tip)}

          {login.status === 'ERROR' &&
            login.submitting === false &&
            this.renderMessage('error', login.tip)}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入账户名！',
                },
              ],
            })(
              <Input
                size="large"
                // prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="请输入用户名"
                allowClear
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！',
                },
              ],
            })(
              <Input
                size="large"
                // prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="请输入密码"
                allowClear
              />
            )}
          </FormItem>
          <FormItem>
            <div className="lastCat">
              <Input.Group compact>
                {getFieldDecorator('verify_code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(
                  <Input
                    style={{ width: '70%', marginRight: 10 }}
                    size="large"
                    // prefix={<Icon type="code" className={styles.prefixIcon} />}
                    placeholder="请输入验证码"
                    allowClear
                  />
                )}
                <img
                  width={102}
                  height={46}
                  style={{ backgroundColor: 'rgba(135,152,173,0.216)', marginTop: '9px' }}
                  src={login.captcha}
                  alt="验证码"
                  onClick={() => {
                    this.reloadVerify();
                  }}
                />
              </Input.Group>
            </div>
          </FormItem>
          <FormItem className={styles.additional}>
            <Button
              size="large"
              loading={login.submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
          <div className="loadtype">
            <div>
              <span>建议使用火狐/360浏览器登录</span>
            </div>
            <div>
              <span
                onClick={() => {
                  this.showLoadType();
                }}
              >
                下载客户端
              </span>
            </div>
          </div>
        </Form>
        {this.renderLoadType()}
      </div>
    );
  }
}

export default Login;
