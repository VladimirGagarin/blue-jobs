/**
 * Notification Utility Module
 * Creates standardized notification objects for the user notification system
 */

// Notification types
export const NOTIFICATION_TYPES = {
  ALERT: 'alert',
  SUCCESS: 'success', 
  NORMAL: 'normal',
  INFO: 'info',
  WARNING: 'warning'
};

// Notification categories for organization
export const NOTIFICATION_CATEGORIES = {
  JOB_APPLICATION: 'job_application',
  JOB_POSTING: 'job_posting',
  SYSTEM: 'system',
  PROFILE: 'profile',
  TOKEN: 'token'
};

// Supported languages
export const NOTIFICATION_LANGUAGES = {
  ENGLISH: 'en',
  FRENCH: 'fr'
};

// Multi-language notification texts
export const NOTIFICATION_TEXTS = {
  // Job Application related
  JOB_APPLICATION_SUBMITTED: {
    en: (jobTitle) => `Your application for "${jobTitle}" has been submitted successfully!`,
    fr: (jobTitle) => `Votre candidature pour "${jobTitle}" a été soumise avec succès !`
  },
  JOB_APPLICATION_STATUS_UPDATE: {
    en: (jobTitle, status) => `Your application for "${jobTitle}" has been ${status}.`,
    fr: (jobTitle, status) => `Votre candidature pour "${jobTitle}" a été ${getFrenchStatus(status)}.`
  },

  // Job Posting related
  JOB_POSTING_CREATED: {
    en: (jobTitle) => `Your job posting "${jobTitle}" has been published!`,
    fr: (jobTitle) => `Votre offre d'emploi "${jobTitle}" a été publiée !`
  },
  JOB_POSTING_EXPIRED: {
    en: (jobTitle) => `Your job posting "${jobTitle}" has expired.`,
    fr: (jobTitle) => `Votre offre d'emploi "${jobTitle}" a expiré.`
  },

  // Token related
  TOKEN_ADDED: {
    en: (tokenType, amount) => `You've received ${amount} ${tokenType} ${amount > 1 ? 'tokens' : 'token'}!`,
    fr: (tokenType, amount) => `Vous avez reçu ${amount} ${getFrenchTokenType(tokenType)} ${amount > 1 ? 'jetons' : 'jeton'} !`
  },
  TOKEN_USED: {
    en: (tokenType, purpose) => `You used 1 ${tokenType} token for ${purpose}.`,
    fr: (tokenType, purpose) => `Vous avez utilisé 1 jeton ${getFrenchTokenType(tokenType)} pour ${getFrenchPurpose(purpose)}.`
  },

  // System notifications
  WELCOME_MESSAGE: {
    en: (userName) => `Welcome to BlueJobs, ${userName}! Your account has been created successfully.`,
    fr: (userName) => `Bienvenue sur BlueJobs, ${userName} ! Votre compte a été créé avec succès.`
  },
  PROFILE_UPDATED: {
    en: () => 'Your profile has been updated successfully!',
    fr: () => 'Votre profil a été mis à jour avec succès !'
  },

  // Alert notifications
  LOW_TOKENS: {
    en: (tokenType, remaining) => `Low ${tokenType} tokens! You have only ${remaining} left.`,
    fr: (tokenType, remaining) => `Faible en jetons ${getFrenchTokenType(tokenType)} ! Il vous en reste seulement ${remaining}.`
  },
  SECURITY_ALERT: {
    en: (message) => `Security Alert: ${message}`,
    fr: (message) => `Alerte de sécurité : ${message}`
  }
};

// Helper functions for French translations
const getFrenchStatus = (status) => {
  const statusMap = {
    'reviewed': 'examinée',
    'accepted': 'acceptée',
    'rejected': 'rejetée',
    'shortlisted': 'présélectionnée'
  };
  return statusMap[status.toLowerCase()] || status;
};

const getFrenchTokenType = (tokenType) => {
  const tokenMap = {
    'post': 'de publication',
    'apply': 'de candidature',
    'premium': 'premium'
  };
  return tokenMap[tokenType.toLowerCase()] || tokenType;
};

const getFrenchPurpose = (purpose) => {
  const purposeMap = {
    'job posting': 'la publication d\'offre',
    'job application': 'la candidature',
    'premium upgrade': 'la mise à niveau premium'
  };
  return purposeMap[purpose.toLowerCase()] || purpose;
};

