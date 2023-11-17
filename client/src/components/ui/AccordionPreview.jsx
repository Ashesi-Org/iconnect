import React, { useState } from "react";

export const AccordionPreview = ({ id, title, subContent }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      key={id}
      onClick={() => setChecked(!checked)}
      className="collapse collapse-arrow bg-app-background-1 shadow-none cursor-pointer rounded-md"
    >
      <input type="radio" name="my-accordion-2" checked={checked} />
      <div className="collapse-title text-[14px] font-semibold">{title}</div>
      <div className="collapse-content flex flex-col gap-2 ">
        {subContent.map((unit, index) => (
          <div key={unit.id} className="border-b-2 border-app-background-2 p-2" >
            <p className="text-sm  font-light">{unit.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
