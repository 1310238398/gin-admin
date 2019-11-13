import React, { PureComponent } from 'react';
import { message } from 'antd';
import ExtraInput from '../ExtraInput';
import { FormDivider } from '../../FormCard';
import infos from '@/services/s_infoManage';
import columns from '@/services/s_columnManage';

export default class InfoDataComponent extends PureComponent {
  constructor(props) {
    super(props);
    const { dataSource, treeData } = this.props;
    // callback(this.formSubmit);
    // eslint-disable-next-line react/no-unused-state
    this.state = { dataSource: dataSource || {}, treeData: treeData || [] };
  }

  componentDidMount() {
    const { callback, dataSource, treeData, org, hideColumn, column } = this.props;
    if (callback) {
      callback(this.formSubmit);
    }
    // const { dataSource, treeData } = this.state;
    if (!hideColumn && (!treeData || (Array.isArray(treeData) && treeData.length === 0))) {
      const orgid =
        org || (dataSource && dataSource.desc && dataSource.desc.org ? dataSource.desc.org : '');
      this.onOrgChange(orgid);
    }
    if (column) {
      this.fetchColumnExtra(column);
    }
  }

  onOrgChange = async org => {
    const response = await columns.queryColumnTree(org, '', '', 1);
    const treeData = Array.isArray(response) ? response : [];

    const { form, hideColumn } = this.props;
    if (!hideColumn) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ treeData }, () => {
        form.setFieldsValue({ column_id: '' });
      });
    }
  };

  fetchColumnExtra = async columnid => {
    // if (!columnid) return;
    const resp = await columns.queryExtra(columnid);
    const { dataSource } = this.state;
    if (dataSource) {
      dataSource.ctrl = resp;
      this.setState({ dataSource: { ...dataSource } });
    } else {
      this.setState({ dataSource: { ctrl: resp } });
    }
  };

  onClomunChange = async value => {
    if (!value) return;
    this.fetchColumnExtra(value);
    // const resp = await columns.queryExtra(value);
    // const { dataSource } = this.state;
    // if (dataSource) {
    //   dataSource.ctrl = resp;
    //   this.setState({ dataSource: { ...dataSource } });
    // } else {
    //   this.setState({ dataSource: { ctrl: resp } });
    // }
  };

  showExtra = () => {
    const { form } = this.props;
    const { dataSource } = this.state;

    if (!dataSource) {
      return;
    }
    const { ctrl } = dataSource;
    if (!ctrl) {
      return;
    }
    const { desc } = dataSource;
    const out = [];
    if (ctrl.length > 0) {
      out.push(<FormDivider key={`key${Math.random()}`} />);
    }
    out.push(
      ...ctrl.map(item => {
        const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
        const prop = {
          ctrl: item,
          value: initv,
          form,
          key: `key${item.code}`,
        };
        return <ExtraInput {...prop} />;
      })
    );
    return out;
  };

  formSubmitHandler = (kind, handler, errhandler) => {
    const { hideOrg, hideColumn, org, column, dataSource } = this.props;
    return new Promise(resolve => {
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (err) {
          resolve(false);
          if (errhandler) errhandler(err);
          return;
        }
        let formData = { ...values };
        formData.id = this.props.id;
        if (hideOrg) {
          if (org) {
            formData.org = org;
          } else if (dataSource && dataSource.desc && dataSource.desc.org) {
            formData.org = dataSource.desc.org;
          }
        }
        if (hideColumn) {
          if (column) {
            formData.column_id = column;
          } else if (dataSource && dataSource.desc && dataSource.desc.column_id) {
            formData.column_id = dataSource.desc.column_id;
          }
        }
        if (handler) {
          formData = handler(formData);
          if (!formData) {
            resolve(false);
            return;
          }
        }

        if (formData.id) {
          const response = await infos.submitUpdateDescKind(formData.id, kind, formData);
          if (response === 'ok') {
            message.success('保存成功');
          }
        } else {
          const response = await infos.submitInfoAddForKind(kind, formData);
          if (response) {
            message.success('保存成功');
          }
        }
        resolve(true);
      });
    });
  };
}
