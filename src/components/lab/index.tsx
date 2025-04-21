'use client';

import { createContext, RefObject, useEffect, useRef, useState } from "react";
import { SourceBar } from "../sourcebar";
import { Viewport } from "../viewport";
import { Header } from "../header";
import { Modal, useModal } from "../modal";
import ReactCodeMirror, { EditorView, ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { githubLight } from "@uiw/codemirror-theme-github";
import { html } from "@codemirror/lang-html";
import colors from "tailwindcss/colors";
import { toast, ToastContainer } from "react-toastify";

export type CodeContextType = {
  code: {
    templateCode: string,
    htmlCode: string,
    cssCode: string,
    javascriptCode: string,
  };
  setCode: {
    setTemplateCode: (value: string) => void,
    setHtmlCode: (value: string) => void,
    setCssCode: (value: string) => void,
    setJavascriptCode: (value: string) => void,
  };
  editorSide: [string, (value: string) => void];
  autoReload: [boolean, (value: boolean) => void];
  reloadTime: [number, (value: number) => void];
  lineWrapping: [boolean, (value: boolean) => void];
  tabSize: [number, (value: number) => void];
  openModal: [boolean, () => void];
  runCodeRef: RefObject<CustomEvent | null>;
  divRef: RefObject<HTMLDivElement | null>;
};

export const CodeContext = createContext<CodeContextType | undefined>(undefined);

const customTheme = EditorView.theme({
  "&": { outline: "none" },
  "&.cm-focused": { outline: "none" },
  ".cm-activeLine": { backgroundColor: colors.transparent },
  ".cm-gutters": { border: "none", fontSize: "14px" },
  ".cm-activeLineGutter": { backgroundColor: colors.gray[100] },
  ".cm-lineNumbers .cm-gutterElement": { width: "30px" },
  ".cm-foldGutter .cm-gutterElement": { width: "8px" }
});

export const Lab = () => {
  const [templateCode, setTemplateCode] = useState<string>(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Project Name</title>
    <style>
      {{css}}
    </style>
  </head>

  <body>
    {{html}}
    <script>
      {{js}}
    </script>
  </body>
</html>`);
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [javascriptCode, setJavascriptCode] = useState<string>("");

  const [isOpenModal, toggleModal] = useModal();

  const [editorSide, setEditorSide] = useState("left");
  const [autoReload, setAutoReload] = useState(true);
  const [reloadTime, setReloadTime] = useState(3);
  const [lineWrapping, setLineWrapping] = useState(true);
  const [tabSize, setTabSize] = useState(2);

  const editorRef = useRef<ReactCodeMirrorRef>(null);
  const reloadTimeRef = useRef<HTMLInputElement>(null);
  const runCodeRef = useRef<CustomEvent>(null);
  const autoReloadRef = useRef<HTMLInputElement>(null);
  const lineWrappingRef = useRef<HTMLInputElement>(null);
  const tabSizeRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const saveSettings = () => {
    setTemplateCode(editorRef.current?.view?.state.doc.toString() as string);
    setReloadTime(parseInt(reloadTimeRef.current?.value as string));
    setAutoReload(autoReloadRef.current?.checked as boolean);
    setLineWrapping(lineWrappingRef.current?.checked as boolean);
    setTabSize(parseInt(tabSizeRef.current?.value as string));
    toast.success("The changes have been successfully saved!");
  }

  useEffect(() => {
    runCodeRef.current = new CustomEvent("run code");
  }, []);

  return (
    <CodeContext.Provider value={{
      code: { templateCode, htmlCode, cssCode, javascriptCode },
      setCode: { setTemplateCode, setHtmlCode, setCssCode, setJavascriptCode},
      editorSide: [editorSide, setEditorSide],
      autoReload: [autoReload, setAutoReload],
      reloadTime: [reloadTime, setReloadTime],
      lineWrapping: [lineWrapping, setLineWrapping],
      tabSize: [tabSize, setTabSize],
      openModal: [isOpenModal, toggleModal],
      runCodeRef,
      divRef,
    }}>
      <Header />
      <main className="h-full max-h-full overflow-hidden">
        <div className={`h-full flex flex-row ${editorSide === "right" ? "flex-row-reverse" : "flex-row"}`}>
          <SourceBar />
          <div className="relative w-full h-full">
            <Viewport />
            <div ref={divRef} className="absolute left-0 top-0 w-full h-full -z-1"></div>
          </div>
        </div>
      </main>
      <Modal
        title="General Settings"
        isOpen={isOpenModal}
        toggle={toggleModal}
      >
        <div className="flex flex-col">
          <div className="h-140 overflow-y-auto">
            <div>
              <h2>Template:</h2>
              <div className="p-2 aspect-video">
                <ReactCodeMirror
                  ref={editorRef}
                  value={templateCode}
                  theme={githubLight}
                  extensions={[html(), customTheme, EditorView.lineWrapping]}
                  className="text-[14px] w-full h-full"
                  height="100%"
                />
              </div>
            </div>

            <div>
              <h2>Reload Settings:</h2>
              <div className="p-3">
                <div className="py-1.5">
                  <input
                    ref={autoReloadRef}
                    type="checkbox"
                    id="autoreload"
                    defaultChecked={autoReload}
                    className="mr-2"
                  />
                  <label htmlFor="autoreload">Auto Reload</label>
                </div>

                <div className="py-1.5">
                  <label htmlFor="reloadtime">Reload Time: </label>
                  <input
                    type="number"
                    defaultValue={reloadTime}
                    className="border-b-1 outline-none ml-3"
                    id="reloadtime"
                    ref={reloadTimeRef}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2>Editor Settings:</h2>
              <div className="p-3">
                <div className="py-1.5">
                  <input
                    ref={lineWrappingRef}
                    type="checkbox"
                    id="linewrapping"
                    defaultChecked={lineWrapping}
                    className="mr-2"
                  />
                  <label htmlFor="linewrapping">Line Wrapping</label>
                </div>

                <div className="py-1.5">
                  <label htmlFor="tabsize">Tab Size: </label>
                  <input
                    type="number"
                    defaultValue={tabSize}
                    className="border-b-1 outline-none ml-3"
                    id="tabsize"
                    ref={tabSizeRef}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => saveSettings()}
            className="self-end px-5 py-2 bg-gray-500 rounded-md text-white cursor-pointer">
            Save
          </button>
          <ToastContainer />
        </div>
      </Modal>
    </CodeContext.Provider>
  );
}