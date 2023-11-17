
export const ContentScrollable = ({ nav1, content}) => {
  return (
    <>
      <div className="w-full min-h-screen overflow-y-auto flex flex-col items-center">
        <div className="w-full flex items-center justify-center">
          {nav1}
        </div>
        <div
          style={{
            height: "calc(100vh - 150px)",
          }}
          className="space-y-2 w-full overflow-y-auto "
        >
          {content}
        </div>
      </div>
    </>
  );
};
