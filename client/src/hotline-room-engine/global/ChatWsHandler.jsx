import { useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { userContext } from '../../contexts/UserContext';
import { WebSocketContext } from '../../contexts/WebsocketContext';
import { useSoundEffectStore } from '../../store/useSoundEffectStore';

export const ChatWsHandler = () => {
  const { user, userLoading } = useContext(userContext);
  const { conn } = useContext(WebSocketContext);
  const queryClient = useQueryClient();
  const playSoundEffect = useSoundEffectStore((x) => x.playSoundEffect);

  const generateColor = () => {
    const twitchColors = [
      '#9147FF', // Purple
      '#FF375F', // Red
      '#FF7B00', // Orange
      '#FFC700', // Yellow
      '#19CAAD', // Teal
      '#00C875', // Green
      '#0080FF', // Blue
      '#8257E5', // Indigo
    ];

    const randomIndex = Math.floor(Math.random() * twitchColors.length);
    return twitchColors[randomIndex];
  };

  const colors = [
    '#4ade80',
    '#22d3ee',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f43f5e',
  ];

  useEffect(() => {
    if (!conn) {
      return;
    }
    const handleNewChatMessage = ({ message, roomId }) => {
      console.log('new-chat-message-received');

      const storedColor = localStorage.getItem('userColor');
      if (!storedColor) {
        const myColor = generateColor();
        localStorage.setItem('userColor', myColor);
      }

      if (message?.reply && message?.reply.userId == user.userId) {
        playSoundEffect('roomChatMention');
      }

      queryClient.setQueryData(['room-chat', roomId], (data) =>
        !data
          ? {
              messages: [message],
            }
          : {
              ...data,
              messages: [...data?.messages, message],
            }
      );
    };

    conn.on('new-chat-message', handleNewChatMessage);

    return () => {
      conn.off('new-chat-message', handleNewChatMessage);
    };
  }, [conn, user, playSoundEffect, queryClient]);

  return null;
};

