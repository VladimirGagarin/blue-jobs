// In your component
import { getNotificationsForUser, getUnreadNotificationsCount } from '../utils/notifications';

// Get localized notifications for current user
const userNotifications = getNotificationsForUser(currentUser.userId, language);

// Get unread count for badge
const unreadCount = getUnreadNotificationsCount(currentUser.userId);

// Mark notification as read
const markAsRead = (notificationId) => {
  markNotificationAsRead(notificationId, currentUser.userId);
};