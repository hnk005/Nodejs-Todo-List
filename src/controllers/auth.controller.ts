import {
  NextFunction,
  Request,
  Response,
} from "express";
import { HTTP_STATUS_CODE } from "~/contants/enum";
import { AuthService } from "~/services/auth.service";
import { APIError } from "~/utils/error";
import { JWT } from "~/utils/jwt";

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
          "Email, password and full name are required"
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
  ) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new APIError(
          "BAD_REQUEST",
          HTTP_STATUS_CODE.BAD_REQUEST,
          "Email and password are required"
        );
      }

      const user = await AuthService.login(
        email,
        password
      );

      const accessToken = JWT.generate(
        { id: user.id },
        process.env.EXISTS_ACCESS_TOKEN
      );

      const refeshToken = JWT.generate(
        { id: user.id },
        process.env.EXISTS_REFRESH_TOKEN
      );

      res.cookie("refeshToken", refeshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(HTTP_STATUS_CODE.OK).json({
        message: "Login successfully",
        data: {
          accessToken: accessToken,
          user,
        },
      });

      next();
    } catch (error) {
      next(error);
    }
  },
};
