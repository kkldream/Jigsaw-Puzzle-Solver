import db from "@/service/dbService";

// 專案啟動時執行，但熱重啟(有程式更動)不會執行
export async function register() {
    try {
        await db.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (e) {
        console.error(e);
    }
}
