// src/utils/notifications.js

export const mockedNotifications = [
  // General System Notification
  {
    notificationId: "notif_001",
    notificationAudience: "general",
    notificationTarget: [],
    notificationType: "system",
    notificationPriority: "medium",
    notificationStatus: "unread",
    notificationContent: {
      title: {
        en: "System Maintenance",
        fr: "Maintenance du Système",
        sw: "Matengenezo ya Mfumo"
      },
      message: {
        en: "The platform will undergo maintenance on Saturday from 2-4 AM.",
        fr: "La plateforme subira une maintenance samedi de 2h à 4h du matin.",
        sw: "Jukwaa litafanyiwa matengenezo Jumamosi kutoka saa 2-4 asubuhi."
      },
      image: null,
      link: null,
      file: null,
      icon: "🔧",
    },
    notificationDates: {
      dateCreated: "2025-01-15T10:00:00Z",
      dateRead: null,
      expiryDate: "2025-01-20T23:59:59Z",
    },
    isDismissible: true,
  },

  // Job Alert - General
  {
    notificationId: "notif_002",
    notificationAudience: "general",
    notificationTarget: [],
    notificationType: "job",
    notificationPriority: "medium",
    notificationStatus: "unread",
    notificationContent: {
      title: {
        en: "New Remote Jobs Available",
        fr: "Nouveaux Emplois à Distance Disponibles",
        sw: "Kazi Mpya za Mbali Zinapatikana"
      },
      message: {
        en: "Explore 50+ new remote positions in our updated job listings.",
        fr: "Découvrez 50+ nouveaux postes à distance dans nos offres d'emploi mises à jour.",
        sw: "Gundua zaidi ya nafasi 50 za kazi za mbali katika orodha yetu iliyosasishwa ya kazi."
      },
      image: "/images/remote-jobs.jpg",
      link: "/jobs?type=remote",
      file: null,
      icon: "💼",
    },
    notificationDates: {
      dateCreated: "2025-01-14T09:30:00Z",
      dateRead: null,
      expiryDate: null,
    },
    isDismissible: true,
  },

  // Application Update - Specific User
  {
    notificationId: "notif_003",
    notificationAudience: "specific",
    notificationTarget: ["u12345"],
    notificationType: "application",
    notificationPriority: "high",
    notificationStatus: "unread",
    notificationContent: {
      title: {
        en: "Application Viewed",
        fr: "Candidature Consultée",
        sw: "Ombi Limeangaliwa"
      },
      message: {
        en: "Your application for 'Senior Frontend Developer' has been viewed by the employer.",
        fr: "Votre candidature pour 'Développeur Frontend Senior' a été consultée par l'employeur.",
        sw: "Ombi lako la 'Senior Frontend Developer' limeangaliwa na mwajiri."
      },
      image: null,
      link: "/my-applications",
      file: null,
      icon: "👀",
    },
    notificationDates: {
      dateCreated: "2025-01-15T14:20:00Z",
      dateRead: null,
      expiryDate: "2025-01-30T23:59:59Z",
    },
    isDismissible: false,
  },

  // Urgent Warning - Specific User
  {
    notificationId: "notif_004",
    notificationAudience: "specific",
    notificationTarget: ["u12345"],
    notificationType: "warning",
    notificationPriority: "urgent",
    notificationStatus: "unread",
    notificationContent: {
      title: {
        en: "Low Token Balance",
        fr: "Solde de Jetons Faible",
        sw: "Salio la Tokeni Ni Ndogo"
      },
      message: {
        en: "You have only 1 apply token remaining. Purchase more to continue applying.",
        fr: "Il ne vous reste qu'1 jeton d'application. Achetez-en plus pour continuer à postuler.",
        sw: "Una tokeni moja tu ya kuomba iliyobaki. Nunua zaidi ili uendelee kuomba kazi."
      },
      image: null,
      link: "/tokens",
      file: null,
      icon: "⚠️",
    },
    notificationDates: {
      dateCreated: "2025-01-15T16:45:00Z",
      dateRead: null,
      expiryDate: null,
    },
    isDismissible: false,
  },

  // Success Notification - Specific User
  {
    notificationId: "notif_005",
    notificationAudience: "specific",
    notificationTarget: ["u12346"],
    notificationType: "success",
    notificationPriority: "medium",
    notificationStatus: "unread",
    notificationContent: {
      title: {
        en: "Job Posted Successfully",
        fr: "Emploi Publié avec Succès",
        sw: "Kazi Imetangazwa Kikamilifu"
      },
      message: {
        en: "Your job 'React Developer' has been published and is now visible to applicants.",
        fr: "Votre emploi 'Développeur React' a été publié et est maintenant visible par les candidats.",
        sw: "Kazi yako ya 'React Developer' imechapishwa na sasa inaonekana kwa waombaji."
      },
      image: null,
      link: "/my-jobs",
      file: null,
      icon: "🎉",
    },
    notificationDates: {
      dateCreated: "2025-01-15T11:15:00Z",
      dateRead: null,
      expiryDate: null,
    },
    isDismissible: true,
  },

  // Info Notification with File - General
  {
    notificationId: "notif_006",
    notificationAudience: "general",
    notificationTarget: [],
    notificationType: "info",
    notificationPriority: "low",
    notificationStatus: "read",
    notificationContent: {
      title: {
        en: "User Guide Updated",
        fr: "Guide Utilisateur Mis à Jour",
        sw: "Mwongozo wa Mtumiaji Umesasishwa"
      },
      message: {
        en: "Download our updated user guide with new features and tips.",
        fr: "Téléchargez notre guide utilisateur mis à jour avec de nouvelles fonctionnalités et astuces.",
        sw: "Pakua mwongozo wetu wa mtumiaji uliosasishwa na vipengele vipya na vidokezo."
      },
      image: null,
      link: null,
      file: {
        name: "BlueJobs_Guide_v2.pdf",
        url: "/files/guide.pdf",
        size: "2.4 MB"
      },
      icon: "📚",
    },
    notificationDates: {
      dateCreated: "2025-01-10T08:00:00Z",
      dateRead: "2025-01-12T14:30:00Z",
      expiryDate: null,
    },
    isDismissible: true,
  }
];

