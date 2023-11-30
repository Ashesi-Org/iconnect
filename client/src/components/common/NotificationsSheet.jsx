import React, { useContext, useEffect } from "react";
import Notification from "./Notification";
import { useQuery, useQueryClient } from "react-query";
import { api } from "../../api";
import { ClipLoader } from "react-spinners";
import { BsInbox } from "react-icons/bs";
import { userContext } from "../../contexts/UserContext";

const NotificationsSheet = () => {
  const { user } = useContext(userContext);
  const { data: notifications, isLoading: notificationsLoading } = useQuery(
    ["notifications", user?.userId],
    async () => {
      const { data } = await api.get(`/api/notification/${user.userId}`);
      return data;
    },
    { enabled: !!user, staleTime: 20000 }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    const processNotifications = async () => {
      if (!notificationsLoading && notifications) {
        const unreadNotifications = notifications.filter(
          (notification) => notification.status !== "read"
        );
        const notificationIds = unreadNotifications.map(
          (notification) => notification.notificationId
        );
        if (notificationIds.length > 0) {
          await api.patch(`/api/notification/markBatchAsRead`, {
            notificationIds,
          });
          queryClient.invalidateQueries(["notifications", user?.userId]);
        }
      }
    };

    processNotifications();
  }, [notificationsLoading, notifications, queryClient, user?.userId]);

  return notificationsLoading ? (
    <div className="w-full h-full flex items-center justify-center px-3">
      <ClipLoader color="white" />
    </div>
  ) : (
    <div className="mt-1 h-full overflow-y-auto px-1">
      {notifications?.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.notification_id + Math.random()}
            className="mb-3"
          >
            <Notification
              key={notification.notification_id}
              issueId={notification.issue_id}
              content={notification.message}
              createdAt={notification.created_at}
              notificationId={notification.notification_id}
              isRead={notification.status === "read"}
            />
          </div>
        ))
      ) : (
        <div className="w-full h-1/3 flex flex-col items-center justify-center text-app-white">
          <BsInbox size={50} />
          <div>Your inbox is empty</div>
        </div>
      )}
    </div>
  );
};

export default NotificationsSheet;
