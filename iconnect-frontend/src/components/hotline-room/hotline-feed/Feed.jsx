import React, { useContext, useState } from "react";
import {
  CalendarClock,
  PlusIcon,
  RefreshCwIcon,
  Sparkle,
} from "lucide-react";
import { Button } from "../../ui/button";
import CreateRoom from "./CreateRoom";
import { Skeleton } from "../../ui/skeleton";
import { useQuery, useQueryClient } from "react-query";
import {
  BsSoundwave,
} from "react-icons/bs";
import { api } from "../../../api";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { AiFillApi } from "react-icons/ai";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../../ui/sheet";
import useScreenType from "../../../hooks/useScreenType";
import { useNavigate } from "react-router-dom";
import ButtonM from "../../ui/ButtonM";


const Feed = ({ conn }) => {
  const queryClient = useQueryClient();
  const myDevice = useScreenType();

  const [currentTab, setCurrentTab] = useState("for-you");
  const { data: liveRooms, isLoading: liveRoomsLoading } = useQuery({
    queryKey: ["live-rooms"],
    queryFn: async () => {
      const { data } = await api.get("/api/room/rooms/live");
      return data;
    },
  });

  return (
    <>
      <div className="space-y-6 h-auto pb-5">
        <div className="flex items-center justify-end space-x-8 pt-2 border-b-gray-200 border-b pb-3">
          {/* {myDevice == "isMobile" ? ( */}
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex space-x-2 items-baseline">
                  <ButtonM
                    type = "primary"
                    size={"sm"}
                    className="rounded-lg shadow-card_shadow bg-app-brown"
                  >
                    <PlusIcon size={20} className="text-white" />
                  </ButtonM>
                  
                </div>
              </SheetTrigger>
              <SheetContent
                position={myDevice !== "isMobile" ? "right" : "bottom"}
                size={myDevice !== "isMobile" ? "sm" : "content"}
              >
                <SheetHeader></SheetHeader>
                <CreateRoom conn={conn} />
              </SheetContent>
            </Sheet>
          {/* ) : (
            <div></div>
          )} */}
          <div>
            <div className="space-x-2 flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      style={{
                        background:
                          currentTab == "for-you" ? "white" : "#36393e",
                      }}
                      size={"sm"}
                      onClick={() => setCurrentTab("for-you")}
                      className="rounded-lg shadow-app_shadow"
                    >
                      <Sparkle
                        size={20}
                        color={currentTab == "for-you" ? "black" : "white"}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>For you</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      style={{
                        background:
                          currentTab == "scheduled" ? "white" : "#36393e",
                      }}
                      onClick={() => setCurrentTab("scheduled")}
                      size={"sm"}
                      className="shadow-app_shadow rounded-lg"
                    >
                      <CalendarClock
                        size={20}
                        color={currentTab == "scheduled" ? "black" : "white"}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Scheduled</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        {currentTab == "for-you" ? (
          <div className="space-y-4 overflow-auto ">
            {liveRoomsLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <FeedCardSkeleton key={index} />
                ))
              : liveRooms?.map((room, index) => (
                  <FeedCard key={index} room={room} />
                ))}

            {(!liveRoomsLoading && !liveRooms) ||
              (liveRooms?.length == 0 && (
                <div className="text-center font-semibold mt-14 ">
                  <div className="flex flex-col items-center space-y-3">
                    <RefreshCwIcon color="white" size={50} />
                    <div className="text-white">No active rooms available</div>
                    <Button
                      onClick={() => {
                        queryClient.resetQueries(["live-rooms"]);
                      }}
                      className="w-[250px] bg-app_bg_deeper p-3 h-12 font-bold shadow-app_shadow"
                    >
                      Reload Feed
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <>
            <div className="text-center font-semibold mt-14 ">
              <div className="flex flex-col items-center space-y-3">
                <span>Scheduled rooms coming soon</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Chip = ({ content }) => {
  return (
    <div className="w-30 max-w-30 h-auto rounded-sm bg-app_bg_deepest text-sm py-1 px-2 inline-block truncate">
      {content}
      {/* <span className="w-full text-sm">{content}</span> */}
    </div>
  );
};

const FeedCard = ({ room }) => {
  const navigate = useNavigate();
  const isRoomEmpty = !room.participants || room.participants.length === 0;
  const participantAvatars = room.participants?.slice(0, 3)?.map((rp, i) => (
    <Avatar
      key={i}
      className="shadow-app_shadow object-cover"
      style={{
        width: "20px",
        height: "20px",
        marginLeft: i !== 0 ? "-0.3rem" : 0,
      }}
    >
      <AvatarImage className="shadow-app_shadow object-cover" src={rp.avatarUrl} />
      <AvatarFallback className="bg-app_bg_light"></AvatarFallback>
    </Avatar>
  ));

  return (
    <div
      onClick={() => {
        navigate(`/rooms/${room.roomId}`);
      }}
      className="shadow-card_shadow flex flex-col items-start bg-app-background-2 h-auto rounded-xl cursor-pointer"
    >
      <div className="p-5 space-y-3">
        <div>
          <span className="flex items-center">
            {isRoomEmpty ? <AiFillApi className="mr-2" size={20} /> : <BsSoundwave className="mr-2" size={20} />}
            {isRoomEmpty ? "Ended" : "Live"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="font-medium text-lg">{room.roomDesc}</span>
            <span className="text-[12px]">
              <span>with </span>
              {room.creator}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center mr-2">{participantAvatars}</div>
          {room.participants ? (
            <span className="text-sm">{room.participants.length} listening</span>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
};

export const FeedCardSkeleton = () => {
  return (
    <Skeleton className="bg-app-background-2 h-auto p-5 rounded-xl cursor-pointer shadow-app_shadow">
      <div className="flex items-center">
        <Skeleton className="w-5 bg-app_bg_light h-5 rounded-full" />
        <Skeleton className="w-1/12 bg-app_bg_light h-5" />
      </div>
      <div className="w-full flex items-center">
        <Skeleton className="w-1/2 bg-app_bg_light h-5" />
      </div>
      <div className="flex items-center">
        <Skeleton className="w-5 bg-app_bg_light h-5 rounded-full" />
        <Skeleton className="w-5 bg-app_bg_light h-5 rounded-full" />
        <Skeleton className="w-5 bg-app_bg_light h-5 rounded-full" />
      </div>
    </Skeleton>
  );
};

function formatParticipantList(participants) {
  if (!participants || participants.length === 0) {
    return "";
  }

  const participantCount = participants.length;
  const MAX_DISPLAY_COUNT = 3;

  if (participantCount <= MAX_DISPLAY_COUNT) {
    return participants.join(", ");
  }

  const displayedNames = participants.slice(0, MAX_DISPLAY_COUNT);
  const remainingCount = participantCount - MAX_DISPLAY_COUNT;

  return `${displayedNames.join(", ")} & ${remainingCount} others`;
}

export default Feed;
