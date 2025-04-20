import { StringValue } from "ms";
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI: string;
      TOKEN_SECRET: string;
      EXISTS_ACCESS_TOKEN: StringValue;
      EXISTS_REFRESH_TOKEN: StringValue;
    }
  }
}

export {};
