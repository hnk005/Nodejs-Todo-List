import mongoose, {
  Document,
  Schema,
} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 72,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<IUser>(
  "save",
  async function (next) {
    if (!this.isModified("password"))
      return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(
      this.password,
      salt
    );
    next();
  }
);

const User = mongoose.model<IUser>(
  "User",
  UserSchema
);

export default User;
