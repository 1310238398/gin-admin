import React from 'react';
import { Modal, TreeSelect, Form } from 'antd';
import { FormCard, FormItem } from '../../FormCard';
import columns from '../../../services/s_columnManage';
import { OrgSelect } from '../../Org';
import { DicSelect } from '../../Dictionary';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface SelectCardProps extends FormComponentProps {
  hideColumn?: boolean;
  hideOrg?: boolean;
  column?: string;
  org?: string;
  onOk?: (value: ValueSate) => void;
  onClose?: () => void;
  visibled?: boolean;
}

interface SelectCardState {
  columnCtrl?: any;
  treeData?: any[];
}
export interface ValueSate {
  selectColumn: string;
  selectOrg: string;
  selectKind: number;
}

class SelectCard extends React.Component<SelectCardProps, SelectCardState> {
  constructor(props: SelectCardProps) {
    super(props);
    this.state = {
      treeData: [],
    };
  }
  componentDidMount() {
    const { org } = this.props;
    this.onOrgChange(org);
  }

  onOrgChange = async (org: string) => {
    //this.setState({ selectOrg: org });
    const response = await columns.queryColumnTree(org, '', '', 1);
    const treeData = Array.isArray(response) ? response : [];

    this.setState({ treeData }, () => {});
  };

  onClomunChange = async (value: string) => {
    if (!value) return;
    //this.setState({ selectColumn: value });
    const columnCtrl = await columns.queryCtrl(value);
    this.setState({ columnCtrl });
    this.props.form.setFieldsValue({ selectKind: null });
  };
  //   onChangeKind = (value: number) => {
  //     this.setState({ selectKind: value });
  //   };
  onModalOKClick = () => {
    const { onOk } = this.props;
    const { org, hideOrg } = this.props;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = { ...values };
        const { selectColumn, selectKind, selectOrg } = formData;
        const showOrg = !(hideOrg && org);
        if (onOk) {
          onOk({
            selectColumn,
            selectKind,
            selectOrg: selectOrg ? selectOrg : !showOrg ? org : '',
          });
        }
      }
    });
  };
  onModalCancelClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };
  render() {
    const {
      hideOrg,
      org,
      column,
      hideColumn,
      visibled,
      form: { getFieldDecorator },
    } = this.props;
    const { treeData, columnCtrl } = this.state;
    const showColumn = !(hideColumn && column);
    const showOrg = !(hideOrg && org);
    const showKind = !!columnCtrl;
    const kindprop: any = {
      //   onChange: this.onChangeKind,
      vmode: 'int',
      pcode: 'cms$#infos$#kind',
      selectProps: { disabled: !showKind, placeholder: '请选择' },
    };
    if (showKind) {
      if (columnCtrl.deny_info_kind_all === 1) kindprop.code = [...columnCtrl.allow_info_kinds];
      //kindprop.value = selectKind;
    }
    return (
      <Modal
        title="选择"
        visible={visibled}
        maskClosable={false}
        // confirmLoading={submitting}
        destroyOnClose
        onOk={this.onModalOKClick}
        onCancel={this.onModalCancelClick}
      >
        <FormCard form={this.props}>
          {showOrg && (
            <FormItem col={1} label="组织">
              {getFieldDecorator('selectOrg', {
                initialValue: org,
                rules: [
                  {
                    required: false,
                    message: '请输入所属组织',
                  },
                ],
              })(<OrgSelect onChange={this.onOrgChange} />)}
            </FormItem>
          )}
          {showColumn && (
            <FormItem col={1} label="栏目">
              {getFieldDecorator('selectColumn', {
                initialValue: column,
                rules: [
                  {
                    required: true,
                    message: '请选择栏目',
                  },
                ],
              })(
                <TreeSelect
                  style={{ width: '100%' }}
                  treeData={treeData}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择栏目"
                  treeDefaultExpandAll
                  showSearch
                  allowClear
                  onChange={this.onClomunChange}
                />
              )}
            </FormItem>
          )}
          <FormItem col={1} label="类型">
            {getFieldDecorator('selectKind', {
              rules: [
                {
                  required: true,
                  message: '请选择类型',
                },
              ],
            })(<DicSelect {...kindprop} />)}
          </FormItem>
        </FormCard>
      </Modal>
    );
  }
}

export default Form.create()(SelectCard);
