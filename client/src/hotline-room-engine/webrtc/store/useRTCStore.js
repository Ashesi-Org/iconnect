import { create } from "zustand";
import { combine } from "zustand/middleware";


export const useRTCStore = create(
  combine(
    {
      createRoomLoading: false,
      rtcStatus: "connecting",
    },
    set => ({
      setCreateLoading: (val) => {
        set(s => ({
          createRoomLoading: val,
        }));
      },
      setRTCStatus: (status) => {
        set(s => ({
          rtcStatus: status
        }));
      },
      set,
    })
  )
);
