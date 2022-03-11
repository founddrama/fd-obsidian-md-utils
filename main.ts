import { Editor, MarkdownView, Plugin } from 'obsidian';

const SINGLE_SMART_QUOTE_RX = /[‘’]/g;
const SINGLE_DUMB_QUOTE = "'";
const DOUBLE_SMART_QUOTE_RX = /[“”]/g;
const DOUBLE_DUMB_QUOTE = '"';
const BEAR_HIGHLIGHTED_COLON_RX = /:::/g;
const BEAR_HIGHLIGHT_RX = /::/g;
const OBSIDIAN_HIGHLIGHT = '==';
const BEAR_UNDERLINE_RX = /(?<!~)~(?!~)([^~]+)(?<!~)~(?!~)/g;
const REPLACE_WITH_BOLD = '**$1**';
const REPLACE_WITH_ITALIC = '_$1_';

export default class FDMarkdownUtilsPlugin extends Plugin {
  replaceWith(editor: Editor, seekRx: RegExp, replacer: string): void {
    if (editor.somethingSelected()) {
      editor.replaceSelection(editor.getSelection().replace(seekRx, replacer));
    } else {
      editor.setValue(editor.getValue().replace(seekRx, replacer));
    }
  }

  async onload() {
    this.addCommand({
      id: 'fd-md-utils-single-quotes-command',
      name: 'Make single quotes dumb',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-double-quotes-command',
      name: 'Make double quotes dumb',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-all-quotes-command',
      name: 'Make all quotes dumb',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, SINGLE_SMART_QUOTE_RX, SINGLE_DUMB_QUOTE);
        this.replaceWith(editor, DOUBLE_SMART_QUOTE_RX, DOUBLE_DUMB_QUOTE);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-bear-highlights-command',
      name: 'Fix Bear highlights',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, BEAR_HIGHLIGHTED_COLON_RX, `:${OBSIDIAN_HIGHLIGHT}`);
        this.replaceWith(editor, BEAR_HIGHLIGHT_RX, OBSIDIAN_HIGHLIGHT);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-bear-underlines-to-bold-command',
      name: 'Make Bear underlines into bold',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, BEAR_UNDERLINE_RX, REPLACE_WITH_BOLD);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-bear-underlines-to-italic-command',
      name: 'Make Bear underlines into italic',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        this.replaceWith(editor, BEAR_UNDERLINE_RX, REPLACE_WITH_ITALIC);
      }
    });

    this.addCommand({
      id: 'fd-md-utils-insert-shortdate',
      name: 'Insert short date',
      editorCallback: (editor: Editor, _view: MarkdownView) => {
        editor.replaceRange(
          Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date()),
          editor.getCursor()
        );
      }
    });
  }

  onunload() {}
}
