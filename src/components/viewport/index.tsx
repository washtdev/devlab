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
            <title>My Page</title>
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
      className="w-full h-full"
    >
    </iframe>
  );
}