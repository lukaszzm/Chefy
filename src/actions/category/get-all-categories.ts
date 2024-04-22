import db from "@/lib/db";

export const getAllCategories = async () => db.query.category.findMany();
