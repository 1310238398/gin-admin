import React from 'react';
import { Dropdown, Menu, Button } from 'antd';
import InfoDataEdit from '../InfoDataEdit';
import columns from '@/services/s_columnManage';
import SelectCard, { ValueSate } from './SelectCard';

const defaultTypes: InfoKind[] = [
  { kind: 1, name: '文章' },
  { kind: 2, name: '短文' },
  { kind: 5, name: '调查问卷' },
];
interface InfoKind {
  kind: number;
  name: string;
}
interface Edit {
  callback: Function;
  hideColumn?: boolean;
  hideOrg?: boolean;
  column?: string;
  org?: string;
  id?: string;
}
interface UserSetProps {
  edit?: Edit;
  kinds?: InfoKind[];
  showKinds?: number[];
  visible?: boolean;
  mode?: string;
}
interface NewButtonState {
  formTitle?: string;
  visible?: boolean;
  datatype?: number;
  columnCtrl?: any;
  treeData?: any[];
  showSelectStart: boolean;
  selectValue?: ValueSate;
}

export default class NewButton extends React.Component<UserSetProps, NewButtonState> {
  constructor(props: UserSetProps) {
    super(props);
    const { visible } = props;
    const state = {
      visible: true,
      datatype: 1,
      showSelectStart: false,
    };

    this.state = { ...state, visible };
  }

  public static getDerivedStateFromProps(nextProps) {
    if (nextProps.visible) {
      const { visible } = nextProps;
      return { visible };
    }
    return null;
  }
  componentDidMount() {
    const edit = this.props.edit ? this.props.edit : { org: null };
    const { org } = edit;
    this.onOrgChange(org);
  }

  handleMenuClick = ({ key }) => {
    this.setState({
      visible: true,
      datatype: parseInt(key, 10),
    });
  };

  onOrgChange = async org => {
    const response = await columns.queryColumnTree(org, '', '', 1);
    const treeData = Array.isArray(response) ? response : [];

    this.setState({ treeData }, () => {});
  };

  onClomunChange = async value => {
    if (!value) return;
    const columnCtrl = await columns.queryCtrl(value);
    this.setState({ columnCtrl });
  };

  onNewInfoStart = () => {
    this.setState({ showSelectStart: true });
  };
  onSelectKind = (value?: ValueSate) => {
    if (value) {
      this.setState({ selectValue: value, visible: true }, () => {
        // this.setState({ showSelectStart: false });
      });
    } else {
      this.setState({ selectValue: null, visible: false, showSelectStart: false }, () => {});
    }
  };
  renderSelect = () => {
    const { showSelectStart, selectValue } = this.state;
    const edit = this.props.edit || { hideOrg: false, org: '', column: '', hideColumn: false };
    const { hideOrg, hideColumn } = edit;
    let { org, column } = edit;
    if (selectValue) {
      org = selectValue.selectOrg || org;
    }

    const prop = {
      hideOrg,
      org,
      column,
      hideColumn,
      onOk: this.onSelectKind,
      onClose: this.onSelectKind,
      visibled: showSelectStart,
    };
    if (showSelectStart) return <SelectCard {...prop} />;
    return '';
  };

  renderDataForm = () => {
    const { edit, mode } = this.props;
    if (this.state.visible) {
      const { selectValue, datatype, formTitle } = this.state;
      const callback = ok => {
        if (edit.callback) {
          edit.callback(ok);
        }
        this.setState({ visible: false });
      };
      const prop = { ...edit, callback, datatype, formTitle };
      if (selectValue) {
        prop.column = selectValue.selectColumn;
        prop.org = selectValue.selectOrg;
        prop.datatype = selectValue.selectKind;
      }
      if (mode === 'button') {
        if (edit && edit.id) {
          prop.hideColumn = edit.hideColumn;
          prop.hideOrg = edit.hideOrg;
        } else {
          prop.hideColumn = true;
          prop.hideOrg = true;
        }
      }
      return <InfoDataEdit {...prop} />;
    } else {
      return '';
    }
  };

  renderOptions = () => {
    const { kinds, showKinds } = this.props;
    let options = defaultTypes;
    if (kinds && kinds.length > 0) {
      options = options.filter(item => {
        for (const t of kinds) {
          if (t.kind === item.kind) {
            return true;
          }
        }
        return false;
      });
      options = options.map(item => {
        for (const t of kinds) {
          if (t instanceof Object) {
            if (t.kind === item.kind) {
              return { ...item, ...t };
            }
          }
        }
        return item;
      });
    } else if (showKinds && showKinds.length > 0) {
      options = options.filter(item => {
        for (const t of showKinds) {
          if (t === item.kind) {
            return true;
          }
        }
        return false;
      });
    }

    return (
      <Menu onClick={this.handleMenuClick}>
        {options.map(item => {
          return <Menu.Item key={item.kind}>{item.name}</Menu.Item>;
        })}
      </Menu>
    );
  };

  renderButtonMode = () => {
    return (
      <span>
        <Button icon="plus" type="primary" onClick={this.onNewInfoStart}>
          新建
        </Button>
        {this.renderSelect()}
        {this.renderDataForm()}
      </span>
    );
  };

  public render() {
    const { mode } = this.props;
    if (mode === 'button') {
      return this.renderButtonMode();
    }
    return (
      <div style={{ padding: 0, margin: 0, display: 'inline' }}>
        <Dropdown overlay={this.renderOptions()}>
          <Button icon="plus" type="primary">
            新建
          </Button>
        </Dropdown>
        {this.renderDataForm()}
      </div>
    );
  }
}
