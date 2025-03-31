'use client';

import { createContext, RefObject, useRef, useState } from "react";
import { SourceBar } from "../sourcebar";
import { Viewport } from "../viewport";

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
  divRef: RefObject<HTMLDivElement | null>;
};

export const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const Lab = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [javascriptCode, setJavascriptCode] = useState<string>("");

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <CodeContext.Provider value={{
      code: { htmlCode, cssCode, javascriptCode },
      setCode: { setHtmlCode, setCssCode, setJavascriptCode},
      divRef,
    }}>
      <div className="h-full flex flex-row">
        <SourceBar />
        <div className="relative w-full h-full">
          <Viewport />
          <div ref={divRef} className="absolute left-0 top-0 w-full h-full -z-1"></div>
        </div>
      </div>
    </CodeContext.Provider>
  );
}