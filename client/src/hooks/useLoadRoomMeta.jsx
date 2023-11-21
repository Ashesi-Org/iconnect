
import { useQuery } from "react-query";
import { api } from "../api";

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
          `api/room/${roomId}?userId=${user.userId}${
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
    useQuery(
      ["room-status", roomId],
      async () => {
        try {
          const { data } = await api.get(
            `/api/room/room-status/${roomId}/${user.userId}`
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
        const { data } = await api.get(`/api/room/ban/${roomId}`);
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
