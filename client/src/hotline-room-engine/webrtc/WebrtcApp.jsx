import React, { useContext, useEffect } from "react";
import { userContext } from "../../contexts/UserContext.jsx";
import { WebSocketContext } from "../../contexts/WebsocketContext.jsx";
import { ActiveSpeakerListener } from "./components/ActiveSpeakerListener.jsx";
import AudioRender from "./components/AudioRender.jsx";
import { useVoiceStore } from "./store/useVoiceStore.js";
import { consumeAudio } from "./utils/consumeAudio.js";
import { createTransport } from "./utils/createTransport.js";
import { joinRoom } from "./utils/joinRoom.js";
import { receiveVoice } from "./utils/receiveVoice.js";
import { sendVoice } from "./utils/sendVoice.js";
import { useRTCStore } from "./store/useRTCStore.js";
import { useNavigate } from "react-router-dom";


export function closeVoiceConnections(_roomId) {
  const { roomId, mic, nullify } = useVoiceStore.getState();
  if (_roomId === null || _roomId === roomId) {
    if (mic) {
      console.log("stopping mic");
      mic.stop();
    }

    console.log("nulling transports");
    nullify();
  }
}

const WebrtcApp = () => {
  const { conn } = useContext(WebSocketContext);
  const { user, userLoading } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!conn || userLoading) {
      return;
    }

    conn.on("room-created", async (d) => {
      await navigate(`/room/${d.roomId}`);
      useRTCStore.getState().set({ createRoomLoading: false });
    });

    conn.on("new-peer-speaker", async (d) => {
      const { roomId, recvTransport } = useVoiceStore.getState();
      console.log("received new speaker params");
      if (recvTransport && roomId === d.roomId) {
        await consumeAudio(d.consumerParameters, d.peerId);
      }
    });

    conn.on("you-are-now-a-speaker", async (d) => {
      if (d.roomId !== useVoiceStore.getState().roomId) {
        return;
      }
      try {
        await createTransport(
          conn,
          d.roomId,
          user.userId,
          "send",
          d.sendTransportOptions
        );
      } catch (err) {
        console.log(err);
        return;
      }
      console.log("sending voice");
      try {
        await sendVoice();
      } catch (err) {
        console.log(err);
      }
    });

    conn.on("you-joined-as-a-peer", async (d) => {
      console.log("you-joined as a peer");
      closeVoiceConnections(null);
      useVoiceStore.getState().set({ roomId: d.roomId });

      console.log("creating a device");
      try {
        await joinRoom(d.navigateRtpCapabilities);
      } catch (err) {
        console.log("error creating a device | ", err);
        return;
      }
      try {
        await createTransport(
          conn,
          d.roomId,
          d.userId,
          "recv",
          d.recvTransportOptions
        );
      } catch (err) {
        console.log("error creating recv transport | ", err);
        return;
      }
      receiveVoice(conn, () => {}, user.userId);
    });

    conn.on("you-joined-as-a-speaker", async (d) => {
      console.log(d);
      closeVoiceConnections(null);
      useVoiceStore.getState().set({ roomId: d.roomId });

      console.log("creating a device");
      try {
        await joinRoom(d.navigateRtpCapabilities);
      } catch (err) {
        console.log("error creating a device | ", err);
        return;
      }
      try {
        await createTransport(
          conn,
          d.roomId,
          d.userId ,
          "send",
          d.sendTransportOptions
        );
      } catch (err) {
        console.log("error creating send transport | ", err);
        return;
      }
      console.log("sending voice");

      try {
        await sendVoice();
      } catch (err) {
        console.log("error sending voice | ", err);
        return;
      }

      await createTransport(
        conn,
        d.roomId,
        user.userId,
        "recv",
        d.recvTransportOptions 
      );

      receiveVoice(conn, () => {}, user.userId);
    });

    return () => {
      conn.off("new-peer-speaker");
      conn.off("you-are-now-a-speaker");
      conn.off("you-joined-as-a-peer");
      conn.off("you-joined-as-a-speaker");
    };
  }, [conn, userLoading]);
  return (
    <>
      <AudioRender />
      <ActiveSpeakerListener />
    </>
  );
};

export default WebrtcApp;
