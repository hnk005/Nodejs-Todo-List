import { HTTP_STATUS_CODE } from "~/contants/enum";
import User from "~/models/database/User";
import { APIError } from "~/utils/error";

export const AuthService = {
  register: async (
    fullName: string,
    email: string,
    password: string
  ) => {
    const userExist = await User.findOne({
      email,
    });

    if (userExist) {
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

    return user;
  },
};
