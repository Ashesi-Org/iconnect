import { MdOutlineWavingHand } from "react-icons/md";
import { TbHandOff } from "react-icons/tb";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Mic,
  MicOff,
  PhoneMissed,
  UserPlus,
} from "lucide-react";


// components
import { Button } from "../ui/button";
import RoomShare from "./RoomShare";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import RoomChatArea from "./RoomChatArea";
import { useVoiceStore } from "../../hotline-room-engine/webrtc/store/useVoiceStore";
import useLoadRoomMeta from "../../hooks/useLoadRoomMeta";
import { useSoundEffectStore } from "../../store/useSoundEffectStore";
import useScreenType from "../../hooks/useScreenType";
import { useProducerStore } from "../../hotline-room-engine/webrtc/store/useProducerStore";
import { useConsumerStore } from "../../hotline-room-engine/webrtc/store/useConsumerStore";



const RoomControls = ({ conn, myRoomStatus, roomId, room, user }) => {
  const { mic, nullify } = useVoiceStore();
  const queryClient = useQueryClient();
  const router = useHistory();
  const [chatOpen, setChatOpen] = useState(false);

  const { closeAll } = useConsumerStore();
  const { close, producer } = useProducerStore();
  const myDevice = useScreenType();

  const parseCamel = (snake) => {
    return snake.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
  };

  const playSoundEffect = useSoundEffectStore(x => x.playSoundEffect);

  const { chatMessages } = useLoadRoomMeta(roomId, user, true);

  const statusMutation = useMutation({

    mutationFn: async (params) => {
      await api.put(
        `/api/room/room-status/update/${params.userId}?state=${params.state}&value=${params.value}&roomId=${roomId}`
      );
    },
      
    onMutate: async variables => {
      await queryClient.cancelQueries(["room-status", roomId]);

      const previousRoomStatus = queryClient.getQueryData([
        "room-status",
        roomId,
      ]);

      if (variables.userId === user.userId) {
        queryClient.setQueryData(["room-status", roomId], (data) => ({
          ...data,
          [parseCamel(variables.state)]: variables.value,
        }));
      }

      return { previousRoomStatus };
    },

    onSuccess: () => {},

    onError: (error, variables, context) => {
      if (variables.userId === user.userId) {
        queryClient.setQueryData(
          ["room-status", roomId],
          context.previousRoomStatus
        );
      }
    },
  });

  const handleMute = async () => {
    if (conn || mic) {
      return;
    }
    const event = myRoomStatus.isMuted ? "action:unmute" : "action:mute";
    myRoomStatus.isMuted ? playSoundEffect("unmute") : playSoundEffect("mute");

    conn.emit(event, { roomId, userId: user.userId });
    mic?.enabled ? (mic.enabled = false) : (mic.enabled = true);

    try {
      statusMutation.mutate({
        state: "is_muted",
        value: myRoomStatus.isMuted,
        userId: user.userId,
      });
    } catch (err) {}
  };

  const handleHandRaise = async () => {
    if (conn) {
      return;
    }

    const event = myRoomStatus.raisedHand
      ? "action:hand_down"
      : "action:hand_raise";

    myRoomStatus.raisedHand
      ? playSoundEffect("unmute")
      : playSoundEffect("mute");
    conn.emit(event, { roomId, userId: user.userId });
    try {
      statusMutation.mutate({
        state: "raised_hand",
        value: myRoomStatus.raisedHand,
        userId: user.userId,
      });
    } catch (err) {}
  };

  const handleLeave = async () => {
    try {
      if (room.creatorId == user.userId) {
        conn?.emit("mod:leave_room_all", { roomId, hostId: user.userId });
      } else {
        conn?.emit("action:leave_room", { roomId });
       
      }
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  };

  const hasUnreadMessages = (cm) => {
    if (cm) {
      return;
    }

    return cm.messages?.some((msg) => msg.read);
  };

  const markAllAsRead = () => {
    queryClient.setQueryData(["room-chat", roomId], (data) => {
      if (data) {
        const readChat = data?.messages.map((m) => ({
          ...m,
          read: true,
        }));
        return { messages: readChat };
      }
      return data;
    });
  };

  useEffect(() => {
    if (chatOpen) {
      markAllAsRead();
    }
  }, [chatMessages])

  return myDevice == "isDesktop" ? (
    <div className="bg-app_bg_deep w-full rounded-b-lg flex items-center justify-between p-3">
      <div className="space-x-1.5 flex items-center">
        {(myRoomStatus.isSpeaker || room.handRaiseEnabled) && (
          <Button
            onClick={myRoomStatus.isSpeaker ? handleMute : handleHandRaise}
            className={`${
              myRoomStatus.isMuted || myRoomStatus.raisedHand
                ? "bg-app_bg_deeper"
                : "bg-app_cta "
            } shadow-app_shadow px-8`}
          >
            {myRoomStatus.isSpeaker ? (
              myRoomStatus.isMuted ? (
                <MicOff size={16} />
              ) : (
                <Mic size={16} />
              )
            ) : myRoomStatus.raisedHand ? (
              <TbHandOff fontSize={"1.2rem"} />
            ) : (
              <MdOutlineWavingHand size={16} />
            )}
          </Button>
        )}
        <AppDialog content={<RoomShare room={room} />}>
          <Button className="bg-app_bg_deeper shadow-app_shadow">
            <UserPlus size={16} />
          </Button>
        </AppDialog>
        
      </div>
      <div>
        <Button
          onClick={handleLeave}
          className="w-28 bg-app_bg_deeper shadow-app_shadow"
        >
          {room.creatorId == user.userId ? "End" : "Leave ✌"}
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full rounded-b-lg flex items-center justify-between p-3">
      <div className="space-x-1.5 flex items-center">
        {(myRoomStatus.isSpeaker || room.handRaiseEnabled) && (
          <Button
            onClick={myRoomStatus.isSpeaker ? handleMute : handleHandRaise}
            className={`${
              myRoomStatus.isMuted || myRoomStatus.raisedHand
                ? "bg-app_bg_deeper"
                : "bg-app_cta "
            } shadow-app_shadow `}
          >
            {myRoomStatus.isSpeaker ? (
              myRoomStatus.isMuted ? (
                <MicOff size={16} />
              ) : (
                <Mic size={16} />
              )
            ) : myRoomStatus.raisedHand ? (
              <TbHandOff fontSize={"1.2rem"} />
            ) : (
              <MdOutlineWavingHand size={16} />
            )}
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-app_bg_deeper shadow-app_shadow">
              <UserPlus size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent
            position={myDevice == "isMobile" ? "right" : "bottom"}
            size={myDevice == "isMobile" ? "sm" : "content"}
          >
            <SheetHeader></SheetHeader>
            <RoomShare room={room} />
          </SheetContent>
        </Sheet>

        <Sheet open={chatOpen} onOpenChange={setChatOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={() => markAllAsRead()}
              className="bg-app_bg_deeper shadow-app_shadow relative"
            >
              <MessageSquare size={16} />
              {hasUnreadMessages(chatMessages) && (
                <div className="w-2 h-2 rounded-full bg-yellow-100 absolute right-0.5 top-0"></div>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            position={myDevice == "isMobile" ? "right" : "bottom"}
            size={myDevice == "isMobile" ? "sm" : "content"}
          >
            <SheetHeader></SheetHeader>
            <RoomChatArea
              chatMessages={chatMessages}
              chatOpen={true}
              conn={conn}
              room={room}
              user={user}
            />
          </SheetContent>
        </Sheet>
       
      </div>
      <div>
        <Button
          onClick={handleLeave}
          className="bg-app_bg_deeper shadow-app_shadow"
        >
          {room.creatorId == user.userId ? <PhoneMissed size={16} /> : "✌"}
        </Button>
      </div>
    </div>
  );
  
};

export default RoomControls;
