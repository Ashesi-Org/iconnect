import { TransportOptions } from "mediasoup-client/lib/types";
import { useVoiceStore } from "../store/useVoiceStore";
import { useRTCStore } from "../store/useRTCStore";
import { useProducerStore } from "../store/useProducerStore";

export async function createTransport(
  conn,
  _roomId,
  userid,
  direction,
  transportOptions
) {
  console.log(`create ${direction} transport`);
  const { device, set, roomId } = useVoiceStore.getState();

  console.log("transport options", transportOptions);
  const transport =
    direction === "recv"
      ? await device?.createRecvTransport(transportOptions)
      :  await device?.createSendTransport(transportOptions);

  transport.on("connect", ({ dtlsParameters }, callback, errback) => {
    conn.emit(
      `rtc:connect_transport`,
      {
        roomId,
        transportId: transportOptions.id,
        dtlsParameters,
        peerId: userid,
        direction,
      },
      () => callback()
    );
  });

  if (direction === "send") {
   
    transport.on(
      "produce",
      ({ kind, rtpParameters, appData }, callback, errback) => {
        console.log("transport produce event", appData.mediaTag);
      
        conn.once("@send-track-done", (d) => {
          console.log("@send-track-done");
          callback({ id: d.id });
        });
        conn.emit(
          "rtc:send_track",
          {
            roomId,
            peerId: userid,
            transportId: transportOptions.id,
            kind,
            rtpParameters,
            rtpCapabilities: device.rtpCapabilities,
            paused: false,
            appData,
            direction,
          },
          (id) => callback({ id })
        );
      }
    );
  }


  transport.on("connectionstatechange", state => {
    useRTCStore.getState().set({ rtcStatus: state });
    console.log(
      `${direction} transport ${transport.id} connectionstatechange ${state}`
    );
  });

  if (direction === "recv") {
    set({ recvTransport: transport });
  } else {
    set({ sendTransport: transport });
  }
}
