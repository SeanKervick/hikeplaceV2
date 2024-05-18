import { db } from "../models/db.js";

export const reviewController = {
  addReview: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        const location = await db.locationStore.getLocationById(
          request.params.id
        );

        const newReview = {
          content: request.payload.content,
          rating: request.payload.rating,
          userid: loggedInUser._id,
          location: location._id,
        };

        if (newReview.content && newReview.rating) {
          const review = await db.locationStore.addNewReview(newReview);
          await db.locationStore.addReviewToLocation(location._id, review._id);
        }

        return h.redirect("/public");
      } catch (err) {
        return h.redirect("/public");
      }
    },
  },
};
