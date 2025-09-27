import { useState, useEffect } from 'react';
import { NOTIFICATION_TYPES, markAsRead, getNotificationText } from '../Utils/Notification.js';


const NotificationComponent = ({ userNotifications, onNotificationsUpdate, userLanguage = 'en' }) => {
  const [notifications, setNotifications] = useState(userNotifications || []);
  
  
  
  useEffect(() => {
    setNotifications(userNotifications || []);
  }, [userNotifications]);

  const handleMarkAsRead = (notificationId) => {
    const updatedNotifications = markAsRead(notifications, notificationId);
    setNotifications(updatedNotifications);
    onNotificationsUpdate(updatedNotifications);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h3>
          {userLanguage === 'fr' ? 'Notifications' : 'Notifications'} 
          ({unreadCount})
        </h3>
      </div>
      
      <div className="notifications-list">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.type} ${notification.isRead ? 'read' : 'unread'}`}
            onClick={() => handleMarkAsRead(notification.id)}
          >
            <div className="notification-content">
              {notification.content.photo && (
                <img src={notification.content.photo} alt="Notification" />
              )}
              <p>{getNotificationText(notification.content, userLanguage)}</p>
            </div>
            <span className="notification-date">
              {new Date(notification.dateCreated).toLocaleDateString(
                userLanguage === 'fr' ? 'fr-FR' : 'en-US'
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationComponent;