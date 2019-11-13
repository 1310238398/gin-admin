import React, { Component } from 'react';
import XSS from 'xss';
import style from './style.less';

const options = {
  whiteList: {
    p: ['style', 'class'],
    h1: ['style', 'class'],
    h2: ['style', 'class'],
    h3: ['style', 'class'],
    h4: ['style', 'class'],
    h5: ['style', 'class'],
    h6: ['style', 'class'],
    em: ['style', 'class'],
    pre: ['style', 'class'],
    code: ['style', 'class'],
    blockquote: ['style', 'class'],
    i: ['style', 'class'],
    u: ['style', 'class'],
    strong: ['style', 'class'],
    b: ['style', 'class'],
    sub: ['style', 'class'],
    sup: ['style', 'class'],
    ul: ['style', 'class'],
    li: ['style', 'class'],
    span: ['style', 'class'],
    div: ['style', 'class'],
    a: ['style', 'class', 'href', 'target'],
    br: [],
    hr: ['style', 'class'],
    img: ['src', 'style', 'class', 'alt', 'height', 'weight'],
    video: ['src', 'style', 'class', 'alt', 'controls'],
  },
}; // 自定义规则
const infoxss = new XSS.FilterXSS(options);
function InfoFilterXss(content) {
  return infoxss.process(content);
}

const regex = /\[(f_[0-1][0-9]{2})]/g;
class ContentShow extends Component {
  ParseMyEmoji = content => {
    if (!content) return '';
    return content.replace(
      regex,
      `<img src="/chart-icon/$1.png" alt="$1" height="17" width="17" />`
    );
    // let result;
    // const out = [];
    // let start = 0;
    // let end = 0;
    // while ((result = regex.exec(content)) != null) {
    //   end = regex.lastIndex - result[0].length;
    //   out.push({ type: 'text', content: content.substring(start, end) });
    //   out.push({ type: 'emoji', content: result[1] });
    //   start = regex.lastIndex;
    // }
    // if (start < end) {
    //   out.push({ type: 'text', content: content.substring(start, end) });
    // }
    // if (start === 0) {
    //   out.push({ type: 'text', content });
    // }
    // return out.map(item => {
    //   if (item.type === 'text') {
    //     return (
    //       <span
    //         // eslint-disable-next-line react/no-danger
    //         dangerouslySetInnerHTML={{
    //           __html: item.content,
    //         }}
    //       />
    //     );
    //   }
    //   if (item.type === 'emoji') {
    //     return (
    //       <img className={style.emoji} src={`/chart-icon/${item.content}.png`} alt={item.content} />
    //     );
    //   }
    //   return <span />;
    // });
  };

  contentShow = (content, contentStyle, isXss, isHtml, isEmoji) => {
    //  eslint-disable-next-line react/no-danger
    if (!isHtml) {
      return (
        <div className={style.infoContent} style={contentStyle}>
          {content}
        </div>
      );
    }
    if (isXss) {
      content = InfoFilterXss(content);
    }
    if (isEmoji) {
      content = this.ParseMyEmoji(content);
    }
    // if (Array.isArray(content)) {
    //   return (
    //     <div className={style.infoContent} style={contentStyle}>
    //       {content}
    //     </div>
    //   );
    // }
    return (
      <div
        className={style.infoContent}
        style={contentStyle}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    );
  };

  render() {
    const { content, contentStyle, isXss, isHtml, isEmoji } = this.props;

    // return (
    //   <div
    //     className={style.infoContent}
    //      style={contentStyle}
    //     // eslint-disable-next-line react/no-danger
    //     dangerouslySetInnerHTML={{
    //       __html: content,
    //     }}
    //   />
    // );
    return this.contentShow(
      content,
      contentStyle,
      isXss === true || isXss === undefined,
      isHtml === true || isHtml === undefined,
      isEmoji === true || isEmoji === undefined
    );
  }
}

export { ContentShow };
