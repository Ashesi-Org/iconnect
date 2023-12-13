import { Socket } from "socket.io-client";
import { useVoiceStore } from "../store/useVoiceStore";
import { consumeAudio } from "./consumeAudio";

export const receiveVoice = (
  conn,
  flushQueue,
  userId
) => {
  const { roomId } = useVoiceStore.getState();
  if (!conn) {
    return;
  }
  conn.once("@get-recv-tracks-done", ({ consumerParametersArr }) => {
    console.log("consumerparamsrecv", consumerParametersArr);
    try {
      for (const { peerId, consumerParameters } of consumerParametersArr) {
        consumeAudio(consumerParameters, peerId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      flushQueue();
    }
  });
  conn.emit("rtc:get_recv_tracks", {
    rtpCapabilities: useVoiceStore.getState().device.rtpCapabilities,
    roomId,
    peerId: userId,
  });
};
