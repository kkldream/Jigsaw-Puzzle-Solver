import db from "@/lib/db";

// 專案啟動時執行，但熱重啟(有程式更動)不會執行
export async function register() {
    await db.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
}
