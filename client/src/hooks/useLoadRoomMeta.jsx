import { api } from "@/api";
import { useQuery } from "react-query";

const useLoadRoomMeta = (
  roomId,
  user,
  hasJoined = true
) => {
  const { isLoading: chatLoading, data: chatMessages } = useQuery(["room-chat", roomId], {
    staleTime: 300000,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const { isLoading: roomLoading, data: room } = useQuery(
    ["room", roomId],
    async () => {
      try {
        const { data } = await api.get(
          `/room/${roomId}?userId=${user.userId}${
            hasJoined ? "&hasJoined=true" : ""
          }`
        );
        return data;
      } catch (error) {}
    },
    {
      enabled: !!user && !!roomId,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  const { isLoading: roomStatusLoading, data: roomStatus } =
    useQuery<RoomStatus>(
      ["room-status", roomId],
      async () => {
        try {
          const { data } = await api.get(
            `/room/room-status/${roomId}/${user.userId}`
          );
          return data;
        } catch (error) {}
      },
      {
        enabled: !!room,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        staleTime: 300000,
      }
    );

  const { isLoading: roomBansLoading, data: roomBans } = useQuery(
    ["room-bans", roomId],
    async () => {
      try {
        const { data } = await api.get(`/room/ban/${roomId}`);
        return data;
      } catch (error) {}
    }
  );

  return {
    chatLoading,
    roomLoading,
    roomStatusLoading,
    room,
    chatMessages,
    roomStatus,
  };
};

export default useLoadRoomMeta;
