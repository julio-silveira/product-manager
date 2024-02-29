import { Router } from "express";
import statusCodes from "../utils/statusCode";

const router = Router();

router.get("/", (req, res) => {
  const response = {
    status: "ok",
  };
  return res.status(statusCodes.OK).json(response);
});

export default router;
