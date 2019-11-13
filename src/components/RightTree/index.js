import React, { PureComponent } from 'react';
import { Tree } from 'antd';

import * as builingService from '@/services/building';

import styles from './index.less';

const { TreeNode } = Tree;

/**
 * 区域树形列表 - 动态加载下级数据
 */
export default class RightTree extends PureComponent {
  state = {
    treeData: [],
  };

  // 最后一级的类别码
  finalType = 50;

  componentWillMount() {
    builingService.HouseQuery({ q: 'list', btype: 90 }).then(data => {
      const list = data.list ? data.list : [];
      const treeData = [];
      list.forEach(item => {
        treeData.push({
          title: item.code,
          key: item.record_id,
        });
      });
      this.setState({ treeData });
    });
  }

  /**
   * 加载下级数据
   * @param treeNode 当前的节点
   * @returns {Promise<any>}
   */
  onLoadData = treeNode =>
    new Promise(resolve => {
      const {
        props: { eventKey },
      } = treeNode;
      builingService.HouseQuery({ q: 'list', parent_id: eventKey }).then(data => {
        const children = [];
        const list = data.list ? data.list : [];
        list.forEach(item => {
          children.push({
            title: item.code,
            key: item.record_id,
            type: item.btype,
            isLeaf: item.btype === this.finalType, // 最后一级不可以继续展开
          });
        });
        // 为当前节点设置下级数据
        treeNode.props.dataRef.children = children;
        const { treeData } = this.state;
        this.setState({
          treeData: [...treeData],
        });
        resolve();
      });
    });

  /**
   * 返回指定节点的完整路径
   * @param data treeData
   * @param pos [0,1,2.3,4,5] 位置
   */
  nodePath = (data, pos) => {
    let nodes = [];
    const index = pos.shift();
    const node = data[index];
    nodes = [...nodes, { title: node.title, key: node.key, type: node.type }];
    if (pos.length > 0) {
      const child = this.nodePath(node.children, pos);
      nodes = [...nodes, ...child];
    }
    return nodes;
  };

  /**
   * 节点选中或取消选中后触发
   * @param keys
   * @param event
   */
  onSelect = (keys, event) => {
    const { onSelect } = this.props;
    const { treeData } = this.state;
    if (keys.length && keys.length > 0) {
      const {
        node: {
          props: { pos, dataRef },
        },
      } = event;
      const path = pos.split('-');
      path.shift();
      const nodePath = path.length > 0 ? this.nodePath(treeData, path) : null;
      if (onSelect) {
        // 当前节点 , 当前节点的完整路径
        onSelect(dataRef, nodePath);
      }
    } else {
      onSelect(null, null);
    }
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });

  /**
   * 鼠标响应右键点击
   * @param event
   * @param node
   */
  onRightClick = ({ node }) => {
    // this.getMousePos();
    const isLeaf = node.props.isLeaf;
    if (isLeaf) {
      // var menu = document.querySelector('#menu');
      //根据事件对象中鼠标点击的位置，进行定位
      // menu.style.left = this.getMousePos().x - 200 + 'px';
      // menu.style.top = this.getMousePos().y - 350 + 'px';
      //改变自定义菜单的宽，让它显示出来
      // menu.style.width = '125px';
    }
  };
  // getMousePos(event) {
  //   var e = event || window.event;
  //   var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
  //   var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  //   var x = e.pageX || e.clientX + scrollX;
  //   var y = e.pageY || e.clientY + scrollY;
  //   //alert('x: ' + x + '\ny: ' + y);
  //   return { x: x, y: y };
  // }

  render() {
    return (
      <div>
        <div className={styles.zoneTree}>
          <Tree
            onSelect={this.onSelect}
            loadData={this.onLoadData}
            onRightClick={this.onRightClick}
          >
            {this.renderTreeNodes(this.state.treeData)}
          </Tree>
        </div>
        <div id="menu" className={styles.menuCon}>
          <div className={styles.menu}>功能1</div>
          <div className={styles.menu}>功能2</div>
          <div className={styles.menu}>功能3</div>
          <div className={styles.menu}>功能4</div>
          <div className={styles.menu}>功能5</div>
        </div>
      </div>
    );
  }
}
