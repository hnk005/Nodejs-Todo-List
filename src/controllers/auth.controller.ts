import {
  NextFunction,
  Request,
  Response,
} from "express";
import { HTTP_STATUS_CODE } from "~/contants/enum";
import { AuthService } from "~/services/auth.service";
import { APIError } from "~/utils/error";

export const AuthController = {
  register: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { fullName, email, password } =
      req.body;

    try {
      if (!fullName || !email || !password) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Email and password are required"
        );
      }

      await AuthService.register(
        fullName,
        email,
        password
      );

      res.status(HTTP_STATUS_CODE.CREATED).json({
        message: "User registered successfully",
      });

      next();
    } catch (error) {
      next(error);
    }
  },

  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {},
};
