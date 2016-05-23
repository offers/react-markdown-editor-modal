import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import RichTextEditor from 'react-rte';
import styles from './styles.css';

export default class MarkdownEditorModal extends Component {

  constructor (props) {
    super(props);
    const initialValue = RichTextEditor.createValueFromString(this.props.initialValue, 'markdown');
    this.state = {
      isEditorOpen: false,
      initialValue,
      editorValue: initialValue
    };
  }

  render () {

    const openEditor = (e) => {
      e.preventDefault();
      this.setState({isEditorOpen: true, editorValue: this.state.initialValue});
    };

    const saveAndCloseEditor = (e) => {
      const value = this.state.editorValue.toString('markdown');
      this.props.onSave(value);
      this.setState({isEditorOpen: false, initialValue: this.state.editorValue});
    };

    const cancelEditor = (e) => {
      this.setState({isEditorOpen: false});
    };

    const onChange = (editorValue) => {
      this.setState({editorValue});
    };

    const onChangeSource = (e) => {
      console.log('changing source');
      let source = e.target.value;
      let oldEditorValue = this.state.editorValue;
      this.setState({
        editorValue: oldEditorValue.setContentFromString(source, 'markdown')
      });
    };

    return (
      <span>
        <a href='#' onClick={openEditor} ref='foo'>Editor</a> | Preview
        <Modal isOpen={this.state.isEditorOpen}>
          <div className={styles.container}>
            <div className={styles.editorColumn}>
              <textarea
                className={styles.markdownEditor}
                value={this.state.editorValue.toString('markdown')}
                onChange={onChangeSource}
              />
            </div>
            <div className={styles.editorColumn}>
              <RichTextEditor
                className={styles.richTextEditor}
                toolbarClassName={styles.toolbar}
                editorClassName={styles.editor}
                value={this.state.editorValue}
                onChange={onChange}
              />
            </div>
          </div>
          <button onClick={saveAndCloseEditor}>Save And Close</button>
          <button onClick={cancelEditor}>Cancel</button>
        </Modal>
      </span>
    );
  }

}
