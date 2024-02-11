import { Document, connect } from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.model.js";
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";

export const connectDB = (uri: string) => {
    connect(uri, {
        dbName: "Ecommerce_Typescript",
    })
        .then((c) => console.log(`Database connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};

export const invalidateCache = ({
    product,
    admin,
    order,
    userId,
    orderId,
    productId,
}: InvalidateCacheProps) => {
    if (product) {
        const productKeys: string[] = [
            "latest-products",
            "categories",
            "all-products",
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);

        if (typeof productId === "object") {
            productId.forEach((i) => {
                productKeys.push(`product-${i}`);
            });
        }

        myCache.del(productKeys);
    }

    if (order) {
        const orderKeys: string[] = [
            "all-orders",
            `my-orders-${userId}`,
            `order-${orderId}`,
        ];

        myCache.del(orderKeys);
    }
    if (admin) {
        const adminKeys: string[] = [
            "admin-stats",
            "admin-pie-charts",
            "admin-bar-charts",
            "admin-line-charts",
        ];

        myCache.del(adminKeys);
    }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (const element of orderItems) {
        const order = element;
        const product = await Product.findById(order.productId);

        if (!product) throw new Error("Product not found");

        product.stock -= order.quantity;

        await product.save();
    }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {
    if (lastMonth === 0) return thisMonth * 100;

    const percentage = (thisMonth / lastMonth) * 100;
    return Number(percentage.toFixed(0));
};

export const getCategoriesInventory = async ({
    categories,
    productsCount,
}: {
    categories: string[];
    productsCount: number;
}) => {
    const categoriesCountPromise = categories.map((category) =>
        Product.countDocuments({ category })
    );

    const categoriesCount = await Promise.all(categoriesCountPromise);

    const categoryCount: Record<string, number>[] = [];

    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / productsCount) * 100),
        });
    });
    return categoryCount;
};

interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
}
type FuncType = {
    length: number;
    docArr: MyDocument[];
    today: Date;
    property?: "discount" | "total";
};

export const getChartData = ({ length, docArr, today, property }: FuncType) => {
    const data: number[] = new Array(length).fill(0);

    docArr.forEach((i) => {
        const creationDate = i.createdAt;

        const monthDiff =
            (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < length) {
            if (property) {
                data[length - 1 - monthDiff] += i[property]!;
            } else {
                data[length - 1 - monthDiff] += 1;
            }
        }
    });
    return data;
};
