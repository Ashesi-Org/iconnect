
import { useContext } from "react";
import { BsMicMute } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import RoomParticipantProfile from "./RoomParticipantProfile";
import { AiFillCrown } from "react-icons/ai";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import AppDialog from "../ui/AppDialog";
import useLoadRoomMeta from "../../hooks/useLoadRoomMeta";
import useScreenType from "../../hooks/useScreenType";
import { useParams } from "react-router-dom";


const RoomAvatar = ({ participant }) => {
  const queryClient = useQueryClient();

  const { setOptions, setModalUser } = useRoomProfileModalStore();
  const { user, userLoading } = useContext(userContext);

  
  const { id: roomId } = useParams();

  const { room, roomStatus: myRoomStatus } = useLoadRoomMeta(
    roomId,
    user
  );


  const canShowIndicator = participant.indicatorOn && !participant.isMuted;

  const openParticipantProfile = () => {
    setModalUser(participant);
    setOptions(true);
  };

  const myDevice = useScreenType();
  return myDevice == "isDesktop" ? (
    <>
      <div
        // onClick={handleModalOpen}
        onClick={openParticipantProfile}
        style={{ position: "relative" }}
        className="cursor-pointer w-full h-16 flex flex-col items-center mb-6"
      >
        <AppDialog
          content={
            <RoomParticipantProfile
              myRoomStatus={myRoomStatus}
              participantId={participant.userId}
              room={room}
              toggleDialog={() => {}}
            />
          }
        >
          <div
            className={`inline-block h-16 w-16 rounded-full relative cursor-pointer active:opacity-80 object-cover bg-app_bg_light`}
          >
            <img
              style={{
                border: `${canShowIndicator ? "3.3px #0084c7 solid" : ""}`,
                padding: "0.12rem",
              }}
              className={`inline-block h-16 w-16 relative rounded-full cursor-pointer active:opacity-80 object-cover`}
              src={participant.avatarUrl}
              alt=""
            />

            {participant.isMuted && participant.isSpeaker && (
              <div
                style={{
                  backgroundColor: "#0084c7",
                  borderRadius: "100%",
                  padding: "0.2rem",
                  position: "absolute",
                  right: "2%",
                  bottom: "5%",
                }}
              >
                <BsMicMute fontSize={"0.8rem"} />
              </div>
            )}
          </div>
        </AppDialog>
       
        <span>
          <span className="text-xs font-semibold flex items-center">
            {participant.userId == (room)?.creatorId && (
              <AiFillCrown
                style={{ marginRight: "1px" }}
                size={17}
                color="#ffc500"
              />
            )}
            {participant.isMod && (
              <img
                src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/How-to-Make-Someone-a-Mod-in-Twitch-scaled.jpg?fit=2560%2C2560&ssl=1"
                className="w-3 h-3 object-contain mr-1"
              />
            )}
            {user.userId === participant.userId ? "You" : participant.userName}
          </span>
        </span>
      </div>
    </>
  ) : (
    <>
      <div
        onClick={openParticipantProfile}
        style={{ position: "relative" }}
        className="cursor-pointer w-full h-16 flex flex-col items-center mb-6"
      >
        <Sheet>
          <SheetTrigger asChild>
            <div
              className={`inline-block h-16 w-16 rounded-full relative cursor-pointer active:opacity-80 object-cover bg-app_bg_light`}
            >
              <img
                style={{
                  border: `${canShowIndicator ? "3.3px #0084c7 solid" : ""}`,
                  padding: "0.12rem",
                }}
                className={`inline-block h-16 w-16 relative rounded-full cursor-pointer active:opacity-80 object-cover`}
                src={participant.avatarUrl}
                alt=""
              />

              {participant.isMuted && participant.isSpeaker && (
                <div
                  style={{
                    backgroundColor: "#0084c7",
                    borderRadius: "100%",
                    padding: "0.2rem",
                    position: "absolute",
                    right: "2%",
                    bottom: "5%",
                  }}
                >
                  <BsMicMute fontSize={"0.8rem"} />
                </div>
              )}
            </div>
          </SheetTrigger>
          <SheetContent position={"bottom"} size={"content"}>
            <SheetHeader></SheetHeader>
            <RoomParticipantProfile
              myRoomStatus={myRoomStatus}
              participantId={participant.userId}
              room={room}
              toggleDialog={() => {}}
            />
          </SheetContent>
        </Sheet>

        <span>
          <span className="text-xs font-semibold flex items-center">
            {participant.userId == (room)?.creatorId && (
              <AiFillCrown
                style={{ marginRight: "1px" }}
                size={17}
                color="#ffc500"
              />
            )}
            {participant.isMod && (
              <img
                src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2021/03/How-to-Make-Someone-a-Mod-in-Twitch-scaled.jpg?fit=2560%2C2560&ssl=1"
                className="w-3 h-3 object-contain mr-1"
              />
            
            )}
            
            {user.userId === participant.userId ? "You" : participant.userName}
          </span>
        </span>
      </div>
    </>
  );
};

export default RoomAvatar;
