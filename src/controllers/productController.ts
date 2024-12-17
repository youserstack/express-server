import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error("createProduct error", error);
    res.status(500).json({ message: "createProduct error" });
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    if (isNaN(limit) || limit <= 0) return res.status(400).json({ message: "Invalid limit value" });

    // 쿼리 조건 객체 초기화
    const query: any = {};
    const { ids } = req.query;
    console.log({ ids });
    if (ids) {
      const idsArray = Array.isArray(ids) ? ids : [ids]; // ids가 배열이 아닐 경우 배열로 변환
      console.log({ idsArray });
      query._id = { $in: idsArray }; // ids 배열에 해당하는 제품만 조회
    }

    const products = await Product.find(query).limit(limit).lean(); // lean 을 사용해서 origin data 를 리턴받는다.
    res.status(200).json(products);
  } catch (error) {
    console.error("getProducts error", error);
    res.status(500).json({ message: "getProducts error" });
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).lean();
    if (!product) {
      const error = new Error(`A product with the id of ${id} was not found.`) as Error & {
        status: number;
      };
      error.status = 404;
      return next(error);
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("getProduct error", error);
    res.status(500).json({ message: "getProduct error" });
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const product = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(product);
  } catch (error) {
    console.error("updateProduct error", error);
    res.status(500).json({ message: "updateProduct error" });
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    console.error("deleteProduct error", error);
    res.status(500).json({ message: "deleteProduct error" });
  }
};
