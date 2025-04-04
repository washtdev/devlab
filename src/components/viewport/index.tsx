import { useContext } from "react";
import { CodeContext, CodeContextType } from "../lab";

export const Viewport = () => {
  const codeContext = useContext(CodeContext) as CodeContextType;
  const { htmlCode, cssCode, javascriptCode } = codeContext.code;
  
  return (
    <iframe
      srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" value="width=device-width, initial-scale=1">
            <title>Project Name</title>
            <style>
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode}
            <script>
              ${javascriptCode}
            </script>
          </body>
        </html>
      `}
      width="100%"
      height="100%"
      className="w-full h-full"
      sandbox="allow-scripts allow-modals"
    >
    </iframe>
  );
}