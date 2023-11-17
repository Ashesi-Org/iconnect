import { create } from "zustand";
import { combine, persist,  } from "zustand/middleware";

export const useSettingStore = create(
  persist(
    combine(
      {
        roomInvites: false,
        soundEffects: false,
        selectedMicDevice: "default",
        micAsObj: {value: 'default', label: 'Default - Microphone (Realtek(R) Audio)'},
      },
      set => ({
        updateRoomInvites(val) {
          set(s => {
            return { roomInvites: val };
          });
        },
        updateSoundEffects(val) {
          set(s => {
            return { soundEffects: val };
          });
        },

        updateSelectedMic(device ) {
          console.log(device.value);
          set(s => {
            return {
              micAsObj: device,
              selectedMicDevice: device.value,
            };
          });
        },
        set,
      })
    ),
    {
      name: "streams-user-preferences",
    }
  )
);
