import React from "react";
import useScreenType from "../../hooks/useScreenType";

const VoiceRoomsLayout = ({ navbar, column1, footer }) => {
  const myDevice = useScreenType();

  return (
    <>
      {myDevice === "isDesktop" || myDevice === "isTablet" ? (
        <main className="w-screen h-screen bg-app-background-1 text-app-white font-display overflow-y-hidden space-y-8 chat">
          {navbar}
          <div
            style={{
              width: myDevice === "isTablet" ? "90%" : "75%",
            }}
            className="m-auto space-y-16"
          >
            {column1 && (
              <div className="max-h-screen">{column1}</div>
            )}
          </div>
        </main>
      ) : (
        <div className="flex">
          {navbar}
          <main className="w-screen h-screen bg-app-background-1 text-app-white font-display overflow-auto space-y-8">
            <div
              style={{
                width: "90%",
              }}
              className="m-auto space-y-16"
            >
              <div className="max-h-screen">{column1}</div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default VoiceRoomsLayout;
