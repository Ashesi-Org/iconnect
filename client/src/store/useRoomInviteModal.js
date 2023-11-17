import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useRoomInviteModal = create(
  combine(
    {
      showInvite: false,
      modalUser: {} , 
      modalRoom: {} ,
    },
    set => ({
      showInvite: (val) => {
        set(s => {
          return {
            showInvite: val,
          };
        });
      },
      setModalUser: (user) => {
        set(s => {
          return {
            modalUser: user,
          };
        });
      },
      setModalRoom: (room) => {
        set(s => {
          return {
            modalRoom: room,
          };
        });
      },
    })
  )
);
