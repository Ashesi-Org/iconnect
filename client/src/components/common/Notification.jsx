import React from "react";
import { Button } from "../ui/button";
import { useQueryClient } from "react-query";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";


const Notification = ({
  notificationId,
  category,
  content,
  roomId,
  isRead,
  createdAt,
}) => {
  const navigte = useNavigate();
  const queryClient = useQueryClient();

  return (
    <>
      <div className="flex items-start space-x-4 my-2">
        <div className=" flex items-start w-full space-x-3 cursor-pointer">
          {/* <div>
          {category == "info" ? (
            <BsInfoCircleFill size={25} />
          ) : (
            <MdCelebration size={25} />
          )}
        </div> */}
          <div className="flex flex-col items-start text-sm">
            <div className="w-full">{content}</div>
            {roomId && (
              <div className="my-2 space-x-2">
                <Button
                  onClick={async () => {
                    await api.delete(`/api/profile/notification/${notificationId}`);
                    await navigte(`/room/${roomId}`);
                  }}
                  className="p-2 h-auto bg-app_cta rounded-sm"
                >
                  Accept
                </Button>
                <Button
                  onClick={async () => {
                    await api.delete(`/api/profile/notification/${notificationId}`);
                    await queryClient.invalidateQueries(["notifications"]);
                  }}
                  className="p-2 h-auto bg-app_bg_deep rounded-sm"
                >
                  Ignore
                </Button>
              </div>
            )}
            <div className="text-[12px] opacity-50">5 days ago</div>
          </div>
        </div>

        {!isRead && <div className="w-2 h-2 rounded-full bg-app_cta"></div>}
      </div>
    </>
  );
};

export default Notification;
