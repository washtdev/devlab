'use client';

import { useState, MouseEvent, useContext, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubLight } from "@uiw/codemirror-theme-github";
import { EditorView } from "@uiw/react-codemirror";
import colors from "tailwindcss/colors";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { CodeContext, CodeContextType } from "../lab";

const customTheme = EditorView.theme({
  "&": { outline: "none" },
  "&.cm-focused": { outline: "none" },
  ".cm-activeLine": { backgroundColor: colors.transparent },
  ".cm-gutters": { border: "none", fontSize: "18px" },
  ".cm-activeLineGutter": { backgroundColor: colors.gray[100] },
  ".cm-lineNumbers .cm-gutterElement": { width: "50px" },
  ".cm-foldGutter .cm-gutterElement": { width: "13px" }
});

export const SourceBar = () => {
  const [width, setWidth] = useState(400);
  const isResizing = useRef(false);

  const codeContext = useContext(CodeContext)as CodeContextType;
  const { htmlCode, cssCode, javascriptCode } = codeContext.code;
  const { setHtmlCode, setCssCode, setJavascriptCode } = codeContext.setCode;
  const { divRef } = codeContext;

  const resize = (e: MouseEvent) => {
    if (!isResizing.current) return;
    setWidth((prevWidth) => Math.max(150, prevWidth + e.movementX));
  }

  const startResizing = (e: MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    divRef.current?.classList.toggle('-z-1');
    document.body.classList.toggle('cursor-w-resize');

    document.addEventListener('mousemove', resize as () => void);
    document.addEventListener('mouseup', stopResizing);
  };

  const stopResizing = () => {
    isResizing.current = false;
    divRef.current?.classList.toggle('-z-1');
    document.body.classList.toggle('cursor-w-resize');
    document.removeEventListener('mousemove', resize as () => void);
    document.removeEventListener('mouseup', stopResizing);
  }

  let htmlTimeoutId: NodeJS.Timeout | null = null;

  const changeHtmlCode = (newCode: string) => {
    if (htmlTimeoutId) clearTimeout(htmlTimeoutId);
    htmlTimeoutId = setTimeout(() => setHtmlCode(newCode), 1000);
  }

  let cssTimeoutId: NodeJS.Timeout | null = null;

  const changeCssCode = (newCode: string) => {
    if (cssTimeoutId) clearTimeout(cssTimeoutId);
    cssTimeoutId = setTimeout(() => setCssCode(newCode), 1000);
  }

  let javascriptTimeoutId: NodeJS.Timeout | null = null;

  const changeJavascriptCode = (newCode: string) => {
    if (javascriptTimeoutId) clearTimeout(javascriptTimeoutId);
    javascriptTimeoutId = setTimeout(() => setJavascriptCode(newCode), 1000);
  }

  return (
    <aside
      style={{width}}
      className="bg-gray-200 p-2 pr-3 relative resize-y"
    >
      <div className="h-full flex flex-col gap-2">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white w-fit px-4 py-1">
            <h2 className="font-sans text-xl">HTML</h2>
          </div>
          <div className="flex-1 max-w-full max-h-full overflow-hidden">
            <CodeMirror
              value={htmlCode}
              theme={githubLight}
              extensions={[html(), customTheme, EditorView.lineWrapping]}
              onChange={changeHtmlCode}
              className="text-[18px] h-full"
              height="100%"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white w-fit px-4 py-1">
            <h2 className="font-sans text-xl">CSS</h2>
          </div>
          <div className="flex-1 max-w-full max-h-full overflow-hidden">
            <CodeMirror
              value={cssCode}
              theme={githubLight}
              extensions={[css(), customTheme, EditorView.lineWrapping]}
              onChange={changeCssCode}
              className="text-[18px] h-full"
              height="100%"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-white w-fit px-4 py-1">
            <h2 className="font-sans text-xl">Javascript</h2>
          </div>
          <div className="flex-1 max-w-full max-h-full overflow-hidden">
            <CodeMirror
              value={javascriptCode}
              theme={githubLight}
              extensions={[javascript(), customTheme, EditorView.lineWrapping]}
              onChange={changeJavascriptCode}
              className="text-[18px] h-full"
              height="100%"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 w-1 bg-gray-300 cursor-w-resize"
        onMouseDown={startResizing}
      ></div>
    </aside>
  );
};
