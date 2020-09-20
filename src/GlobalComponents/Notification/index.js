import React from "react";

import "./Notification.scss";

function Notification({NotificationOptions, onClose}) {
    const Notif = React.useRef(null);
    const [SlideOut, setSlideOut] = React.useState(false);
    
    React.useEffect(() => {
        if(!Notif.current) return;
        const CurrentNotif = Notif.current;

        CurrentNotif.style.height = `${CurrentNotif.scrollHeight}px`;
        
        NotificationOptions.timeout && 
            CurrentNotif.style.setProperty("--Notif-Progress-Animation", 
                `Notif-Progress ${NotificationOptions.timeout/1000}s`);

        CurrentNotif.onanimationend = (e) => {
            if(e.animationName === "Notif-ScaleOut") onClose(NotificationOptions.id);
            else if(e.animationName === "Notif-Progress") setSlideOut(true);
        };

        return () => {
            clearTimeout(CurrentNotif);
            CurrentNotif.onanimationend = null;
        }
    }, [Notif, NotificationOptions, onClose, setSlideOut]);

    return (
        <div ref={Notif} className={`NotificationWrapper ${SlideOut ? "NotificationSlideOut" : ""}`}>
            <div className="Notification" onClick={() => setSlideOut(true)}>
                <b>{NotificationOptions.type?.toUpperCase() || "ERROR"}</b> | {NotificationOptions.title}
                {NotificationOptions.body && <p>{NotificationOptions.body}</p>}
            </div>
        </div>
    );
}

function NotificationList({Notifications, onClose}) {
    return (
        <div className="NotificationList">
            {Notifications.map((notification, n) => 
                <Notification key={notification.id} NotificationOptions={notification} onClose={onClose}/>
            )}
        </div>
    );
}

export default NotificationList;
