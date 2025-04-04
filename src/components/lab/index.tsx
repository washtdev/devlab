'use client';

import { createContext, RefObject, useRef, useState } from "react";
import { SourceBar } from "../sourcebar";
import { Viewport } from "../viewport";
import { Header } from "../header";

export type CodeContextType = {
  code: {
    htmlCode: string,
    cssCode: string,
    javascriptCode: string,
  };
  setCode: {
    setHtmlCode: (value: string) => void,
    setCssCode: (value: string) => void,
    setJavascriptCode: (value: string) => void,
  };
  editorSide: [string, (value: string) => void];
  divRef: RefObject<HTMLDivElement | null>;
};

export const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const Lab = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [javascriptCode, setJavascriptCode] = useState<string>("");

  const [editorSide, setEditorSide] = useState("left");

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <CodeContext.Provider value={{
      code: { htmlCode, cssCode, javascriptCode },
      setCode: { setHtmlCode, setCssCode, setJavascriptCode},
      editorSide: [editorSide, setEditorSide],
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
    </CodeContext.Provider>
  );
}