import React, { useContext } from "react";
import { Button } from "../ui/button";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import {useParams} from "react-router-dom"
import { api } from "../../api";

const RoomBanItem = ({ bannedUser }) => {

  const { conn } = useContext(WebSocketContext);
  const { id: roomId } = useParams();
  const queryClient = useQueryClient();

  const banMutation = useMutation(
    async (params) => {
      const { isBan, userId, banType } = params;

      if (!isBan) {
        await api.post(
          `/room/ban/${roomId}?userId=${userId}&banType=${banType}`
        );
      } else {
        await api.delete(
          `/room/unban/${roomId}?userId=${userId}&banType=${banType}`
        );
      }
    },
    {
      onError: (error, variables, context) => {},
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(["room-bans", roomId]);
      },
    }
  );

  const handleBan = async (banType) => {
    try {
      const isBan = checkIsBanned(bannedUser.userId);

      banMutation.mutate({
        isBan,
        banType,
        userId: bannedUser.userId,
      });
    } catch (error) {}
  };

  const { isLoading: roomBansLoading, data: roomBans, isRefetching } = useQuery(
    ["room-bans", roomId],
    async () => {
      const { data } = await api.get(`/room/ban/${roomId}`);
      return data;
    },
    {
      staleTime: 60000,
      enabled: !!roomId,
    }
  );

  const checkIsBanned = (userId) => {
    return roomBans.some((ban) => ban.userId === userId);
  };

  return (
    <div className="flex items-center justify-between space-x-4 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div>
          <img
            className="w-[38px] h-[38px] rounded-full object-cover"
            src={bannedUser?.avatarUrl}
            alt=""
          />
        </div>
        <div className="flex flex-col item-start ">
          <span className="text-lg font-semibold leading-tight">
            {bannedUser?.userName}
          </span>
          <span className="text-[12px] opacity-30">{bannedUser?.banType}</span>
        </div>
      </div>
      <div>
        {!banMutation.isLoading ? (
          <Button
            onClick={() => handleBan(bannedUser?.banType)}
            className="bg-app_cta p-3 h-10"
          >
            Unban
          </Button>
        ) : (
          <Loader width={15} alt={true} />
        )}
      </div>
    </div>
  );
};

const RoomBanList = ({ roomId }) => {
  const { isLoading: roomBansLoading, data: roomBans } = useQuery(
    ["room-bans", roomId],
    async () => {
      const { data } = await api.get(`/room/ban/${roomId}`);
      return data;
    },
    {
      enabled: !!roomId,
      staleTime: 60000,
    }
  );

  return (
    <div className="space-y-4">
      {roomBans && roomBans.length > 0 && (
        <span className="font-semibold text-lg">Banned Users</span>
      )}
      <div>
        {roomBans.map((rb, idx) => (
          <RoomBanItem key={idx} bannedUser={rb} />
        ))}
      </div>
    </div>
  );
};

export default RoomBanList;
