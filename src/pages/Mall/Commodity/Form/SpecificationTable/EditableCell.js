import React, { PureComponent } from 'react';
import { Input, Form, InputNumber } from 'antd';
import PicturesWall from '@/components/PicturesWall/PicturesWall';

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
      goods_code: Form.createFormField({
        value: data.goods_code,
      }),
      price: Form.createFormField({
        value: data.price,
      }),
      stock: Form.createFormField({
        value: data.stock,
      }),
      image: Form.createFormField({
        value: data.image ? data.image : [],
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
})(EditableRow);

export class EditableCell extends PureComponent {
  renderFormItem = (dataIndex, title) => {
    if (dataIndex === 'image') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: false,
                message: `请添加规格图片`,
              },
            ],
          })(
            <PicturesWall
              bucket="mall"
              name="data"
              num={1}
              listType="picture-card"
              accept="image/*"
            />
          )}
        </FormItem>
      );
    }

    let isRequired = true;
    if (dataIndex === 'code') {
      isRequired = false;
    }
    if (dataIndex === 'stock') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(dataIndex, {})(
            <InputNumber style={{ width: 100 }} min={0} max={99999} />
          )}
        </FormItem>
      );
    } else if (dataIndex === 'price') {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(dataIndex, {})(
            <InputNumber
              style={{ width: 110 }}
              min={0}
              precision={2}
              step={0.01}
              max={99999999.99}
            />
          )}
        </FormItem>
      );
    } else {
      return (
        <FormItem style={{ margin: 0 }}>
          {this.form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: isRequired,
                message: `请输入${title}`,
              },
            ],
          })(<Input style={{ width: '100%' }} />)}
        </FormItem>
      );
    }
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
