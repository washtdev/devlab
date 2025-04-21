import { useContext } from "react";
import { CodeContext, CodeContextType } from "../lab";

export const Viewport = () => {
  const codeContext = useContext(CodeContext) as CodeContextType;
  const { templateCode, htmlCode, cssCode, javascriptCode } = codeContext.code;

  const code = templateCode
    .replace("{{html}}", htmlCode)
    .replace("{{css}}", cssCode)
    .replace("{{js}}", javascriptCode);
  
  return (
    <iframe
      srcDoc={code}
      width="100%"
      height="100%"
      className="w-full h-full"
      sandbox="allow-scripts allow-modals"
    >
    </iframe>
  );
}