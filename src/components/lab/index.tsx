'use client';

import { createContext, useState } from "react";
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
};

export const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const Lab = () => {
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [cssCode, setCssCode] = useState<string>("");
  const [javascriptCode, setJavascriptCode] = useState<string>("");

  return (
    <CodeContext.Provider value={{
      code: { htmlCode, cssCode, javascriptCode },
      setCode: { setHtmlCode, setCssCode, setJavascriptCode}
    }}>
      <div className="h-full flex flex-row">
        <SourceBar />
        <Viewport />
      </div>
    </CodeContext.Provider>
  );
}