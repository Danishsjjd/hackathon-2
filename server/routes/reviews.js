const router = require("express").Router();

const {
  createProductReview,
  deleteReview,
  toggleReviewLike,
} = require("../controller/reviews");
const { authentication } = require("../middleware/auth");

router.post("/", authentication, createProductReview);
router.post("/like", authentication, toggleReviewLike);
router.delete("/", authentication, deleteReview); // Q:productId,id(rev)

module.exports = router;
