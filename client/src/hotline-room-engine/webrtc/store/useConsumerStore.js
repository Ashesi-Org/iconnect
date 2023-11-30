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
        set(s =>
          userId in s.consumerMap
            ? {
                consumerMap: {
                  ...s.consumerMap,
                  [userId]: {
                    ...s.consumerMap[userId],
                    volume,
                  },
                },
              }
            : s
        );
      },
       add: (c, userId) =>
        set(s => {
          let volume = 100;
          if (userId in s.consumerMap) {
            const x = s.consumerMap[userId];
            volume = x.volume;
            x.consumer.close();
          }
          return {
            consumerMap: {
              ...s.consumerMap,
              [userId]: { consumer: c, volume },
            },
          };
        }),
      
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
