const express = require("express");
const router = express.Router({mergeParams: true});
const catchAsync = require("../utils/catchAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const review = require("../controllers/reviewcontroller.js");


router.post("/", isLoggedIn, validateReview, catchAsync(review.createReview))


router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router;