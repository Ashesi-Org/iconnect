import create from "zustand";
import { combine } from "zustand/middleware";
import { Consumer } from "mediasoup-client/lib/Consumer";

export const useConsumerStore = create(
  combine(
    {
      consumerMap: {},
    },
    (set) => ({
      setAudioRef: (userId, audioRef) => {
        set((s) => ({
          consumerMap: {
            ...s.consumerMap,
            [userId]: {
              ...s.consumerMap[userId],
              audioRef,
            },
          },
        }));
      },
      setVolume: (userId, volume) => {
        set((s) => ({
          consumerMap: {
            ...s.consumerMap,
            [userId]: {
              ...s.consumerMap[userId],
              volume,
            },
          },
        }));
      },
      add: (c, userId) =>
        set((s) => ({
          consumerMap: {
            ...s.consumerMap,
            [userId]: { consumer: c, volume: 100 },
          },
        })),
      closeAll: () =>
        set((s) => {
          Object.values(s.consumerMap).forEach(
            ({ consumer: c }) => !c.closed && c.close()
          );
          return {
            consumerMap: {},
          };
        }),
    })
  )
);