// Helper functions
export const getNotificationsForUser = (userId, language = "en") => {
  return mockedNotifications
    .filter(notification => 
      notification.notificationAudience === "general" || 
      notification.notificationTarget.includes(userId)
    )
    .map(notification => ({
      ...notification,
      notificationContent: {
        ...notification.notificationContent,
        title: notification.notificationContent.title[language] || notification.notificationContent.title.en,
        message: notification.notificationContent.message[language] || notification.notificationContent.message.en
      }
    }));
};

export const getUnreadNotificationsCount = (userId) => {
  const userNotifications = mockedNotifications.filter(notification => 
    notification.notificationAudience === "general" || 
    notification.notificationTarget.includes(userId)
  );
  return userNotifications.filter(notif => notif.notificationStatus === "unread").length;
};

export const markNotificationAsRead = (notificationId, userId) => {
  const notification = mockedNotifications.find(notif => notif.notificationId === notificationId);
  if (notification && 
      (notification.notificationAudience === "general" || 
       notification.notificationTarget.includes(userId))) {
    notification.notificationStatus = "read";
    notification.notificationDates.dateRead = new Date().toISOString();
    return true;
  }
  return false;
};

export const dismissNotification = (notificationId, userId) => {
  const notification = mockedNotifications.find(notif => notif.notificationId === notificationId);
  if (notification && 
      (notification.notificationAudience === "general" || 
       notification.notificationTarget.includes(userId)) &&
      notification.isDismissible) {
    notification.notificationStatus = "dismissed";
    return true;
  }
  return false;
};

export const getNotificationIcon = (notificationType) => {
  const icons = {
    system: "🔧",
    job: "💼",
    application: "📝",
    warning: "⚠️",
    info: "ℹ️",
    success: "🎉"
  };
  return icons[notificationType] || "📢";
};

// Constants
export const NOTIFICATION_TYPES = {
  SYSTEM: "system",
  JOB: "job", 
  APPLICATION: "application",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success"
};

export const NOTIFICATION_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium", 
  HIGH: "high",
  URGENT: "urgent"
};

export const NOTIFICATION_STATUS = {
  UNREAD: "unread",
  READ: "read",
  DISMISSED: "dismissed",
  ARCHIVED: "archived"
};