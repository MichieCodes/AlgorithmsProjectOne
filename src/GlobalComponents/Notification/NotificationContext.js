import React from "react";

import NotificationList from ".";

const NotificationContext = React.createContext(); 

let NotifIndex = 0;

export function NotificationProvider({children}) {
    const [Notifications, setNotifications] = React.useState([]);

    const PushNotification = React.useCallback((NewNotif) => {
        NewNotif.id = NotifIndex++;
        setNotifications((OldNotifs) => [...OldNotifs, NewNotif])
    }, [setNotifications]);

    const RemoveNotification = React.useCallback((id) =>
        setNotifications((OldNotifs) => {
            OldNotifs.length <= 1 && (NotifIndex = 0);
            return OldNotifs.filter((notif) => notif.id !== id);
        }
    ), [setNotifications]);    

    return (
        <NotificationContext.Provider value={PushNotification}>
            {children}
            {Notifications.length > 0 && <NotificationList Notifications={Notifications} onClose={RemoveNotification}/>}
        </NotificationContext.Provider>
    );
}

export const UseNotificationContext = () => React.useContext(NotificationContext);