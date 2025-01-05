import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import { SortOrder } from "mongoose";

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
  // console.log("\n\n\ntesting...", { user: req.user }, "\n\n\n");
  try {
    const ids = req.query.ids as string[];
    const sort = req.query.sort as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // 쿼리객체
    const query: { [key: string]: any } = ids
      ? { _id: { $in: Array.isArray(ids) ? ids : [ids] } } // ids 배열에 해당하는 제품만 조회
      : {}; // 기본값: 조건 없음

    // 정렬객체
    const sortOption: { [key: string]: SortOrder } =
      sort === "latest" // 최신순
        ? // ? { createdAt: -1 }
          // : sort === "popular" // 인기순
          // ? { popularity: -1 }
          { _id: -1 }
        : sort === "priceAsc" // 가격 오름차순
        ? { price: 1 }
        : sort === "priceDesc" // 가격 내림차순
        ? { price: -1 }
        : {}; // 기본값

    const products = await Product
      // 쿼리
      .find(query)
      // 정렬
      .sort(sortOption)
      // 페이지네이션
      .skip(skip)
      .limit(limit)
      // lean 을 사용해서 origin data 를 리턴받는다.
      .lean();

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
      const error = new Error(`A product with the id of ${id} was not found.`) as any;
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
    if (!product) {
      const error = new Error(`A product with the id of ${id} was not found.`) as any;
      error.status = 404;
      return next(error);
    }
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
    if (!product) {
      const error = new Error(`A product with the id of ${id} was not found.`) as any;
      error.status = 404;
      return next(error);
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("deleteProduct error", error);
    res.status(500).json({ message: "deleteProduct error" });
  }
};
