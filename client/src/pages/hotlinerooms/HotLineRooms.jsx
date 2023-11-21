import { useContext, useState } from "react";
import { userContext } from "../../contexts/UserContext";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import { useVoiceStore } from "../../hotline-room-engine/webrtc/store/useVoiceStore";
import useLoadRoomMeta from "../../hooks/useLoadRoomMeta";
import NavBar from "../../components/ui/NavBar";
import PeopleList from "../../components/common/PeopleList";
import VoiceRoomsLayout from "../../components/ui/VoiceRoomsLayout";
import Feed from "../../components/hotline-room/hotline-feed/Feed";
import RoomMinimizedCard from "../../components/hotline-room/RoomMinimizedCard";
import { SideNav } from "../../components/ui/SideNav";


const HotLineRooms = () => {
  const { user } = useContext(userContext);
  const { conn } = useContext(WebSocketContext);
  const { roomId } = useVoiceStore();

  const {
    room,
    roomStatus,
  } = useLoadRoomMeta(roomId, user, true);

  console.log('====================================');
  console.log("roomStatus", roomStatus);
  console.log('====================================');

  return (
    <>
      
      <VoiceRoomsLayout
        navbar={<SideNav />}
        column1={<PeopleList />}
        column2={<Feed conn={conn} />}
      />
      {roomId ? (
        <RoomMinimizedCard
          conn={conn}
          user={user}
          room={room }
          myRoomStatus={roomStatus}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default HotLineRooms;