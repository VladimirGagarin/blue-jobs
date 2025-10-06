// src/components/Notifications.jsx
import { useState, useEffect } from "react";
import {
  FaTrash,
  FaArchive,
  FaEye,
  FaEyeSlash,
  FaDownload,
  FaExternalLinkAlt,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import {
  getNotificationsForUser,
  markNotificationAsRead,
  dismissNotification,
  getNotificationIcon,
} from "../Utils/Notification.js";
import "./Notification.css";

export default function Notifications({ user, language, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"

  useEffect(() => {
    if (user) {
      const userNotifications = getNotificationsForUser(user.userId, language);
      setNotifications(userNotifications);
    }
  }, [user, language]);

  const handleMarkAsRead = (notificationId) => {
    if (markNotificationAsRead(notificationId, user.userId)) {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.notificationId === notificationId
            ? { ...notif, notificationStatus: "read" }
            : notif
        )
      );
    }
  };

  const handleMarkAsUnread = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.notificationId === notificationId
          ? { ...notif, notificationStatus: "unread" }
          : notif
      )
    );
  };

  const handleDismiss = (notificationId) => {
    if (dismissNotification(notificationId, user.userId)) {
      setNotifications((prev) =>
        prev.filter((notif) => notif.notificationId !== notificationId)
      );
    }
  };

  const handleArchive = (notificationId) => {
    // Implement archive logic here
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.notificationId === notificationId
          ? { ...notif, notificationStatus: "archived" }
          : notif
      )
    );
  };

  const handleDownloadFile = (file) => {
    if (file && file.url) {
      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleOpenLink = (link) => {
    if (link) {
      if (link.startsWith("/")) {
        // Internal link - navigate
        window.location.href = link;
      } else {
        // External link - open in new tab
        window.open(link, "_blank");
      }
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return notif.notificationStatus === "unread";
    if (filter === "read") return notif.notificationStatus === "read";
    return true;
  });

  const unreadCount = notifications.filter(
    (n) => n.notificationStatus === "unread"
  ).length;
  const  onClose

  return (
    <div className="blue-notifications-container">
      {/* Header */}
      <div className="blue-notifications-header">
        <div className="blue-notifications-title">
          <FaBell className="blue-notifications-title-icon" />
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <span className="blue-notifications-badge">{unreadCount}</span>
          )}
        </div>
        <button className="blue-notifications-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="blue-notifications-filters">
        <button
          className={`blue-filter-btn ${filter === "all" ? "blue-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`blue-filter-btn ${
            filter === "unread" ? "blue-active" : ""
          }`}
          onClick={() => setFilter("unread")}
        >
          Unread
        </button>
        <button
          className={`blue-filter-btn ${
            filter === "read" ? "blue-active" : ""
          }`}
          onClick={() => setFilter("read")}
        >
          Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="blue-notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="blue-no-notifications">
            <div className="blue-no-notifications-icon">🔔</div>
            <p className="blue-no-notifications-text">
              {filter === "all"
                ? "No notifications yet"
                : `No ${filter} notifications`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.notificationId}
              className={`blue-notification-item ${
                notification.notificationStatus === "unread"
                  ? "blue-unread"
                  : ""
              } blue-priority-${notification.notificationPriority}`}
            >
              {/* Notification Icon */}
              <div className="blue-notification-icon">
                {notification.notificationContent.icon ||
                  getNotificationIcon(notification.notificationType)}
              </div>

              {/* Notification Content */}
              <div className="blue-notification-content">
                <div className="blue-notification-header">
                  <h4 className="blue-notification-title">
                    {notification.notificationContent.title}
                  </h4>
                  <span
                    className={`blue-notification-priority ${notification.notificationPriority}`}
                  >
                    {notification.notificationPriority}
                  </span>
                </div>

                <p className="blue-notification-message">
                  {notification.notificationContent.message}
                </p>

                {/* File Attachment */}
                {notification.notificationContent.file && (
                  <div className="blue-notification-file">
                    <button
                      className="blue-file-download-btn"
                      onClick={() =>
                        handleDownloadFile(
                          notification.notificationContent.file
                        )
                      }
                    >
                      <FaDownload />
                      {notification.notificationContent.file.name}
                      <span className="blue-file-size">
                        ({notification.notificationContent.file.size})
                      </span>
                    </button>
                  </div>
                )}

                {/* Notification Metadata */}
                <div className="blue-notification-meta">
                  <span className="blue-notification-date">
                    {new Date(
                      notification.notificationDates.dateCreated
                    ).toLocaleDateString()}
                  </span>
                  <span className="blue-notification-type">
                    {notification.notificationType}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="blue-notification-actions">
                  {/* Link Button */}
                  {notification.notificationContent.link && (
                    <button
                      className="blue-action-btn blue-link-btn"
                      onClick={() =>
                        handleOpenLink(notification.notificationContent.link)
                      }
                    >
                      <FaExternalLinkAlt />
                      View Details
                    </button>
                  )}

                  {/* Read/Unread Toggle */}
                  {notification.notificationStatus === "unread" ? (
                    <button
                      className="blue-action-btn blue-read-btn"
                      onClick={() =>
                        handleMarkAsRead(notification.notificationId)
                      }
                    >
                      <FaEye />
                      Mark Read
                    </button>
                  ) : (
                    <button
                      className="blue-action-btn blue-unread-btn"
                      onClick={() =>
                        handleMarkAsUnread(notification.notificationId)
                      }
                    >
                      <FaEyeSlash />
                      Mark Unread
                    </button>
                  )}

                  {/* Archive Button */}
                  <button
                    className="blue-action-btn blue-archive-btn"
                    onClick={() => handleArchive(notification.notificationId)}
                  >
                    <FaArchive />
                    Archive
                  </button>

                  {/* Delete/Dismiss Button */}
                  {notification.isDismissible && (
                    <button
                      className="blue-action-btn blue-delete-btn"
                      onClick={() => handleDismiss(notification.notificationId)}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Actions */}
      {notifications.length > 0 && (
        <div className="blue-notifications-footer">
          <button
            className="blue-footer-btn blue-mark-all-read"
            onClick={() =>
              notifications.forEach((n) => handleMarkAsRead(n.notificationId))
            }
          >
            Mark All as Read
          </button>
          <button
            className="blue-footer-btn blue-clear-all"
            onClick={() => setNotifications([])}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
