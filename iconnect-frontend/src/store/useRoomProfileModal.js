import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useRoomProfileModalStore = create(
  combine(
    {
      showOptions: false,
      modalProfile: {}, 
    },
    set => ({
      setOptions: (val) => {
        set(s => {
          return {
            showOptions: val,
          };
        });
      },
      setModalUser: (participant) => {
        set(s => {
          return {
            modalProfile: participant,
          };
        });
      },
    })
  )
);
