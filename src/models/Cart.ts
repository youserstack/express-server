import mongoose from "mongoose";

// const optionSchema = new mongoose.Schema({
//   color: { type: String },
//   size: { type: String },
// });

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String },
  size: { type: String },

  //   options: {
  //     type: [optionSchema],
  //     required: true,
  //   },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [itemSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

// items: [
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true },
//     color: { type: Number },
//     size: { type: Number },
//   },
// ],
