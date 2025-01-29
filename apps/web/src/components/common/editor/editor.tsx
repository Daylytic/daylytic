import { useState, useRef, useEffect } from "react";
import {
  AdmonitionDirectiveDescriptor,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  SandpackConfig,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import Paragraph from "antd/es/typography/Paragraph";
import { BoldItalicUnderlineToggles, StrikeThroughSupSubToggles } from "./bold-italic-underline-toggles";
import { UndoRedo } from "./undo-redo";
import { Divider } from "antd";
import { BlockTypeSelect } from "./block-type-select";
import { CreateLink } from "./create-link";
import { InsertTable } from "./insert-table";
import { InsertThematicBreak } from "./insert-thematic-break";
import { CodeToggle } from "./code-toggle";
import { InsertCodeBlock } from "./insert-code-block";
import { InsertSandpack } from "./insert-sandpack";
import "assets/styles/mdx.css";
import { InsertAdmonition } from "./insert-admonition";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    }
  ]
}

const Editor = () => {
  return (
    <MDXEditor
      markdown="Hello world"
      className="global-mdx-theme" 
      contentEditableClassName="content-editable"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),
        toolbarPlugin({
          toolbarClassName: "toolbar-wrapper",
          toolbarContents: () => (
            <div className="toolbar-content">
              <UndoRedo />
              <Divider type="vertical" />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Divider type="vertical" />
              <StrikeThroughSupSubToggles />
              <Divider type="vertical" />
              <BlockTypeSelect />
              <Divider type="vertical" />
              <CreateLink />
              <InsertTable />
              <InsertThematicBreak />
              <Divider type="vertical" />
              <InsertCodeBlock />
              <InsertSandpack />
              <Divider type="vertical" />
              <InsertAdmonition />
            </div>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
