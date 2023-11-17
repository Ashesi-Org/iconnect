import RoomAvatar from "@/components/room/RoomAvatar";
import React from "react";
import { useQueryClient } from "react-query";

const useSplitUsersIntoSections = ({room}) => {
  const queryClient = useQueryClient();

  const speakers = [];
  const listeners = [];
  const askedToSpeak = [];

  const myRoomStatus = queryClient.getQueryData([
    "room-status",
    room?.roomId,
  ]);

  if (!room || !myRoomStatus) {
    return { listeners, askedToSpeak, speakers };
  }

  room.participants.forEach(participant => {
    let arr = listeners;

    if (participant.userId === room.creatorId || participant.isSpeaker) {
      arr = speakers;
    } else if (participant.raisedHand && myRoomStatus.isMod) {
      arr = askedToSpeak;
    }

    arr.push(<RoomAvatar key={participant.userId} participant={participant} />);
  });

  return { speakers, listeners, askedToSpeak };
};

export default useSplitUsersIntoSections;
