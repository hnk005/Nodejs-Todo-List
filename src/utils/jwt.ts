import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export const JWT = {
  generate: (data: any, expiresIn: StringValue) =>
    jwt.sign(data, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    }),
  verify: (token: string) =>
    jwt.verify(token, process.env.TOKEN_SECRET),
};
