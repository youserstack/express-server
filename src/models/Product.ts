import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productType: { type: String, required: true },
    price: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    maker: { type: String, required: true },
    seller: { type: String, required: true },
    description: { type: String, required: true },
    category1: { type: String, required: true },
    category2: { type: String },
    category3: { type: String },
    category4: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
