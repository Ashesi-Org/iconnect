import React from 'react';
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'

const ComplaintsContent = ({ chapterData, pageSize }) => {
  return (
    <div className='flex flex-shrink-0 flex-col gap-2 p-5'>
      <div className="grid gap-4 flex-shrink-0 pb-5 w-full rounded-xl">
        {chapterData[0]?.chapters?.map((chapter) => (
          chapter.units.map((unit) => (
            <div key={unit.id} className="text-app-white bg-app-background-2 p-5 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold">Unit {unit.id}: {unit.name}</h4>
              <p className="text-gray-400 mt-2">{unit.content}</p>

              {unit.examples && unit.examples.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-md font-semibold">Examples:</h5>
                  <ul className="list-disc list-inside text-gray-500">
                    {unit.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-row justify-between items-center">
              <div className="w-[180px] h-[30px] bg-[#00000060] font-medium text-[14px] rounded-lg text-gray-200 dark:text-[#ffffff90]  flex justify-center items-center">
                  <div> 12:30 on Nov 2</div>
              </div>
              <div className="flex flex-row justify-betwee gap-5">
                  <Link to={'/edit-complaint'} className="flex flex-row items-center font-medium">
                      <Pencil  size={20} color='#215B90' />
                  </Link>
                  <Link to={'/complaints'} className="flex flex-row items-center">
                      <Trash2 size={20} color='#A82F2F'/>
                  </Link>
              </div>
          </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default ComplaintsContent;
