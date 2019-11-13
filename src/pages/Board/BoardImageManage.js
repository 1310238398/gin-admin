import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Modal, Button, Icon } from 'antd';
import PicturesWall from '../../components/PicturesWall/PicturesWall';
@connect(state => ({
  boardManage: state.boardManage,
}))
export default class BoardImageManage extends PureComponent {
  constructor(props) {
    super(props);
    const icon = props.boardManage.orgdata.desc.icon ? props.boardManage.orgdata.desc.icon : [];
    this.state = {
      fileList: icon || [],
      previewVisible: false,
      previewImage: '',
      chg: false,
    };
    // this.fileList = icon || [];
  }

  componentDidUpdate(_prevProps, _prevState, snapshot) {
    if (snapshot !== null) {
      this.updateFileList(snapshot);
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.boardManage !== prevProps.boardManage) {
      if (!this.props.boardManage) {
        return [];
      }
      if (!prevProps.boardManage) {
        return this.props.boardManage;
      }
      const nicon = this.props.boardManage.orgdata.desc.icon || [];
      const nicons = nicon.join(',');
      const oicon = prevProps.boardManage.orgdata.desc.icon || [];
      const oicons = oicon.join(',');
      if (nicons !== oicons) return nicon;
    }
    return null;
  }

  onChangeFile = e => {
    this.setState({ fileList: [...e], chg: true });
  };

  onClickLeft = (item, index) => {
    const fileList = [...this.state.fileList];
    if (index === 0) {
      return;
    }
    const a = fileList[index - 1];
    fileList[index - 1] = item;
    fileList[index] = a;
    this.setState({ fileList: [...fileList], chg: true });
  };

  onClickRight = (item, index) => {
    const fileList = [...this.state.fileList];
    if (index === fileList.length - 1) {
      return;
    }
    const a = fileList[index + 1];
    fileList[index + 1] = item;
    fileList[index] = a;
    this.setState({ fileList: [...fileList], chg: true });
  };

  onClickDelete = (item, index) => {
    const fileList = this.state.fileList.filter((_item, i) => {
      return index !== i;
    });
    this.setState({ fileList: [...fileList], chg: true });
  };

  onClickView = item => {
    this.setState({ previewVisible: true, previewImage: item, chg: true });
  };

  onSave = () => {
    const { fileList } = this.state;
    this.setState({ chg: false });
    this.props.dispatch({
      type: 'boardManage/submitIcon',
      payload: { icon: fileList },
    });
  };

  // isChange = newflist => {
  //   if (!newflist !== !this.fileList) {
  //     return true;
  //   }
  //   if (!newflist) {
  //     // this.chg = false;
  //     return false;
  //   }
  //   if (newflist.lenth !== this.fileList.length) {
  //     return true;
  //   }
  //   const len = newflist.length;

  //   for (let i = 0; i < len; i += 1) {
  //     if (newflist[i] !== this.fileList[i]) {
  //       return true;
  //     }
  //   }
  //   // this.chg = false;
  //   return false;
  // };

  handleCancel = () => this.setState({ previewVisible: false });

  updateFileList(fileList) {
    this.setState({ fileList: [...fileList] });
  }

  renderList = () => {
    const { fileList } = this.state;
    const gridStyle = {
      width: '33%',
      textAlign: 'bottom',
    };
    const out = fileList.map((item, index) => {
      return (
        <Card.Grid key={`img_${item}`} style={gridStyle}>
          <Card
            style={{ maxHeight: '250px' }}
            cover={
              <div
                style={{
                  height: 200,
                  display: `flex`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}
              >
                <img alt={item} src={item} style={{ maxHeight: '200px', maxWidth: '100%' }} />
              </div>
            }
            actions={[
              <Icon type="left" onClick={() => this.onClickLeft(item, index)} />,
              <Icon type="delete" onClick={() => this.onClickDelete(item, index)} />,
              <Icon type="eye" onClick={() => this.onClickView(item, index)} />,
              <Icon type="right" onClick={() => this.onClickRight(item, index)} />,
            ]}
          />
        </Card.Grid>
      );
    });

    return <Card>{out}</Card>;
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { submitting } = this.props;
    const saveDisabled = !this.state.chg;

    return (
      <Card
        title={
          <PicturesWall
            bucket="cms"
            name="data"
            num={9}
            listType="text"
            accept="image/*"
            showUploadList={false}
            onChange={this.onChangeFile}
            value={fileList}
          />
        }
        extra={
          <Button loading={submitting} onClick={this.onSave} disabled={saveDisabled} type="primary">
            <Icon type="save" />
            保存
          </Button>
        }
      >
        {this.renderList()}
        <Modal visible={previewVisible} onCancel={this.handleCancel} foot={null}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Card>
    );
  }
}
