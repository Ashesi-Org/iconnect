import React, { useState, useRef } from 'react';
import MdEditor from '@uiw/react-md-editor';
import { Resizable } from 'react-resizable';
import '@uiw/react-md-editor/markdown-editor.css';
import 'react-resizable/css/styles.css';
import { useReactToPrint } from 'react-to-print';

const A4Preview = ({ content }) => {
  const componentRef = useRef();

  return (
    <div ref={componentRef} style={{ width: '210mm', backgroundColor: 'white' }}>
      {/* Your content goes here */}
      <MdEditor.Markdown className="text-black bg-white" source={content} />
    </div>
  );
};

const MarkdownEditor = () => {
  const [value, setValue] = useState('');
  const [width, setWidth] = useState(500); // Initial width for resizable components
  const componentRef = useRef();

  const handleResize = (e, { size }) => {
    setWidth(size.width);
  };

  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className=" gap-2 flex pt-5 p-4" data-color-mode="light">
      {/* EDITOR */}
      <Resizable
        className="border border-gray-300 rounded-md"
        width={width}
        height={400}
        onResize={handleResize}
        draggableOpts={{ enableUserSelectHack: true }}
      >
        <MdEditor
          value={value}
          onChange={handleEditorChange}
          className="w-2/3 "
          theme="light"
     
        />
      </Resizable>

      {/* EDITOR PREVIEW */}
      <div style={{ width: `calc(100% - ${width}px)` }} className="border border-gray-300 rounded-md p-10 overflow-auto bg-slate-50 flex ">
        <A4Preview content={value} ref={componentRef} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
