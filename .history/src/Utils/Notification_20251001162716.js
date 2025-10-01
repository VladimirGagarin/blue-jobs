// src/utils/notifications.js

export const mockedNotifications = [
  // General notifications (for all users)
  {
    notificationId: "notif_001",
    notificationAudience: "general", // "general" or "specific"
    notificationTarget: [], // empty array for general notifications
    notificationType: "system", // "system", "job", "application", "warning", "info", "success"
    notificationPriority: "medium", // "low", "medium", "high", "urgent"
    notificationStatus: "unread", // "unread", "read", "dismissed", "archived"
    notificationContent: {
      title: "System Maintenance",
      message: "The platform will undergo maintenance on Saturday from 2-4 AM.",
      image: null,
      link: "/announcements/maintenance",
      file: null,
      actionLabel: "View Details",
      icon: "🔧",
    },
    notificationDates: {
      dateCreated: "2025-01-15T10:00:00Z",
      dateRead: null,
      expiryDate: "2025-01-20T23:59:59Z",
    },
    notificationMetadata: {
      createdBy: "system",
      category: "maintenance",
      tags: ["system", "maintenance"],
      isDismissible: true,
    },
  },

  // Job-specific notifications
  {
    notificationId: "notif_002",
    notificationAudience: "general",
    notificationTarget: [],
    notificationType: "job",
    notificationPriority: "medium",
    notificationStatus: "unread",
    notificationContent: {
      title: "New Job Category Added",
      message: "We've added a new 'Remote Work' category with 50+ remote jobs!",
      image: "/images/remote-work.jpg",
      link: "/jobs?category=remote",
      file: null,
      actionLabel: "Browse Jobs",
      icon: "💼",
    },
    notificationDates: {
      dateCreated: "2025-01-14T09:30:00Z",
      dateRead: null,
      expiryDate: null,
    },
    notificationMetadata: {
      createdBy: "admin",
      category: "feature-update",
      tags: ["jobs", "remote-work", "new-feature"],
      isDismissible: true,
    },
  },

  // User-specific notifications
  {
    notificationId: "notif_003",
    notificationAudience: "specific",
    notificationTarget: ["u12345", "u12346", "u12347"], // specific user IDs
    notificationType: "application",
    notificationPriority: "high",
    notificationStatus: "unread",
    notificationContent: {
      title: "Application Status Update",
      message:
        "Your application for 'Senior Frontend Developer' has been viewed by the employer.",
      image: null,
      link: "/applications/status/app_2024X",
      file: null,
      actionLabel: "View Application",
      icon: "👀",
    },
    notificationDates: {
      dateCreated: "2025-01-15T14:20:00Z",
      dateRead: null,
      expiryDate: "2025-01-30T23:59:59Z",
    },
    notificationMetadata: {
      createdBy: "system",
      category: "application-update",
      tags: ["application", "viewed"],
      isDismissible: false,
      relatedJobId: "bj_100A",
      relatedApplicationId: "app_2024X",
    },
  },

  // Urgent notification
  {
    notificationId: "notif_004",
    notificationAudience: "specific",
    notificationTarget: ["u12345"], // single user
    notificationType: "warning",
    notificationPriority: "urgent",
    notificationStatus: "unread",
    notificationContent: {
      title: "Token Balance Low",
      message:
        "You have only 1 apply token remaining. Consider purchasing more tokens to continue applying for jobs.",
      image: null,
      link: "/tokens/purchase",
      file: null,
      actionLabel: "Buy Tokens",
      icon: "⚠️",
    },
    notificationDates: {
      dateCreated: "2025-01-15T16:45:00Z",
      dateRead: null,
      expiryDate: null,
    },
    notificationMetadata: {
      createdBy: "system",
      category: "token-warning",
      tags: ["tokens", "warning", "urgent"],
      isDismissible: false,
      requiresAction: true,
       relatedJobId: null,
    },
  },

  // Success notification
  {
    notificationId: "notif_005",
    notificationAudience: "specific",
    notificationTarget: ["u12346"],
    notificationType: "success",
    notificationPriority: "medium",
    notificationStatus: "unread",
    notificationContent: {
      title: "Job Posted Successfully!",
      message:
        "Your job 'React Developer' has been published and is now visible to applicants.",
      image: null,
      link: "/my-jobs",
      file: null,
      actionLabel: "View Job",
      icon: "🎉",
    },
    notificationDates: {
      dateCreated: "2025-01-15T11:15:00Z",
      dateRead: null,
      expiryDate: null,
    },
    notificationMetadata: {
      createdBy: "system",
      category: "job-posted",
      tags: ["success", "job-posting"],
      isDismissible: true,
      relatedJobId: "bj_200B",
      
    },
  },

  // Information notification with file
  {
    notificationId: "notif_006",
    notificationAudience: "general",
    notificationTarget: [],
    notificationType: "info",
    notificationPriority: "low",
    notificationStatus: "read",
    notificationContent: {
      title: "New User Guide Available",
      message:
        "Check out our updated user guide with tips for job seekers and employers.",
      image: "/images/guide-cover.jpg",
      link: null,
      file: {
        name: "BlueJobs_User_Guide_v2.pdf",
        url: "/files/BlueJobs_User_Guide_v2.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
      actionLabel: "Download Guide",
      icon: "📚",
    },
    notificationDates: {
      dateCreated: "2025-01-10T08:00:00Z",
      dateRead: "2025-01-12T14:30:00Z",
      expiryDate: null,
    },
    notificationMetadata: {
      createdBy: "admin",
      category: "documentation",
      tags: ["guide", "help", "documentation"],
      isDismissible: true,
      relatedJobId: null,
    },
  },
];
