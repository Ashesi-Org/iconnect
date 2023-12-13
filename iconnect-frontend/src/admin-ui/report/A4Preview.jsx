


import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import MdEditor from '@uiw/react-md-editor';
import { useReactToPrint } from 'react-to-print';

const A4Preview = ({ content }) => {
  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  return (
    <div className="">
      <div className="max-w-3xl my-8 bg-white border border-gray-300 rounded-md " ref={contentRef}>
        <div className="print-content">
          <MdEditor.Markdown className="prose bg-white text-black" source={content} />
        </div>
        <div className='flex justify-end p-5 text-slate-500 gap-2 cursor-pointer'>
          <p onClick={handlePrint}>Download report</p>
          <Download width={20} height={20} onClick={handlePrint}/>
        </div>  
      </div>
    </div>
  );
};

export default A4Preview;
