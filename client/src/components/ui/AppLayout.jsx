import Header from "../header/Header";
import { useState } from "react";

export const AppLayout = ({ sidebar, column }) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [inbox, setInbox] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  return (
    <>
      <main className="w-screen h-screen bg-app_bg_deepest bg-app-background-1 fixed text-app-white font-body  space-y-8">
        <div className="w-screen overflow-x-hidden flex items-start">
          {sidebar}
          <div className="grid grid-col-2 w-full h-full overflow-hidden">
            <Header selectedLink={selectedLink} setSelectedLink={setSelectedLink} inbox={inbox} setInbox={setInbox} />
            <div className="col-span-8 py-20">{column}</div>
          </div>
        </div>
      </main>
    </>
  );
};
