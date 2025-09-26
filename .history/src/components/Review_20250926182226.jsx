import DefaultPhoto from "../assets/logo.png";
import { useLanguage } from "./useUser";
import { mockedReviews } from "../Utils/Reviews";
import { mockUsers } from "../Utils/user";
import {useUser } from "./useUser.js";
import "./Review.css";

export default function ReviewContent() {
  const allUsers = [...mockUsers];
  const allReviews = [...mockedReviews];
    const { language } = useLanguage();
    const { user } = useUser();
    const userId = user.userId;

  // Create a map for quick user lookup
  const userMap = new Map(allUsers.map((user) => [user.userId, user]));

  // Combine reviews with user data
  const reviewsWithUsers = allReviews.map((review) => ({
    ...review,
    user: userMap.get(review.reviewCreatorId) || {
      userId: review.reviewCreatorId,
      name: language === "fr" ? "Utilisateur Inconnu" : "Unknown User",
      avatar: DefaultPhoto,
    },
  }));

  // Function to render star rating (convert 1-10 scale to 5-star display)
  const renderStars = (rating) => {
    const stars = Math.round((rating / 10) * 5); // Convert 1-10 to 1-5 stars
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
    },
  };

  const content = pageContent[language];

  if (reviewsWithUsers.length === 0) {
    return (
      <div className="reviews-page">
        <div className="reviews-header">
          <h1>{content.title}</h1>
          <p className="subtitle">{content.subtitle}</p>
        </div>
        <div className="no-reviews">
          <p>{content.noReviews}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h1>{content.title}</h1>
        <p className="subtitle">{content.subtitle}</p>
      </div>

      <div className="reviews-grid">
        {reviewsWithUsers.map((review) => (
          <div key={review.reviewId} className="review-card">
            <div className="review-header">
              <div className="user-info">
                <img
                  src={review.user.avatar || DefaultPhoto}
                  alt={review.user.name}
                  className="user-avatar"
                />
                <div className="user-details">
                  <span className="user-name">{review.user.userName}</span>
                  <span className="review-date">
                    {formatDate(review.dateCreated)}
                  </span>
                </div>
              </div>
              <div className="rating-display">
                <span className="stars">{renderStars(review.rate)}</span>
                <span className="rating-number">({review.rate}/10)</span>
              </div>
            </div>

            <div className="review-content">
              <p className="review-caption">{review.caption}</p>
            </div>

            <div className="review-footer">
              <div className="review-stats">
                <span className="helpful-count">
                  {review.helpfulCount} {content.helpful}
                </span>
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
        ))}
      </div>
    </div>
  );
}
