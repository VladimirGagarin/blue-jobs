export function const review = {
  dateCreated: "2024-01-15T10:30:00Z", // ISO 8601 format
  dateModified: "2024-01-20T14:45:00Z", // ISO 8601 format
  rate: 8, // number from 1 to 10
  reviewId: "rev_abc123xyz789", // unique identifier
  reviewCreator: "user_123456789", // userId of the person creating review
  
  // Additional fields that would be useful for a picture review system:
  pictureId: "pic_987654321", // ID of the picture being reviewed
  pictureUrl: "https://example.com/images/photo123.jpg", // URL to the picture
  caption: "Great composition and colors!", // optional text review
  tags: ["portrait", "professional", "well-lit"], // relevant tags
  isPublic: true, // visibility setting
  helpfulCount: 5, // number of users who found this helpful
  reportCount: 0, // number of times reported
  status: "active", // active, flagged, removed, etc.
  reviewType: "technical", // technical, aesthetic, overall, etc.
  aspectRatings: { // breakdown of ratings by aspect
    composition: 9,
    lighting: 7,
    originality: 8,
    technical: 7
  }
};