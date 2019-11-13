import React from 'react';
import { message, Modal, Input, DatePicker } from 'antd';
import infos from '@/services/s_infoManage';
import reviews from '@/services/s_reviewManage';
import { FormCard, FormItem } from '@/components/FormCard';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const defaultActionKeys = {
  edit: 'edit',
  publish: 'publish',
  unpublish: 'unpublish',
  prohibit: 'prohibit',
  cancelprohibit: 'cancelprohibit',
  commit: 'commit',
  submitOk: 'submitOk',
  submitNo: 'submitNo',
  delete: 'delete',
  destroy: 'destroy',
  recover: 'recover',
  timingpub: 'timingpub',
};

class ActionKeys {
  constructor(keys) {
    this.keys = keys;
  }

  get timingpub() {
    return this.keys.timingpub;
  }

  get edit() {
    return this.keys.edit;
  }

  get publish() {
    return this.keys.publish;
  }

  get unpublish() {
    return this.keys.unpublish;
  }

  get prohibit() {
    return this.keys.prohibit;
  }

  get cancelprohibit() {
    return this.keys.cancelprohibit;
  }

  get commit() {
    return this.keys.commit;
  }

  get submitOk() {
    return this.keys.submitOk;
  }

  get submitNo() {
    return this.keys.submitNo;
  }

  get delete() {
    return this.keys.delete;
  }

  get destroy() {
    return this.keys.destroy;
  }

  get recover() {
    return this.keys.recover;
  }
}

export default class InfoOp {
  ops = {};

  static actionKeys = new ActionKeys(defaultActionKeys);

  actions = {};

  constructor(props) {
    const { confirmHandler, textAreaHandler, ops, callback } = props;
    if (confirmHandler) {
      // this.confirmHandler = confirmHandler;
    }
    if (textAreaHandler) {
      // this.textAreaHandler = textAreaHandler;
    }
    if (ops) {
      this.ops = ops;
    }
    if (callback) {
      this.callback = callback;
    }
    this.actions = this.creActions();
  }

  creActions() {
    const thiz = this;
    return {
      edit: { handler: thiz.onEdit, key: InfoOp.actionKeys.edit, name: '编辑', icon: 'edit' },
      copy: { handler: thiz.onEdit, key: InfoOp.actionKeys.edit, name: '复制', icon: 'copy' },
      publish: {
        handler: thiz.onPublish,
        key: InfoOp.actionKeys.publish,
        name: '发布',
        icon: 'upload',
      },
      timingpub: {
        handler: thiz.onTimingpub,
        key: InfoOp.actionKeys.timingpub,
        name: '定时发布',
        icon: 'dashboard',
      },
      unpublish: {
        handler: thiz.onUnPublish,
        key: InfoOp.actionKeys.unpublish,
        name: '取消发布',
        icon: 'close',
      },
      prohibit: {
        handler: thiz.onProhibit,
        key: InfoOp.actionKeys.prohibit,
        name: '禁止发布',
        icon: 'stop',
      },
      cancelprohibit: {
        handler: thiz.onCancelprohibit,
        key: InfoOp.actionKeys.cancelprohibit,
        name: '取消禁止发布',
        icon: 'play-circle',
      },

      commit: {
        handler: thiz.onCommit,
        key: InfoOp.actionKeys.commit,
        name: '提交审核',
        icon: 'arrow-up',
      },
      submitOk: {
        handler: thiz.onSubmitOk,
        key: InfoOp.actionKeys.submitOk,
        name: '审核通过',
        icon: 'check-square',
      },
      submitNo: {
        handler: thiz.onSubmitNo,
        key: InfoOp.actionKeys.submitNo,
        name: '审核不通过',
        icon: 'close-square',
      },

      delete: {
        handler: thiz.onDelete,
        key: InfoOp.actionKeys.delete,
        name: '删除',
        icon: 'delete',
      },
      destroy: {
        handler: thiz.onDestroy,
        key: InfoOp.actionKeys.destroy,
        name: '彻底删除',
        icon: 'close',
      },
      recover: {
        handler: thiz.onRecover,
        key: InfoOp.actionKeys.recover,
        name: '恢复',
        icon: 'reload',
      },
    };
  }

