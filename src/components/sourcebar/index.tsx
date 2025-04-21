'use client';

import { useState, MouseEvent, useContext, useRef, useEffect } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { githubLight } from "@uiw/codemirror-theme-github";
import { EditorView } from "@uiw/react-codemirror";
import colors from "tailwindcss/colors";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { CodeContext, CodeContextType } from "../lab";
import { ArrowLeftRight, Braces, CodeXml, Eye, EyeOff, Layout } from "lucide-react";

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
  const [width, setWidth] = useState(450);
  const isResizing = useRef(false);

  const [isHtmlHidden, setHtmlHide] = useState(false);
  const [isCssHidden, setCssHide] = useState(false);
  const [isJavascriptHidden, setJavascriptHide] = useState(false);

  const codeContext = useContext(CodeContext)as CodeContextType;
  const { htmlCode, cssCode, javascriptCode } = codeContext.code;
  const { setHtmlCode, setCssCode, setJavascriptCode } = codeContext.setCode;
  const [editorSide, setEditorSide] = codeContext.editorSide;
  const reloadTime = codeContext.reloadTime[0];
  const { divRef } = codeContext;
  const autoReload = codeContext.autoReload[0];
  const lineWrapping = codeContext.lineWrapping[0];
  const tabSize = codeContext.tabSize[0];

  const htmlCodeRef = useRef<ReactCodeMirrorRef>(null);
  const cssCodeRef = useRef<ReactCodeMirrorRef>(null);
  const javascriptCodeRef = useRef<ReactCodeMirrorRef>(null);

  const htmlExtensions = [html(), customTheme];
  const cssExtensions = [css(), customTheme];
  const javascriptExtensions = [javascript(), customTheme];

  if(lineWrapping) {
    htmlExtensions.push(EditorView.lineWrapping);
    cssExtensions.push(EditorView.lineWrapping);
    javascriptExtensions.push(EditorView.lineWrapping);
  }

  const resize = (e: MouseEvent) => {
    if (!isResizing.current) return;
    setWidth((prevWidth) => Math.max(150,
      editorSide === "left" ?
        prevWidth + e.movementX :
        prevWidth - e.movementX)
    );
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
    if (!autoReload) return;
    if (htmlTimeoutId) clearTimeout(htmlTimeoutId);
    htmlTimeoutId = setTimeout(() => setHtmlCode(newCode), reloadTime * 1000);
  }

  let cssTimeoutId: NodeJS.Timeout | null = null;

  const changeCssCode = (newCode: string) => {
    if (!autoReload) return;
    if (cssTimeoutId) clearTimeout(cssTimeoutId);
    cssTimeoutId = setTimeout(() => setCssCode(newCode), reloadTime * 1000);
  }

  let javascriptTimeoutId: NodeJS.Timeout | null = null;

  const changeJavascriptCode = (newCode: string) => {
    if (!autoReload) return;
    if (javascriptTimeoutId) clearTimeout(javascriptTimeoutId);
    javascriptTimeoutId = setTimeout(() => setJavascriptCode(newCode), reloadTime * 1000);
  }

  useEffect(() => {
    document.addEventListener("run code", () => {
      setHtmlCode(htmlCodeRef.current?.view?.state.doc.toString() as string);
      setCssCode(cssCodeRef.current?.view?.state.doc.toString() as string);
      setJavascriptCode(javascriptCodeRef.current?.view?.state.doc.toString() as string);
    });
  }, []);

  return (
    <aside
      style={{width, maxWidth: width, minWidth: width}}
      className="bg-gray-200 p-2 pr-3 relative resize-y flex flex-col"
    >
      <button
        className={`p-1.5 ${editorSide === "left" ? "self-end" : "flex-start"} w-fit bg-gray-300 rounded-sm cursor-pointer mb-2`}
        onClick={() => setEditorSide(editorSide === "left" ? "right" : "left")}
      >
        <ArrowLeftRight size={20} className="text-gray-900" />
      </button>
      <div className="flex-1 flex flex-col gap-2">
        <div className={`${!isHtmlHidden && "flex-1"} flex flex-col overflow-hidden`}>
          <div className="bg-white w-fit px-4 py-1 flex items-center gap-2">
            <CodeXml size={20} className="text-orange-600" />
            <h2 className="font-sans text-xl text-gray-900">HTML5</h2>
            <button onClick={() => setHtmlHide(!isHtmlHidden)}>
              {!isHtmlHidden ?
                <Eye size={15} className="text-gray-900" /> :
                <EyeOff size={15} className="text-gray-900" />}
            </button>
          </div>
          <div className="flex-1 min-h-7 max-w-full max-h-full overflow-hidden bg-white">
            <CodeMirror
              ref={htmlCodeRef}
              value={htmlCode}
              theme={githubLight}
              extensions={htmlExtensions}
              basicSetup={{
                tabSize
              }}
              onChange={changeHtmlCode}
              className={`text-[18px] ${isHtmlHidden ? "h-0" : "h-full"}`}
              height="100%"
            />
          </div>
        </div>

        <div className={`${!isCssHidden && "flex-1"} flex flex-col overflow-hidden`}>
          <div className="bg-white w-fit px-4 py-1 flex items-center gap-2">
            <Layout size={20} className="text-purple-600" />
            <h2 className="font-sans text-xl text-gray-900">CSS</h2>
            <button onClick={() => setCssHide(!isCssHidden)}>
              {!isCssHidden ?
                <Eye size={15} className="text-gray-900" /> :
                <EyeOff size={15} className="text-gray-900" />}
            </button>
          </div>
          <div className="flex-1 min-h-7 max-w-full max-h-full overflow-hidden bg-white">
            <CodeMirror
              ref={cssCodeRef}
              value={cssCode}
              theme={githubLight}
              extensions={cssExtensions}
              basicSetup={{
                tabSize,
              }}
              onChange={changeCssCode}
              className={`text-[18px] ${isCssHidden ? "h-0" : "h-full"}`}
              height="100%"
            />
          </div>
        </div>

        <div className={`${!isJavascriptHidden && "flex-1"} flex flex-col overflow-hidden`}>
          <div className="bg-white w-fit px-4 py-1 flex items-center gap-2">
            <Braces size={20} className="text-yellow-600" />
            <h2 className="font-sans text-xl text-gray-900">JS</h2>
            <button onClick={() => setJavascriptHide(!isJavascriptHidden)}>
              {!isJavascriptHidden ?
                <Eye size={15} className="text-gray-900" /> :
                <EyeOff size={15} className="text-gray-900" />}
            </button>
          </div>
          <div className="flex-1 min-h-7 max-w-full max-h-full overflow-hidden bg-white">
            <CodeMirror
              ref={javascriptCodeRef}
              value={javascriptCode}
              theme={githubLight}
              extensions={javascriptExtensions}
              basicSetup={{
                tabSize
              }}
              onChange={changeJavascriptCode}
              className={`text-[18px] ${isJavascriptHidden ? "h-0" : "h-full"}`}
              height="100%"
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute top-0 ${
          editorSide === "right" ?
            "left" :
            "right"
        }-0 bottom-0 w-1 bg-gray-300 cursor-w-resize`}
        onMouseDown={startResizing}
      ></div>
    </aside>
  );
};