/**
 * Creates a new notification object
 * @param {string} type - Type of notification (alert, success, normal, info, warning)
 * @param {Object} text - Text content in multiple languages {en: '', fr: ''}
 * @param {string|null} photo - URL to an optional photo/icon
 * @param {string|null} link - URL for optional action link
 * @param {string} category - Category for organizing notifications
 * @param {boolean} isRead - Whether the notification has been read
 * @param {string} language - Preferred language (en/fr)
 * @returns {Object} Complete notification object
 */
export const createNotification = (
  type = NOTIFICATION_TYPES.NORMAL,
  text = { en: '', fr: '' },
  photo = null,
  link = null,
  category = NOTIFICATION_CATEGORIES.SYSTEM,
  isRead = false,
  language = NOTIFICATION_LANGUAGES.ENGLISH
) => {
  // Validate notification type
  if (!Object.values(NOTIFICATION_TYPES).includes(type)) {
    console.warn(`Invalid notification type: ${type}. Defaulting to 'normal'.`);
    type = NOTIFICATION_TYPES.NORMAL;
  }

  // Validate language
  if (!Object.values(NOTIFICATION_LANGUAGES).includes(language)) {
    console.warn(`Invalid language: ${language}. Defaulting to 'en'.`);
    language = NOTIFICATION_LANGUAGES.ENGLISH;
  }

  return {
    id: generateNotificationId(),
    type: type,
    content: {
      text: text, // Now contains both en and fr properties
      photo: photo,
      link: link
    },
    category: category,
    isRead: isRead,
    language: language, // Store the language preference
    dateCreated: new Date().toISOString()
  };
};

/**
 * Gets the appropriate text for a notification based on language
 * @param {Object} content - Notification content object
 * @param {string} language - Preferred language (en/fr)
 * @returns {string} The text in the specified language
 */
export const getNotificationText = (content, language = NOTIFICATION_LANGUAGES.ENGLISH) => {
  if (typeof content.text === 'string') {
    return content.text; // Backward compatibility
  }
  
  return content.text[language] || content.text.en || content.text.fr || '';
};

/**
 * Generates a unique ID for each notification
 * @returns {string} Unique notification ID
 */
