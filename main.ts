import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

const SINGLE_SMART_QUOTE_RX = /[‘’]/g;
const SINGLE_DUMB_QUOTE = "'";
const DOUBLE_SMART_QUOTE_RX = /[“”]/g;
const DOUBLE_DUMB_QUOTE = '"';

export default class FDMarkdownUtilsPlugin extends Plugin {
  async onload() {
    this.addCommand({
      id: 'fd-md-utils-single-quotes-command',
      name: 'Make single quotes dumb',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        if (editor.somethingSelected()) {
          editor.replaceSelection(
            editor.getSelection()
              .replace(SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE)
          );
        } else {
          editor.setValue(
            editor.getValue()
              .replace(SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE)
          );
        }
      }
    });

    this.addCommand({
      id: 'fd-md-utils-double-quotes-command',
      name: 'Make double quotes dumb',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        if (editor.somethingSelected()) {
          editor.replaceSelection(
            editor.getSelection()
              .replace(DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE)
          );
        } else {
          editor.setValue(
            editor.getValue()
              .replace(DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE)
          );
        }
      }
    });

    this.addCommand({
      id: 'fd-md-utils-all-quotes-command',
      name: 'Make all quotes dumb',
      editorCallback: (editor: Editor, view: MarkdownView) => {
        if (editor.somethingSelected()) {
          editor.replaceSelection(
            editor.getSelection()
              .replace(DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE)
              .replace(SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE)
          );
        } else {
          editor.setValue(
            editor.getValue()
              .replace(DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE)
              .replace(SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE)
          );
        }
      }
    });
  }

  onunload() {}
}
