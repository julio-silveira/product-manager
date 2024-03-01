import { Request, Response, Router } from "express";
import statusCodes from "../utils/statusCode";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	const response = {
		status: "ok",
	};
	return res.status(statusCodes.OK).json(response);
});

export default router;
