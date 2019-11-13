import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

export default class SpecificationTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.data,
      bigImage: false,
      ShowUrl: null,
    };
  }

  shouBigImage(event) {
    this.setState({
      ShowUrl: event,
      bigImage: true,
    });
  }

  hideBigImage() {
    this.setState({
      bigImage: false,
    });
  }

  render() {
    const { dataSource } = this.state;
    const { sname } = this.props;

    const columns = [
      {
        title: sname,
        dataIndex: 'name',
      },
      {
        title: '价格(元)',
        dataIndex: 'price',
        width: '15%',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        width: '15%',
      },
      {
        title: '商品编码',
        dataIndex: 'goods_code',
        width: '20%',
      },
      {
        title: '规格图片',
        dataIndex: 'image',
        width: 112,
        render: dataIndex => (
          <div>
            {dataIndex && dataIndex.length > 0 ? (
              <div className={styles.divBox}>
                <img
                  src={dataIndex[0]}
                  className={styles.headImage}
                  onClick={() => this.shouBigImage(dataIndex[0])}
                  alt="图片"
                />
              </div>
            ) : null}
          </div>
        ),
      },
    ];
    return (
      <div>
        <div className={styles.tableList}>
          <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        {this.state.bigImage ? (
          <div className={styles.popoverbackdrop} onClick={() => this.hideBigImage()}>
            <img className={styles.imgresponsive} src={this.state.ShowUrl} alt="图片" />
          </div>
        ) : null}
      </div>
    );
  }
}
