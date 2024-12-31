import mongoose from "mongoose";
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../../interface/interface";

const HandleMongooseError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err?.errors).map(
    (value) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: err?.message,
    errorSources,
  };
};

export default HandleMongooseError;