const generateNotificationId = () => {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Pre-defined notification templates for common scenarios
 */
export const NotificationTemplates = {
  // Job Application related
  jobApplicationSubmitted: (jobTitle, jobId, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        en: NOTIFICATION_TEXTS.JOB_APPLICATION_SUBMITTED.en(jobTitle),
        fr: NOTIFICATION_TEXTS.JOB_APPLICATION_SUBMITTED.fr(jobTitle)
      },
      null,
      `/jobs/${jobId}`,
      NOTIFICATION_CATEGORIES.JOB_APPLICATION,
      false,
      language
    ),

  jobApplicationStatusUpdate: (jobTitle, status, jobId, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.INFO,
      {
        en: NOTIFICATION_TEXTS.JOB_APPLICATION_STATUS_UPDATE.en(jobTitle, status),
        fr: NOTIFICATION_TEXTS.JOB_APPLICATION_STATUS_UPDATE.fr(jobTitle, status)
      },
      null,
      `/jobs/${jobId}`,
      NOTIFICATION_CATEGORIES.JOB_APPLICATION,
      false,
      language
    ),

  // Job Posting related
  jobPostingCreated: (jobTitle, jobId, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        en: NOTIFICATION_TEXTS.JOB_POSTING_CREATED.en(jobTitle),
        fr: NOTIFICATION_TEXTS.JOB_POSTING_CREATED.fr(jobTitle)
      },
      null,
      `/jobs/${jobId}`,
      NOTIFICATION_CATEGORIES.JOB_POSTING,
      false,
      language
    ),

  jobPostingExpired: (jobTitle, jobId, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.WARNING,
      {
        en: NOTIFICATION_TEXTS.JOB_POSTING_EXPIRED.en(jobTitle),
        fr: NOTIFICATION_TEXTS.JOB_POSTING_EXPIRED.fr(jobTitle)
      },
      null,
      `/jobs/${jobId}`,
      NOTIFICATION_CATEGORIES.JOB_POSTING,
      false,
      language
    ),

  // Token related
  tokenAdded: (tokenType, amount, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        en: NOTIFICATION_TEXTS.TOKEN_ADDED.en(tokenType, amount),
        fr: NOTIFICATION_TEXTS.TOKEN_ADDED.fr(tokenType, amount)
      },
      null,
      '/profile',
      NOTIFICATION_CATEGORIES.TOKEN,
      false,
      language
    ),

  tokenUsed: (tokenType, purpose, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.INFO,
      {
        en: NOTIFICATION_TEXTS.TOKEN_USED.en(tokenType, purpose),
        fr: NOTIFICATION_TEXTS.TOKEN_USED.fr(tokenType, purpose)
      },
      null,
      '/profile',
      NOTIFICATION_CATEGORIES.TOKEN,
      false,
      language
    ),

  // System notifications
  welcomeMessage: (userName, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        en: NOTIFICATION_TEXTS.WELCOME_MESSAGE.en(userName),
        fr: NOTIFICATION_TEXTS.WELCOME_MESSAGE.fr(userName)
      },
      null,
      '/guest',
      NOTIFICATION_CATEGORIES.SYSTEM,
      false,
      language
    ),

  profileUpdated: (language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.SUCCESS,
      {
        en: NOTIFICATION_TEXTS.PROFILE_UPDATED.en(),
        fr: NOTIFICATION_TEXTS.PROFILE_UPDATED.fr()
      },
      null,
      '/profile',
      NOTIFICATION_CATEGORIES.PROFILE,
      false,
      language
    ),

  // Alert notifications
  lowTokens: (tokenType, remaining, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.ALERT,
      {
        en: NOTIFICATION_TEXTS.LOW_TOKENS.en(tokenType, remaining),
        fr: NOTIFICATION_TEXTS.LOW_TOKENS.fr(tokenType, remaining)
      },
      null,
      '/premium?purchase=job_tokens',
      NOTIFICATION_CATEGORIES.TOKEN,
      false,
      language
    ),

  securityAlert: (message, language = 'en') => 
    createNotification(
      NOTIFICATION_TYPES.ALERT,
      {
        en: NOTIFICATION_TEXTS.SECURITY_ALERT.en(message),
        fr: NOTIFICATION_TEXTS.SECURITY_ALERT.fr(message)
      },
      null,
      null,
      NOTIFICATION_CATEGORIES.SYSTEM,
      false,
      language
    )
};

/**
 * Utility function to mark notifications as read
 * @param {Array} notifications - Array of notification objects
 * @param {string|Array} notificationIds - Single ID or array of IDs to mark as read
 * @returns {Array} Updated notifications array
 */
export const markAsRead = (notifications, notificationIds) => {
  const idsToMark = Array.isArray(notificationIds) ? notificationIds : [notificationIds];
  
  return notifications.map(notification => 
    idsToMark.includes(notification.id) 
      ? { ...notification, isRead: true }
      : notification
  );
};

/**
 * Utility function to filter notifications by type/category
 * @param {Array} notifications - Array of notification objects
 * @param {string} filterBy - Type or category to filter by
 * @returns {Array} Filtered notifications array
 */
export const filterNotifications = (notifications, filterBy) => {
  return notifications.filter(notification => 
    notification.type === filterBy || notification.category === filterBy
  );
};

/**
 * Utility function to get unread notifications count
 * @param {Array} notifications - Array of notification objects
 * @returns {number} Count of unread notifications
 */
export const getUnreadCount = (notifications) => {
  return notifications.filter(notification => !notification.isRead).length;
};

/**
 * Utility function to change notification language
 * @param {Array} notifications - Array of notification objects
 * @param {string} newLanguage - New language (en/fr)
 * @returns {Array} Notifications with updated language preference
 */
export const changeNotificationsLanguage = (notifications, newLanguage) => {
  return notifications.map(notification => ({
    ...notification,
    language: newLanguage
  }));
};

export default {
  createNotification,
  getNotificationText,
  NotificationTemplates,
  NOTIFICATION_TYPES,
  NOTIFICATION_CATEGORIES,
  NOTIFICATION_LANGUAGES,
  NOTIFICATION_TEXTS,
  markAsRead,
  filterNotifications,
  getUnreadCount,
  changeNotificationsLanguage
};