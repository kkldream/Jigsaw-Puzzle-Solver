import express, { json, urlencoded, Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";

export const app = express();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
    return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
});

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof Error) {
        return res.status(500).json({
            error: {
                message: err.message || "Internal Server Error",
                name: err.name,
                stack: err.stack,
            },
        });
    }
    next();
});

app.use(function notFoundHandler(_req, res: ExResponse) {
    res.status(404).send({
        message: "Not Found",
    });
});
