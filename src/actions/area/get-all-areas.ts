import db from "@/lib/db";

export const getAllAreas = async () => db.query.area.findMany();