  confirmHandler = options => {
    // eslint-disable-next-line no-console
    // console.log('请设置 confirmHandler 属性');
    return Modal.confirm({ ...options });
  };

  textAreaHandler = options => {
    // eslint-disable-next-line no-console
    // console.log('请设置 textAreaHandler 属性');
    return <Input.TextArea {...options} />;
  };

  callback = () => {};

  onCallBack = (ok, op) => {
    this.callback(ok, op);
  };

  renderConfirm = options => {
    return this.confirmHandler(options);
  };

  renderTextArea = options => {
    return this.textAreaHandler(options);
  };

  renderTimingpub = (record, options) => {
    const f = 'YYYY-MM-DD HH:mm:ssZ';
    const out = {};
    const onStartOK = value => {
      if (value) {
        out.start = value.format(f);
      } else {
        out.start = null;
      }
      if (options.onChange) {
        options.onChange({ ...out });
      }
    };
    const onEndOK = value => {
      if (value) {
        out.end = value.format(f);
      } else {
        out.end = null;
      }
      if (options.onChange) {
        options.onChange({ ...out });
      }
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { start, end } = record.timingpub || {};

    return (
      <FormCard>
        <FormItem col={1} {...formItemLayout} label="发布时间">
          <DatePicker
            defaultValue={start ? moment(start, f) : null}
            showTime
            onChange={onStartOK}
            placeholder="选择发布时间"
            format="YYYY-M-D HH:mm"
            locale={locale}
          />
        </FormItem>
        <FormItem col={1} {...formItemLayout} label="取消发布时间">
          <DatePicker
            defaultValue={end ? moment(end, f) : null}
            showTime
            onChange={onEndOK}
            placeholder="选择取消发布时间"
            format="YYYY-M-D HH:mm"
            locale={locale}
          />
        </FormItem>
      </FormCard>
    );
  };

  renderTextArea = options => {
    return this.textAreaHandler(options);
  };

  onPublish = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要发布吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.publishInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.publish);
        }
      },
    });
  };

  onCommit = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要提交审核吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.commitInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.commit);
        }
      },
    });
  };

  onRecover = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要回复已删除信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.recoverInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.recover);
        }
      },
    });
  };

  onDestroy = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要彻底删除信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.destroyInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.destroy);
        }
      },
    });
  };

  onDelete = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要删除信息吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.delInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.delete);
        }
      },
    });
  };

  onUnPublish = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要取消发布吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.unpublishInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.unpublish);
        }
      },
    });
  };

  onCancelprohibit = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要取消禁止发布吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.cancelprohibit(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.cancelprohibit);
        }
      },
    });
  };

  onProhibit = record => {
    const thiz = this;
    this.renderConfirm({
      title: '确定要取消禁止发布吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.prohibitInfo(record.info_id);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.prohibit);
        }
      },
    });
  };

  onEdit = () => {
    // eslint-disable-next-line no-alert
    alert('请覆盖该操作，没有默认实现');
  };

  onSubmitOk = record => {
    const thiz = this;
    const modal = this.renderConfirm({
      title: '确定要审核通过吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        if (!this.msg) {
          message.warning('请填写审核意见');
          return;
        }
        const resp = await reviews.submitOk({
          targetType: 1,
          targetID: record.info_id,
          reason: this.msg,
        });
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.submitOk);
        }
      },
      okButtonProps: { disabled: true },
      content: this.renderTextArea({
        placeholder: '请填写审核意见',
        maxLength: '500',
        onChange: e => {
          this.msg = e.target.value;
          modal.update({ okButtonProps: { disabled: !this.msg } });
        },
      }),
    });
  };

  onTimingpub = record => {
    const thiz = this;
    const modal = this.renderConfirm({
      title: '定时发布？',
      okText: '确认',
      okType: 'info',
      cancelText: '取消',
      onOk: async () => {
        const resp = await infos.timingpub(record.info_id, this.timingpubvalue);
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.submitOk);
        }
      },
      okButtonProps: { disabled: true },
      content: this.renderTimingpub(record, {
        onChange: value => {
          this.timingpubvalue = value;
          modal.update({ okButtonProps: { disabled: !this.timingpubvalue } });
        },
      }),
    });
  };

  onSubmitNo = record => {
    const thiz = this;
    const modal = this.renderConfirm({
      title: '确定要审核不通过吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        if (!this.msg) {
          message.warning('请填写审核意见');
          return;
        }
        const resp = await reviews.submitNo({
          targetType: 1,
          targetID: record.info_id,
          reason: this.msg,
        });
        if (resp === 'ok') {
          thiz.onCallBack('ok', InfoOp.actionKeys.submitNo);
        }
      },
      okButtonProps: { disabled: true },
      content: this.renderTextArea({
        placeholder: '请填写审核意见',
        maxLength: '500',
        onChange: e => {
          this.msg = e.target.value;

          modal.update({ okButtonProps: { disabled: !this.msg } });
        },
      }),
    });
  };

  editAction = (out, isEdit) => {
    if (isEdit) {
      out.push(this.actions.edit);
    }
  };

  getActions = (record, isEdit, option) => {
    const out = [];

    switch (record.status.status) {
      case -1:
        // 删除状态
        out.push(this.actions.recover);
        out.push(this.actions.destroy);
        break;
      case 0:
        // 初始化状态
        this.editAction(out, isEdit);
        if (record.ctl_param && record.ctl_param.is_info_chk === 1) {
          // 栏目需要审核
          out.push(this.actions.commit);
        } else if (record.ctl_param.is_prohibit_pub_info !== 1) {
          // 栏目允许发布
          out.push(this.actions.publish);
          out.push(this.actions.timingpub);
        }
        out.push(this.actions.delete);
        break;
      case 1:
        // 待审核状态
        out.push({
          handler: this.onSubmitOk,
          action: 'submitOk',
          name: '审核通过',
          icon: 'check-square',
        });
        out.push({
          handler: this.onSubmitNo,
          action: 'submitNo',
          name: '审核不通过',
          icon: 'close-square',
        });
        out.push(this.actions.delete);
        break;
      case 2:
        // 审核通过状态
        if (record.ctl_param.is_prohibit_pub_info !== 1) {
          // 栏目允许发布
          out.push(this.actions.publish);
          out.push(this.actions.timingpub);
        }
        out.push(this.actions.delete);
        break;
      case 3:
        // 审核不通过状态
        this.editAction(out, isEdit);
        out.push(this.actions.commit);
        out.push(this.actions.delete);
        break;
      case 4:
        // 取消发布状态
        this.editAction(out, isEdit);
        if (record.ctl_param.is_prohibit_pub_info !== 1) {
          // 栏目允许发布
          out.push(this.actions.publish);
          out.push(this.actions.timingpub);
        }
        out.push(this.actions.delete);
        break;
      case 5:
        // 发布状态
        if (record.ctl_param.info_mode === 1) {
          if (isEdit) {
            out.push(this.actions.copy);
          }
        } else {
          this.editAction(out, isEdit);
        }
        out.push(this.actions.timingpub);
        out.push(this.actions.unpublish);
        out.push(this.actions.prohibit);
        out.push(this.actions.delete);
        break;
      case 6:
        // 禁止发布状态
        this.editAction(out, isEdit);
        out.push(this.actions.cancelprohibit);
        out.push(this.actions.delete);
        break;
      case 7:
        if (isEdit) {
          out.push(this.actions.copy);
        }
        out.push(this.actions.delete);
        break;
      default:
    }
    return out.map(item => this.parseOp(item, option));
  };

  // 分析包装操作行为
  parseOp(item, option) {
    // 编码时的默认操作
    let op = { ...item };
    // 构造时的默认操作
    if (this.ops[item.key]) {
      op = { ...op, ...this.ops[item.key] };
    }
    // 调用时的默认操作
    if (option && option[item.key]) {
      op = { ...op, ...option[item.key] };
    }
    return op;
  }
}
