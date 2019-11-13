/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Input, Radio, Checkbox } from 'antd';
// import { DragSource } from 'react-dnd';
import style from './style.less';

export default class SurveyShowCard extends Component {
  state = {
    questions: [
      {
        ind: 1,
        title: '',
        kind: 1,
        options: [{ ind: 1, title: '', write: 0 }],
      },
    ],
  };

  result = {};

  constructor(props) {
    super(props);
    const { questions } = props;
    const state = {};
    if (questions && Array.isArray(questions) && questions.length > 0) {
      state.questions = [...questions];
      const [i0] = questions;
      state.currentItem = i0;
      state.current = 1;
      this.state = state;
    } else {
      this.state = {
        questions: [],
      };
    }
  }

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('questions' in nextProps) {
      const { questions } = nextProps;
      if (questions && Array.isArray(questions) && questions.length > 0) {
        return { questions };
      }
    }
    return null;
  }

  onChange = (questionInd, value) => {
    if (!this.result.answers) {
      this.result.answers = {};
    }
    if (!this.result.answers[questionInd]) {
      this.result.answers[questionInd] = {};
    }
    if (Array.isArray(value)) {
      const a = {};

      for (const v of value) {
        a[v] = '';
      }
      this.result.answers[questionInd].options = a;
    } else {
      const b = {};
      b[value] = '';
      this.result.answers[questionInd].options = b;
    }
    this.triggerChanage();
  };

  onChangeRemark = (questionInd, optionsInd, value) => {
    this.result.answers[questionInd].options[optionsInd] = value;
    this.triggerChanage();
  };

  onChangeAnswerRequest = (questionInd, value) => {
    this.result.answers[questionInd] = { remark: value };
    this.triggerChanage();
  };

  triggerChanage = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.result);
    }
  };

  renderSelect = (ind, kind, options) => {
    const Group = kind === 1 ? Radio.Group : Checkbox.Group;
    return (
      <Group
        className="sqo_group"
        onChange={e => this.onChange(ind, kind === 1 ? e.target.value : kind === 2 ? e : e)}
      >
        {options.map(item => {
          return (
            <li key={`li${ind}_${item.ind}`}>
              <label className="sqo">
                {kind === 1 && <Radio value={item.ind} />}
                {kind === 2 && <Checkbox value={item.ind} className="sqo_checkbox" />}
                <span className="sqo_title">{item.title}</span>
                {item.write === 1 && (
                  <Input
                    className="sqo_input"
                    onChange={e => this.onChangeRemark(ind, item.ind, e.target.value)}
                  />
                )}
              </label>
            </li>
          );
        })}
      </Group>
    );
  };

  renderItem = item => {
    return (
      <fieldset className="s_question" key={item.ind}>
        <legend>
          <span className="sq_req">{item.req === 1 && '*'}</span>
          <span className="sq_xh">{item.ind}.</span>
          <span className="sq_title">{item.title}</span>
        </legend>
        <div className="sq_options">
          {item.kind === 3 && (
            <Input.TextArea
              placeholder={item.answerRequest}
              title={item.answerRequest}
              onChange={e => this.onChangeAnswerRequest(item.ind, e.target.value)}
            />
          )}
          {item.kind !== 3 && (
            <ul>
              {item.kind === 1 && this.renderSelect(item.ind, item.kind, item.options)}
              {item.kind === 2 && this.renderSelect(item.ind, item.kind, item.options)}
            </ul>
          )}
        </div>
      </fieldset>
    );
  };

  render() {
    const { questions } = this.state;
    return (
      <div className={style.show}>
        {questions.map(item => {
          return this.renderItem(item);
        })}
      </div>
    );
  }
}
