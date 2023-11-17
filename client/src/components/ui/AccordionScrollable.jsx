import React from "react";
import { AccordionPreview } from "./AccordionPreview";

export const AccordionScrollable = ({ accordionContent, stickyHeader }) => {
  return (
    <>
      <div className="pr-5 pl-5 bg-app-background-2 w-full min-h-screen overflow-y-auto flex flex-col items-center">
        <div className="w-full flex items-center justify-center py-4">
          {stickyHeader}
        </div>
        <div
          style={{
            height: "calc(100vh - 154px)",
          }}
          className="space-y-2 w-full overflow-y-auto "
        >
          {accordionContent?.map((chapter) => (
            
            <AccordionPreview
              key={chapter.id}
              id={chapter.id}
              title={chapter.name}
              subContent={chapter.units}
            />
          ))}
        </div>
      </div>
    </>
  );
};
