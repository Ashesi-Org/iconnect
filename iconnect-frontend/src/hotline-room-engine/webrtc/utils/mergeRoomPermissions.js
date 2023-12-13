
export const mergeRoomPermission = (
  currentRoomPermission,
  newRoomPermissions
) => {
  return {
    ...(currentRoomPermission || {
      askedToSpeak: false,
      isMod: false,
      isSpeaker: false,
    }),
    ...newRoomPermissions,
  };
};
