import Order from "../models/Order";
import { NextFunction, Request, Response } from "express";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { products, shippingInfo, paymentInfo } = req.body;
    const order = await Order.create({ products, shippingInfo, paymentInfo });
    console.log({ order });
    res.status(200).json(order);
  } catch (error) {
    console.error("createOrder error", error);
    res.status(500).json({ message: "createOrder error" });
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    if (isNaN(limit) || limit <= 0) return res.status(400).json({ message: "Invalid limit value" });
    const orders = await Order.find().limit(limit).lean(); // lean 을 사용해서 origin data 를 리턴받는다.
    console.log({ orders });
    res.status(200).json(orders);
  } catch (error) {
    console.error("getOrders error", error);
    res.status(500).json({ message: "getOrders error" });
  }
};
