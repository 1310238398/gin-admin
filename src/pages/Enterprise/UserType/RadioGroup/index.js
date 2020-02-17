import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { queryEnterpriseUserType } from '@/services/enterprise';

export default class UserTypeRadioGroup extends PureComponent {

  static defaultProps = {
    style: {},
    onChange: () => {},
    enterpriseID: '',
  };


  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
    };
  }

  componentDidMount() {
    const { enterpriseID } = this.props;
    if(enterpriseID===''){
      return false;
    }else{
      queryEnterpriseUserType({ record_id: enterpriseID }).then(data => {
        this.setState({ data: data.list || [] });
      });
    }
   
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: nextProps.value };
    }
    return state;
  }


  componentDidUpdate() {
    if (this.props.enterpriseID === '') {
      return false;
    } else{
        queryEnterpriseUserType({ record_id: this.props.enterpriseID }).then(data => {
          this.setState({ data: data.list || [] });
        });
     }
    
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ value });
    this.triggerChange(value);
  };

  triggerChange = data => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(data);
    }
  };

  render() {
    const { value, data } = this.state;

    return (
      <Radio.Group value={value} onChange={this.handleChange}>
        {data.map(item => (
          <Radio key={item.code} value={item.code}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    );
  }
}
