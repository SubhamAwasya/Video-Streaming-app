import asyncHandler from "../utils/asyncHandler";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const accessToken = req;
  console.log(accessToken);
  next();
});
