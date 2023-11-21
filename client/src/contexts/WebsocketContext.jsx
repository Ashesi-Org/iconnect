import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { userContext } from './UserContext';
import { Button } from '../components/ui/button';
import Loader from '../components/ui/Loader';


const WebSocketContext = createContext({ conn: null });

const WebSocketProvider = ({ children }) => {
  const [conn, setConn] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const { user, userLoading } = useContext(userContext);

  useEffect(() => {
    const opts = {
      transports: ['polling'],
      reconnectionAttempts: 5,
      withCredentials: true,
    };

    const ws = io(
      "http://localhost:8000",
      // process.env.NODE_ENV === 'production'
      //   ? process.env.REACT_APP_PROD_API
      //   : process.env.REACT_APP_DEV_API,
      opts
    );

    ws.on('connect', () => {
      setConn(ws);
      setConnected(true);
    });

    return () => {
      ws.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!userLoading && window.location.pathname !== '/login' && (!user || !user.userId)) {
      window.location.href = '/login';
    }
  }, [userLoading, user]);

  if (userLoading && window.location.pathname !== '/login') {
    return (
      <div className="bg-app_bg_deepest text-white w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isConnected && window.location.pathname !== '/login' && user && !userLoading) {
    const handleRetryConnection = () => {
      // Logic for retrying connection
    };

    return (
      <div className="bg-app_bg_deepest text-white w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <VscDebugDisconnect color="white" size={50} />
          <div className="text-white">You lost connection to the server</div>
          <Button
            onClick={handleRetryConnection}
            className="w-full bg-app_bg_deeper p-3 h-12 font-bold"
          >
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <WebSocketContext.Provider value={{ conn }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketContext, WebSocketProvider };
