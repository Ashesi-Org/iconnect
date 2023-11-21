import React from "react";
import useScreenType from "../../hooks/useScreenType";


const VoiceRoomsLayout = ({ navbar, column1, column2, footer }) => {

  const myDevice = useScreenType();
  return (
    <>
      
      {myDevice == "isDesktop" || myDevice == "isTablet" ? (
        <main className="w-screen h-screen bg-app_bg_deepest text-white font-display overflow-auto space-y-8 chat">
          {navbar}
          <div
            style={{
              width: myDevice == "isTablet" ? "90%" : "75%",
            }}
            className="m-auto space-y-16"
          >
            {myDevice == "isDesktop" ? (
              <div className="grid grid-cols-4 gap-x-52 w-full max-h-96 h-96">
                <div className="col-span-1 max-h-screen ">{column1}</div>
                <div className="col-span-3">{column2}</div>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-x-1 w-full max-h-96 h-96">
                <div className="col-span-1 max-h-screen ">{column1}</div>
                <div className="col-span-4">{column2}</div>
              </div>
            )}
          </div>
        </main>
      ) : (
        <>
          <main className="w-screen h-screen bg-app_bg_deepest text-white font-display overflow-auto space-y-8 chat">
            {navbar}
            <div
              style={{
                width: "90%",
              }}
              className="m-auto space-y-16"
            >
              <div className="grid grid-cols-5 gap-x-1 w-full max-h-96 h-96">
                <div className="col-span-5">{column2}</div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default VoiceRoomsLayout;