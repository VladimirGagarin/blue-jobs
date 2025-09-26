import { useState } from "react";
import DefaultPhoto from "../assets/logo.png";
import { useLanguage } from "./useUser";
import { mockedReviews } from "../Utils/Reviews";
import { mockUsers } from "../Utils/user";
import { useUser } from "./useUser.js";
import {
  FaEdit,
  FaTrash,
  FaThumbsUp,
  FaThumbsDown,
  FaFlag,
} from "react-icons/fa";
import "./Review.css";

export default function ReviewContent() {
  const allUsers = [...mockUsers];
  const [reviews, setReviews] = useState([...mockedReviews]);
  const { language } = useLanguage();
  const { user } = useUser();
  const userId = user?.userId;

  // State for new review form
  const [newReview, setNewReview] = useState({
    rate: 8,
    caption: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for report functionality
  const [reportModal, setReportModal] = useState({
    isOpen: false,
    reviewId: null,
    reason: "",
    customReason: "",
  });

  // Predefined report reasons
  const reportReasons = {
    en: [
      "Inappropriate content",
      "Spam or misleading",
      "Harassment or bullying",
      "False information",
      "Other",
    ],
    fr: [
      "Contenu inapproprié",
      "Spam ou trompeur",
      "Harcèlement ou intimidation",
      "Fausse information",
      "Autre",
    ],
  };

  // Create a map for quick user lookup
  const userMap = new Map(allUsers.map((user) => [user.userId, user]));

  // Combine reviews with user data
  const reviewsWithUsers = reviews.map((review) => ({
    ...review,
    user: userMap.get(review.reviewCreatorId) || {
      userId: review.reviewCreatorId,
      name: language === "fr" ? "Utilisateur Inconnu" : "Unknown User",
      avatar: DefaultPhoto,
    },
    // Ensure arrays exist
    userCertified: Array.isArray(review.userCertified)
      ? review.userCertified
      : [],
    reportsList: Array.isArray(review.reportsList) ? review.reportsList : [],
    // Check if current user has certified this review
    isCertifiedByUser: Array.isArray(review.userCertified)
      ? review.userCertified.includes(userId)
      : false,
    // Check if current user has reported this review
    isReportedByUser: Array.isArray(review.reportsList)
      ? review.reportsList.some((report) => report.userId === userId)
      : false,
    // Calculate counts
    reportCount: Array.isArray(review.reportsList)
      ? review.reportsList.length
      : review.reportCount || 0,
  }));

  // Toggle helpful certification
  const toggleHelpful = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.reviewId === reviewId) {
          const currentCertified = Array.isArray(review.userCertified)
            ? review.userCertified
            : [];
          const isCurrentlyCertified = currentCertified.includes(userId);

          let updatedCertified;
          if (isCurrentlyCertified) {
            updatedCertified = currentCertified.filter((id) => id !== userId);
          } else {
            updatedCertified = [...currentCertified, userId];
          }

          return {
            ...review,
            userCertified: updatedCertified,
            dateModified: new Date().toISOString(),
          };
        }
        return review;
      })
    );
  };

  // Open report modal
  const openReportModal = (reviewId) => {
    const review = reviews.find((r) => r.reviewId === reviewId);
    const isAlreadyReported = review?.reportsList?.some(
      (report) => report.userId === userId
    );

    if (isAlreadyReported) {
      alert(
        language === "fr"
          ? "Vous avez déjà signalé cet avis."
          : "You have already reported this review."
      );
      return;
    }

    setReportModal({
      isOpen: true,
      reviewId,
      reason: "",
      customReason: "",
    });
  };

  // Close report modal
  const closeReportModal = () => {
    setReportModal({
      isOpen: false,
      reviewId: null,
      reason: "",
      customReason: "",
    });
  };

  // Submit report
  const submitReport = () => {
    if (!reportModal.reason) {
      alert(
        language === "fr"
          ? "Veuillez sélectionner une raison."
          : "Please select a reason."
      );
      return;
    }

    if (reportModal.reason === "Other" && !reportModal.customReason.trim()) {
      alert(
        language === "fr"
          ? "Veuillez fournir une raison."
          : "Please provide a reason."
      );
      return;
    }

    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.reviewId === reportModal.reviewId) {
          const newReport = {
            userId: userId,
            reason:
              reportModal.reason === "Other"
                ? reportModal.customReason
                : reportModal.reason,
            dateReported: new Date().toISOString(),
            reportType: reportModal.reason,
          };

          const updatedReports = Array.isArray(review.reportsList)
            ? [...review.reportsList, newReport]
            : [newReport];

          return {
            ...review,
            reportsList: updatedReports,
            dateModified: new Date().toISOString(),
          };
        }
        return review;
      })
    );

    alert(
      language === "fr"
        ? "Merci pour votre signalement. Nous examinerons cet avis."
        : "Thank you for your report. We will review this content."
    );

    closeReportModal();
  };

  // Delete review
  const deleteReview = (reviewId) => {
    if (
      window.confirm(
        language === "fr"
          ? "Êtes-vous sûr de vouloir supprimer cet avis ?"
          : "Are you sure you want to delete this review?"
      )
    ) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
    }
  };

  // Edit review
  const editReview = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review.reviewId === reviewId);
    if (reviewToEdit) {
      setNewReview({
        rate: reviewToEdit.rate,
        caption: reviewToEdit.caption,
      });
      alert(
        language === "fr"
          ? "Mode édition activé. Modifiez votre avis ci-dessous."
          : "Edit mode enabled. Modify your review below."
      );
    }
  };

  // Submit new review
  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.caption.trim()) return;

    setIsSubmitting(true);

    const review = {
      dateCreated: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      rate: newReview.rate,
      reviewId: `rev_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      reviewCreatorId: userId,
      caption: newReview.caption.trim(),
      userCertified: [],
      reportsList: [],
    };

    setReviews((prevReviews) => [review, ...prevReviews]);

    setNewReview({
      rate: 8,
      caption: "",
    });
    setIsSubmitting(false);
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = Math.round((rating / 10) * 5);
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === "fr"
      ? date.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
  };

  const pageContent = {
    en: {
      title: "Customer Reviews",
      subtitle: "See what our users are saying about their experience",
      noReviews: "No reviews yet",
      helpful: "helpful",
      reported: "reported",
      rating: "Rating",
      reviewBy: "Review by",
      updated: "Updated",
      submitReview: "Submit Review",
      yourRating: "Your Rating",
      yourReview: "Your Review",
      writeReview: "Write a review...",
      submit: "Submit",
      submitting: "Submitting...",
      edit: "Edit",
      delete: "Delete",
      markHelpful: "Mark as helpful",
      removeHelpful: "Remove helpful",
      addReviewTitle: "Share Your Experience",
      report: "Report",
      reportTitle: "Report Review",
      reportReason: "Reason for reporting",
      reportCustomPlaceholder: "Please specify the reason...",
      cancel: "Cancel",
      submitReport: "Submit Report",
      alreadyReported: "Already reported",
      selectReason: "Select a reason",
    },
    fr: {
      title: "Avis des Clients",
      subtitle: "Découvrez ce que nos utilisateurs pensent de leur expérience",
      noReviews: "Aucun avis pour le moment",
      helpful: "utile",
      reported: "signalé",
      rating: "Note",
      reviewBy: "Avis par",
      updated: "Mis à jour",
      submitReview: "Soumettre un Avis",
      yourRating: "Votre Note",
      yourReview: "Votre Avis",
      writeReview: "Écrivez un avis...",
      submit: "Soumettre",
      submitting: "Envoi en cours...",
      edit: "Modifier",
      delete: "Supprimer",
      markHelpful: "Marquer comme utile",
      removeHelpful: "Retirer utile",
      addReviewTitle: "Partagez Votre Expérience",
      report: "Signaler",
      reportTitle: "Signaler un Avis",
      reportReason: "Raison du signalement",
      reportCustomPlaceholder: "Veuillez préciser la raison...",
      cancel: "Annuler",
      submitReport: "Soumettre le signalement",
      alreadyReported: "Déjà signalé",
      selectReason: "Sélectionnez une raison",
    },
  };

  const content = pageContent[language];
  const reasons = reportReasons[language];

  return (
    <div className="reviews-page">
      {/* Report Modal */}
      {reportModal.isOpen && (
        <div className="report-modal-overlay">
          <div className="report-modal">
            <h3>{content.reportTitle}</h3>
            <div className="report-form">
              <div className="form-group">
                <label>{content.reportReason}</label>
                <select
                  value={reportModal.reason}
                  onChange={(e) =>
                    setReportModal({ ...reportModal, reason: e.target.value })
                  }
                  className="report-select"
                >
                  <option value="">{content.selectReason}</option>
                  {reasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {reportModal.reason === "Other" ||
                (reportModal.reason === "Autre" && (
                  <div className="form-group">
                    <textarea
                      value={reportModal.customReason}
                      onChange={(e) =>
                        setReportModal({
                          ...reportModal,
                          customReason: e.target.value,
                        })
                      }
                      placeholder={content.reportCustomPlaceholder}
                      className="report-textarea"
                      rows="3"
                    />
                  </div>
                ))}

              <div className="report-actions">
                <button onClick={closeReportModal} className="cancel-btn">
                  {content.cancel}
                </button>
                <button onClick={submitReport} className="submit-report-btn">
                  {content.submitReport}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="reviews-header">
        <h1>{content.title}</h1>
        <p className="subtitle">{content.subtitle}</p>
      </div>

      {/* Add Review Form */}
      {userId && userId !== "guest" && (
        <div className="add-review-section">
          <h3>{content.addReviewTitle}</h3>
          <form onSubmit={submitReview} className="review-form">
            <div className="form-group">
              <label>{content.yourRating}</label>
              <div className="rating-slider">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newReview.rate}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rate: parseInt(e.target.value),
                    })
                  }
                  className="rating-input"
                />
                <span className="rating-value">{newReview.rate}/10</span>
                <span className="stars-preview">
                  {renderStars(newReview.rate)}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>{content.yourReview}</label>
              <textarea
                value={newReview.caption}
                onChange={(e) =>
                  setNewReview({ ...newReview, caption: e.target.value })
                }
                placeholder={content.writeReview}
                className="review-textarea"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !newReview.caption.trim()}
              className="submit-button"
            >
              {isSubmitting ? content.submitting : content.submit}
            </button>
          </form>
        </div>
      )}

      <div className="reviews-grid">
        {reviewsWithUsers.map((review) => {
          const helpfulCount = Array.isArray(review.userCertified)
            ? review.userCertified.length
            : 0;

          return (
            <div key={review.reviewId} className="review-card">
              <div className="review-header">
                <div className="user-info">
                  <img
                    src={review.user.avatar || DefaultPhoto}
                    alt={review.user.name}
                    className="user-avatar"
                  />
                  <div className="user-details">
                    <span className="user-name">
                      {review.user.userName}
                      {userId && userId === review.reviewCreatorId && (
                        <span className="you-indicator">
                          {language === "fr" ? " (Vous)" : " (You)"}
                        </span>
                      )}
                    </span>
                    <span className="review-date">
                      {formatDate(review.dateCreated)}
                    </span>
                  </div>
                </div>

                <div className="review-actions">
                  {/* Edit/Delete buttons for review owner */}
                  {review.reviewCreatorId === userId && (
                    <>
                      <button
                        onClick={() => editReview(review.reviewId)}
                        className="action-btn edit-btn"
                        title={content.edit}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteReview(review.reviewId)}
                        className="action-btn delete-btn"
                        title={content.delete}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}

                  {/* Report button for non-owners and non-guests */}
                  {userId &&
                    userId !== "guest" &&
                    userId !== review.reviewCreatorId && (
                      <button
                        onClick={() => openReportModal(review.reviewId)}
                        className={`action-btn report-btn ${
                          review.isReportedByUser ? "reported" : ""
                        }`}
                        title={
                          review.isReportedByUser
                            ? content.alreadyReported
                            : content.report
                        }
                        disabled={review.isReportedByUser}
                      >
                        <FaFlag />
                      </button>
                    )}

                  <div className="rating-display">
                    <span className="stars">{renderStars(review.rate)}</span>
                    <span className="rating-number">({review.rate}/10)</span>
                  </div>
                </div>
              </div>

              <div className="review-content">
                <p className="review-caption">{review.caption}</p>
              </div>

              <div className="review-footer">
                <div className="review-stats">
                  {/* Helpful toggle button */}
                  {userId && userId !== review.reviewCreatorId && (
                    <button
                      onClick={() => toggleHelpful(review.reviewId)}
                      className={`helpful-toggle ${
                        review.isCertifiedByUser ? "active" : ""
                      }`}
                      title={
                        review.isCertifiedByUser
                          ? content.removeHelpful
                          : content.markHelpful
                      }
                    >
                      {review.isCertifiedByUser ? (
                        <FaThumbsUp />
                      ) : (
                        <FaThumbsDown />
                      )}
                      <span className="helpful-count">
                        {helpfulCount} {content.helpful}
                      </span>
                    </button>
                  )}

                  {!userId || userId === review.reviewCreatorId ? (
                    <span className="helpful-count">
                      {helpfulCount} {content.helpful}
                    </span>
                  ) : null}

                  {review.reportCount > 0 && (
                    <span className="report-count">
                      • {review.reportCount} {content.reported}
                    </span>
                  )}
                </div>

                {review.dateModified !== review.dateCreated && (
                  <span className="updated-date">
                    {content.updated} {formatDate(review.dateModified)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {reviewsWithUsers.length === 0 && (
        <div className="no-reviews">
          <p>{content.noReviews}</p>
        </div>
      )}
    </div>
  );
}
