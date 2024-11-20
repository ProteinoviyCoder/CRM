import { businessesBD } from "../allBusiness/businessBD";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function verifyAndGetBusiness(req) {
  const cookies = Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((cookie) => cookie.trim().split("="))
  );

  const token = cookies.accessToken;

  if (!token) {
    return { error: { status: 401, message: "Access token is missing" } };
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const { businessId } = decoded;

    const business = businessesBD.find((b) => b.businessId === businessId);
    if (!business) {
      return { error: { status: 404, message: "Business not found" } };
    }

    let isUserExistInBusiness = business.team.some(
      (worker) => worker.username === decoded.username
    );
    if (!isUserExistInBusiness) {
      isUserExistInBusiness = business.owner.username === decoded.username;

      if (!isUserExistInBusiness) {
        return {
          error: {
            status: 401,
            message: "Вас нет в этой команде, обратитесь в поддержку",
          },
        };
      }
    }

    return { business, decoded };
  } catch (error) {
    console.error("Error verifying token", error);
    return { error: { status: 401, message: "Invalid or expired token" } };
  }
}
