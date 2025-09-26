import { useState } from "react";
import DefaultPhoto from "../assets/logo.png";
import { useLanguage } from "./useUser";
import { mockedReviews } from "../Utils/Reviews";
import { mockUsers } from "../Utils/user";
import { useUser } from "./useUser.js";
import { FaEdit, FaTrash, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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

  // Create a map for quick user lookup
  const userMap = new Map(allUsers.map((user) => [user.userId, user]));

  // Combine reviews with user data - REMOVED helpfulCount property
  const reviewsWithUsers = reviews.map((review) => ({
    ...review,
    user: userMap.get(review.reviewCreatorId) || {
      userId: review.reviewCreatorId,
      name: language === "fr" ? "Utilisateur Inconnu" : "Unknown User",
      avatar: DefaultPhoto,
    },
    // Ensure userCertified array exists
    userCertified: Array.isArray(review.userCertified)
      ? review.userCertified
      : [],
    // Check if current user has certified this review
    isCertifiedByUser: Array.isArray(review.userCertified)
      ? review.userCertified.includes(userId)
      : false,
  }));

  // Toggle helpful certification - UPDATED to use userCertified.length directly
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
            // Remove certification
            updatedCertified = currentCertified.filter((id) => id !== userId);
          } else {
            // Add certification
            updatedCertified = [...currentCertified, userId];
          }

          return {
            ...review,
            userCertified: updatedCertified,
            // No helpfulCount property needed anymore
            dateModified: new Date().toISOString(),
          };
        }
        return review;
      })
    );
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

  // Submit new review - UPDATED to not include helpfulCount
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
      userCertified: [], // Empty array to start with
      reportCount: 0,
      // No helpfulCount property
    };

    setReviews((prevReviews) => [review, ...prevReviews]);

    // Reset form
    setNewReview({
      rate: 8,
      caption: "",
    });
    setIsSubmitting(false);
  };

  // Function to render star rating (convert 1-10 scale to 5-star display)
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
    },
  };

  const content = pageContent[language];

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>{content.title}</h1>
        <p className="subtitle">{content.subtitle}</p>
      </div>

      {/* Add Review Form */}
      {userId && (
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
          // Calculate helpful count from userCertified array length
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
                      {review.user.userName} {userId && userId === review.reviewCreatorId ? (language === "fr" ==) : ()}
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
