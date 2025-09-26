// Utils/notifications.js
export const createNotification = (
  type,
  priority,
  content,
  cause = "",
  language = "en"
) => {
  // Language-specific content templates
  const notificationTemplates = {
    en: {
      REVIEW_REPORTED:
        'A user reported your review for: "{reason}". Please review our content guidelines.',
      JOB_APPLICATION_STATUS: "Your job application status has been updated.",
      NEW_MESSAGE: "You have a new message from an employer.",
      SYSTEM_ALERT: "Important system update notification.",
      CONTENT_GUIDELINES_LINK: "/?policies",
      MESSAGES_LINK: "/messages",
      APPLICATIONS_LINK: "/my-applications",
    },
    fr: {
      REVIEW_REPORTED:
        'Un utilisateur a signalé votre avis pour : "{reason}". Veuillez consulter nos directives de contenu.',
      JOB_APPLICATION_STATUS:
        "Le statut de votre candidature a été mis à jour.",
      NEW_MESSAGE: "Vous avez un nouveau message d'un employeur.",
      SYSTEM_ALERT: "Notification importante de mise à jour du système.",
      CONTENT_GUIDELINES_LINK: "/politiques",
      MESSAGES_LINK: "/messages",
      APPLICATIONS_LINK: "/mes-candidatures",
    },
  };

  const templates = notificationTemplates[language] || notificationTemplates.en;

  // Process content text with template replacements
  const processText = (text, reason = "") => {
    return text.replace("{reason}", reason);
  };

  return {
    notificationId: `notif_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    type,
    priority,
    language, // Store the language for display purposes
    content: {
      image: content.image || null,
      text: processText(content.text, content.reason),
      cause: cause,
      link: content.link || null,
    },
    dateCreated: new Date().toISOString(),
    isRead: false,
  };
};

// Predefined notification templates with language support
export const NOTIFICATION_TEMPLATES = {
  REVIEW_REPORTED: (reason = "", language = "en") => ({
    type: "Alert",
    priority: 1,
    content: {
      text:
        language === "fr"
          ? `Un utilisateur a signalé votre avis pour : \"${reason}\". Veuillez consulter nos directives de contenu.`
          : `A user reported your review for: \"${reason}\". Please review our content guidelines.`,
      reason: reason,
      link: language === "fr" ? "/politiques" : "/policies",
    },
    cause: "Report",
  }),

  JOB_APPLICATION_STATUS: (language = "en") => ({
    type: "Update",
    priority: 0,
    content: {
      text:
        language === "fr"
          ? "Le statut de votre candidature a été mis à jour."
          : "Your job application status has been updated.",
      link: language === "fr" ? "/mes-candidatures" : "/my-applications",
    },
    cause: "Application",
  }),

  NEW_MESSAGE: (employerName = "", language = "en") => ({
    type: "Message",
    priority: 1,
    content: {
      text:
        language === "fr"
          ? `Vous avez un nouveau message de ${employerName || "un employeur"}.`
          : `You have a new message from ${employerName || "an employer"}.`,
      link: "/messages",
    },
    cause: "Message",
  }),

  SYSTEM_ALERT: (alertText = "", language = "en") => ({
    type: "System",
    priority: 2,
    content: {
      text:
        alertText ||
        (language === "fr"
          ? "Notification importante de mise à jour du système."
          : "Important system update notification."),
      link: "/announcements",
    },
    cause: "System",
  }),

  WELCOME: (userName = "", language = "en") => ({
    type: "Welcome",
    priority: 0,
    content: {
      text:
        language === "fr"
          ? `Bienvenue sur Blue Jobs, ${
              userName || "cher utilisateur"
            } ! Commencez à explorer les opportunités.`
          : `Welcome to Blue Jobs, ${
              userName || "dear user"
            }! Start exploring opportunities.`,
      link: "/jobs",
    },
    cause: "Welcome",
  }),
};

// Helper function to create localized notifications easily
export const createLocalizedNotification = (
  templateKey,
  options = {},
  language = "en"
) => {
  const template = NOTIFICATION_TEMPLATES[templateKey];
  if (!template) {
    throw new Error(`Notification template ${templateKey} not found`);
  }

  return createNotification(
    template(language).type,
    template(language).priority,
    template(language).content,
    template(language).cause,
    language
  );
};
