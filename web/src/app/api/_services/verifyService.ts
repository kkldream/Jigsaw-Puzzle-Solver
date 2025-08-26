export async function verifyUser(token: string): Promise<void> {
    const res = await fetch("https://account.julojulo.com/api/third/verify/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authToken": token,
        },
    });
    if (!res.ok) throw new Error("Failed to verify user");
}
