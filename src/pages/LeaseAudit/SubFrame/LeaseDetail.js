import React, { PureComponent } from 'react';
import FilterXSS from 'xss';
import { Modal, Row, Col, Avatar, Button, Input, Form } from 'antd';
import { connect } from 'dva';
import FormItem from 'antd/lib/form/FormItem';
import style from './LeaseDetail.less';

import { DicShow } from '../../../components/Dictionary';
import UserShow from '../../../components/UserShow';

import { parseUtcTime } from '../../../utils/utils';

@Form.create()
/**
 * 租赁信息审核详情界面
 * WGH
 * 2018/10/11
 */
@connect(state => ({
  leaseAuditList: state.leaseAuditList,
}))
export default class LeaseDetail extends PureComponent {
  state = {
    visible: false,
  };

  async componentDidMount() {
    const { id, type, callback } = this.props;
    await this.props.dispatch({
      type: 'leaseAuditList/loadForm',
      payload: {
        id,
        type,
        callback,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'leaseAuditList/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  handelAdopt = () => {
    this.props.dispatch({
      type: 'leaseAuditList/handelAdopt',
      payload: {
        info_id: this.props.dataFormInfo.info_id,
      },
    });
    this.props.callback();
  };

  Coercion = type => {
    this.props.dispatch({
      type: 'leaseAuditList/Coercion',
      payload: {
        info_id: this.props.dataFormInfo.info_id,
        type,
      },
    });
    this.props.callback();
  };

  Reject = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'leaseAuditList/submitNo',
          payload: {
            targetType: 1,
            targetID: this.props.dataFormInfo.info_id,
            reason: values.reason,
          },
        });
        this.setState({
          visible: false,
        });
        this.props.callback();
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const { status } = this.props.dataFormInfo.status;
    let footerJsx = '';
    if (status === 1) {
      footerJsx = [
        <Button key="adopt" type="primary" onClick={this.handelAdopt}>
          通过并上架
        </Button>,
        <Button key="adopt" type="danger" onClick={this.Reject}>
          驳回
        </Button>,
        <Button key="cancel" onClick={this.onModalCancelClick}>
          取消
        </Button>,
      ];
    } else if (status === 5 || status === 4) {
      footerJsx = [
        <Button key="Coercion" type="primary" onClick={() => this.Coercion(true)}>
          强制下架
        </Button>,
        <Button key="cancel" onClick={this.onModalCancelClick}>
          取消
        </Button>,
      ];
    } else if (status === 6) {
      footerJsx = [
        <Button key="Coercion" type="primary" onClick={() => this.Coercion(false)}>
          取消强制下架
        </Button>,
        <Button key="cancel" onClick={this.onModalCancelClick}>
          取消
        </Button>,
      ];
    }
    const {
      leaseAuditList: {
        formVisible,
        formData: { desc, operator, chk_operator },
      },
    } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Modal
          title="租赁信息详情"
          className={style.frame}
          bodyStyle={{ padding: '0px' }}
          visible={formVisible}
          onCancel={this.onModalCancelClick}
          footer={footerJsx}
        >
          {desc && (
            <div style={{ height: '500px', overflowY: 'auto' }}>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  {' '}
                  标题：
                </Col>
                <Col span={20}>{desc.title}</Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  发布人：
                </Col>
                <Col span={8}>
                  <UserShow uid={this.props.dataFormInfo.desc.owner} />
                </Col>
                <Col span={4} className={style.label_title}>
                  联系人姓名：
                </Col>
                <Col span={8}>{desc.extras.lxr}</Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  {' '}
                  联系人电话：
                </Col>
                <Col span={8}>{desc.extras.lxdh}</Col>
                <Col span={4} className={style.label_title}>
                  {' '}
                  类型：
                </Col>
                <Col span={8}>{<DicShow pcode="cms$#infos$#fylx" code={[desc.extras.fl]} />}</Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  {' '}
                  地址：
                </Col>
                <Col span={20}>{desc.extras.fydz}</Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  面积：
                </Col>
                <Col span={8}>{desc.extras.mj} ㎡</Col>
                <Col span={4} className={style.label_title}>
                  租金：
                </Col>
                <Col span={8}>
                  {desc.extras.zj}
                  元/月
                </Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  标签：
                </Col>
                <Col span={20}>
                  <span>{desc.extras.fybq}</span>
                  <span>{desc.extras.lc} </span>
                  <span>{desc.extras.yjfs} </span>
                  <span>{desc.extras.zlfs} </span>
                </Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  详情：
                </Col>
                <Col span={20}>
                  <Col
                    span={20}
                    dangerouslySetInnerHTML={{
                      __html: FilterXSS(desc.content),
                    }}
                  />
                </Col>
              </Row>
              {desc.icon && (
                <Row className={style.col_margin}>
                  <Col span={4} className={style.label_title}>
                    房源照片：
                  </Col>
                  <Col span={20}>
                    {desc.icon.map((val, index) => {
                      const key = `key_${index}`;
                      return (
                        <Avatar
                          key={key}
                          src={val}
                          size={100}
                          shape="square"
                          className={style.pic}
                        />
                      );
                    })}
                  </Col>
                </Row>
              )}
              {desc.extras.sp && (
                <Row className={style.col_margin}>
                  <Col span={4} className={style.label_title}>
                    房源视频：
                  </Col>
                  <Col span={20}>
                    <video
                      style={{ height: 440, maxWidth: 460 }}
                      controls="controls"
                      src={JSON.parse(desc.extras.sp).video_src}
                    >
                      <track kind="captions" />
                    </video>
                    {/* {desc.extras.sp.map((val, index) => {
                      const key = `key_${index}`;
                      return (
                        // eslint-disable-next-line jsx-a11y/media-has-caption
                        <video key={key} style={{ width: '440px' }} controls="controls" src={val} />
                      );
                    })} */}
                  </Col>
                </Row>
              )}
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  发布时间：
                </Col>
                <Col span={8}> {parseUtcTime(operator.cre_time)}</Col>
                <Col span={4} className={style.label_title}>
                  状态：
                </Col>
                <Col span={8}>{<DicShow pcode="cms$#infos$#zlxxstatus" code={[status]} />}</Col>
              </Row>
              <Row className={style.col_margin}>
                <Col span={4} className={style.label_title}>
                  驳回理由：
                </Col>
                <Col span={20}>
                  {chk_operator.check_content === '' ? ' ' : chk_operator.check_content}
                </Col>
              </Row>
            </div>
          )}
        </Modal>
        <Modal
          title="驳回"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <FormItem {...formItemLayout} label="驳回理由">
            {getFieldDecorator('reason', {
              rules: [
                {
                  required: true,
                  message: '请输入驳回理由',
                },
              ],
            })(<Input placeholder="请输入驳回理由" />)}
          </FormItem>
        </Modal>
      </div>
    );
  }
}
