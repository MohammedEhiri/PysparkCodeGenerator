import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeDisplay.css';

const CodeDisplay = ({ code, language = 'python' }) => {
  return (
    <div className="w-full overflow-x-auto scrollable-code">
      <SyntaxHighlighter 
        language={language} 
        style={tomorrow}
        customStyle={{
          backgroundColor: '#000',
          padding: '1em',
          borderRadius: '0.5em',
          fontSize: '1em',
          lineHeight: '1.5',
          whiteSpace: 'pre', // Preserve whitespace
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;