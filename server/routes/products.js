const express = require("express");

const { authentication } = require("../middleware/auth");
const {
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
} = require("../controller/products");

const router = express.Router();
router.post("/create", authentication, createProduct);
router.delete("/delete/:id", authentication, deleteProduct);
router.put("/update/:id", authentication, updateProduct);
router.get("/:id", getSingleProduct);
router.get("/", getAllProducts);

module.exports = router;
