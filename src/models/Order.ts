import { model, Schema } from "mongoose";

const productSchema = new Schema({
  seller: String,
  product: {
    _id: String,
    productId: String,
    productType: String,
    price: Number,
    title: String,
    image: String,
    brand: String,
    maker: String,
    description: String,
    category1: String,
    category2: String,
    category3: String,
    category4: String,
  },
  items: [
    {
      seller: String,
      productId: String,
      quantity: Number,
      price: Number,
      total: Number,
      color: String,
      size: String,
    },
  ],
});

const shippingInfoSchema = new Schema({
  recipent: String,
  address: String,
  method: String,
  phone: String,
  cost: Number,
});

const paymentInfoSchema = new Schema({
  id: String,
  intent: String,
  status: String,
  purchase_units: [
    {
      reference_id: String,
      amount: { currency_code: String, value: String },
      payee: { email_address: String, merchant_id: String },
      shipping: {
        name: { full_name: String },
        address: {
          address_line_1: String,
          admin_area_2: String,
          admin_area_1: String,
          postal_code: String,
          country_code: String,
        },
      },
      payments: {
        captures: [
          {
            id: String,
            status: String,
            final_capture: Boolean,
            amount: { currency_code: String, value: String },
            seller_protection: { status: String, dispute_categories: [String] },
            create_time: String,
            update_time: String,
          },
        ],
      },
    },
  ],
  payer: {
    type: {
      payer_id: String,
      email_address: String,
      name: { given_name: String, surname: String },
      address: { country_code: String },
    },
  },
  links: [{ href: String, rel: String, method: String }],
  create_time: String,
  update_time: String,
});

const orderSchema = new Schema(
  {
    products: [productSchema],
    shippingInfo: shippingInfoSchema,
    paymentInfo: paymentInfoSchema,
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
