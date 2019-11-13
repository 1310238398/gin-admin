import React, { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create({
  mapPropsToFields: props => {
    const data = props.record ? props.record : {};
    return {
      stock: Form.createFormField({
        value: data.stock,
      }),
    };
  },
  onFieldsChange: (props, changedFields) => {
    const { handleSave, record } = props;
    const newData = { ...record };
    for (const key in changedFields) {
      if (Object.prototype.hasOwnProperty.call(changedFields, key)) {
        newData[key] = changedFields[key].value;
      }
    }
    handleSave(newData);
  },
  checkPrice: (value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  },
})(EditableRow);

export class EditableCell extends PureComponent {
  renderFormItem = (dataIndex, title) => {
    let isRequired = true;
    if (dataIndex === 'code') {
      isRequired = false;
    }
    return (
      <FormItem style={{ margin: 0 }}>
        {this.form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: isRequired,
              message: `请输入${title}`,
              validator: this.checkPrice,
            },
          ],
        })(<InputNumber style={{ width: '100%' }} min={0} max={99999} />)}
      </FormItem>
    );
  };

  render() {
    const { editable, dataIndex, title, ...restProps } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return this.renderFormItem(dataIndex, title);
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}
