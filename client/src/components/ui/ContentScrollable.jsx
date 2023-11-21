export const ContentScrollable = ({ nav1, content }) => {
  return (
    <>
      <style>
        {`
          .scroll-hide::-webkit-scrollbar {
            display: none;
          }

          .scroll-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .scroll-hide::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
      <div className="w-full min-h-screen overflow-y-auto scroll-smooth flex flex-col items-center scroll-hide">
        <div className="w-full flex items-center justify-center">{nav1}</div>
        <div
          style={{
            height: "calc(100vh - 150px)",
          }}
          className="space-y-2 w-full overflow-y-auto scroll-hide"
        >
          {content}
        </div>
      </div>
    </>
  );
};
