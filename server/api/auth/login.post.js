import { getUserByUsername } from "../../db/users.js";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "../../utils/jwt.js";
import { userTransformer } from "../../transformers/user.js";
import { createRefreshToken } from "../../db/refreshTokens.js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid params" })
    );
  }

  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid credentials" })
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid credentials" })
    );
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await createRefreshToken({
    userId: user.id,
    token: refreshToken,
  });

  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
