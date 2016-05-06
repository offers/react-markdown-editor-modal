import React, { Component } from 'react';
import { render } from 'react-dom';
import MarkdownEditorModal from 'react-markdown-editor-modal';
import fileContent from './lorum-ipsum.md';

class Example extends Component {

  constructor (props) {
    super(props);
    this.state = {
      content: fileContent
    };
  }

  render () {
    const { content } = this.state;

    const textareaOptions = {
      id: 'textarea',
      value: content,
      rows: 25,
      style: {
        width: '500px'
      },
      onChange: (e) => this.setState({content: e.target.value})
    };

    return (
      <div>
        <label for='textarea'>
          Label for Textarea
          | <MarkdownEditorModal initialValue={content} onSave={value => this.setState({content: value})}/>
        </label>
        <br />
        <textarea {...textareaOptions} />
      </div>
    );
  }
}

render(<Example />, document.querySelector('#mount'));