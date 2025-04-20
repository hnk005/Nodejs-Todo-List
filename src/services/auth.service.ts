import { HTTP_STATUS_CODE } from "~/contants/enum";
import User, {
  IUser,
} from "~/models/database/User";
import { APIError } from "~/utils/error";
import bcrypt from "bcryptjs";

export const AuthService = {
  register: async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      throw new APIError(
        "CONFLICT",
        HTTP_STATUS_CODE.CONFLICT,
        "Email already exists"
      );
    }

    const user = new User({
      fullName,
      email,
      password,
    });

    await user.save();
  },
  login: async (
    email: string,
    password: string
  ) => {
    const userExists = await User.findOne({
      email,
    });
    if (!userExists) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Email not exists"
      );
    }

    const comparePassword = await bcrypt.compare(
      password,
      userExists.password
    );

    if (!comparePassword) {
      throw new APIError(
        "BAD_REQUEST",
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Incorrect password"
      );
    }

    return userExists;
  },
};
