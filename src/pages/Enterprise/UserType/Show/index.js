import React, { PureComponent } from 'react';
import { queryEnterpriseUserType } from '@/services/enterprise';

export default class UserTypeShow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const { enterpriseID, code } = this.props;
    const key = `${enterpriseID}_usertypes`;
    const item = sessionStorage.getItem(key);
    if (item && item !== '') {
      const data = JSON.parse(item);
      this.setState({ value: this.findAndGetValue(data, code) });
      return;
    }

    queryEnterpriseUserType({ record_id: enterpriseID }).then(data => {
      const list = data.list || [];
      sessionStorage.setItem(key, JSON.stringify(list));
      this.setState({ value: this.findAndGetValue(list, code) });
    });
  }



  componentDidUpdate() {
    if (this.value !== this.props.value) {
      this.value = this.props.value;
      this.functionList();
    }
  }

  findAndGetValue = (data, code) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].code === code) {
        return data[i].name;
      }
    }
    return '';
  };


  functionList() {
    const { enterpriseID, code } = this.props;
    const key = `${enterpriseID}_usertypes`;
    queryEnterpriseUserType({ record_id: enterpriseID }).then(data => {
      const list = data.list || [];
      sessionStorage.setItem(key, JSON.stringify(list));
      this.setState({ value: this.findAndGetValue(list, code) });
    });
  }

  render() {
    const { value } = this.state;
    return <span>{value}</span>;
  }
}
