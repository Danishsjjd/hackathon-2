const mongoose = require("mongoose");
const Joi = require("joi");

// inStock => removed
// offerPrice => removed
// isSold => added

const productsSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			enum: {
				values: [
					"Apartment",
					"villa",
					"Studio",
					"Townhouse",
					"Twin house",
					"house",
				],
				message: "category is not valid",
			},
			required: true,
		},
		description: {
			type: String,
			required: [true, "descriptions is required"],
			trim: true,
		},
		title: {
			type: String,
			required: [true, "title is required"],
			trim: true,
		},
		images: [
			{
				public_id: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
		price: {
			type: Number,
			required: [true, "Please add a price for your product"],
			maxLength: [8, "Price can not exceed than 8 characters"],
		},
		ratings: {
			type: Number,
			default: 0,
		},
		reviews: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "reviews",
		},
		isSold: {
			type: Boolean,
			required: true,
			default: false,
		},
		location: {
			type: String,
			required: true,
		},
		Bathrooms: {
			type: Number,
			required: true,
			default: 0,
		},
		livingRoom: {
			type: Number,
			required: true,
			default: 0,
		},
		phoneNumber: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Products = mongoose.model("products", productsSchema);

function validateProductCreate(obj) {
	const schema = Joi.object({
		title: Joi.string().required("Title is required"),
		images: Joi.array(),
		category: Joi.string().required("category is required"),
		description: Joi.string().required("descriptions is required"),
		price: Joi.number()
			.max(99999999)
			.required()
			.messages({ "number.max": "exceed than 8 characters" }),
		livingRoom: Joi.number().required(),
		Bathrooms: Joi.number().required(),
		location: Joi.string().required(),
		phoneNumber: Joi.number().min(11).required(),
	});
	return schema.validate(obj);
}

function validateProductUpdate(obj) {
	const schema = Joi.object({
		category: Joi.string(),
		description: Joi.string(),
		title: Joi.string(),
		images: Joi.array(),
		price: Joi.number()
			.max(99999999)
			.required()
			.messages({ "number.max": "exceed than 8 characters" }),
		offerPrice: Joi.number().max(9999),
		inStock: Joi.number().required().min(1).messages({
			"number.min": "must be in stock",
			"number.required": "must be in stock",
		}),
	});
	return schema.validate(obj);
}

module.exports = { Products, validateProductCreate, validateProductUpdate };
