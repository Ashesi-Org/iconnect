import { Info } from "lucide-react";

export const SubjectStatsPreview = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex space-x-4 items-end py-3">
        <div className="w-10 h-12 rounded-md">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF1MilNUb7qll0LG4bq6kJIHG1a5Fup8D_TgQgrsmxvg&s"
            className="rounded-md w-full h-full object-cover"
            alt="subject-stats"
          />
        </div>
        <div className="flex flex-col items-start  h-full">
          <span className="text-[14px] flex items-center space-x-3 font-semibold opacity-90">
            <span>Chemistry</span>
            <div className="cursor-pointer">
              <Info size={15} />
            </div>
          </span>
          <span className="flex items-center space-x-1.5 opacity-75">
            <span className="text-[10px]">40+ lessons</span>
            <span>•</span>
            <span className="text-[10px]"> 20 hours</span>
          </span>
        </div>
      </div>
      <div className="shadow-app_shadow cursor-pointer flex items-center justify-center py-2 px-2 rounded-md w-full bg-app-background-1">
        <span className="font-semibold cursor-pointer">Chapters</span>
      </div>
    </div>
  );
};
