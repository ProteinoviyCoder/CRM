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

    let userInBusiness = business.team.find(
      (worker) => worker.username === decoded.username
    );
    if (!userInBusiness) {
      userInBusiness =
        business.owner.username === decoded.username ? business.owner : false;

      if (!userInBusiness) {
        return {
          error: {
            status: 401,
            message: "Вас нет в этой команде, обратитесь в поддержку",
          },
        };
      }
    }

    // for use in code anywhere -------- const { business, decoded, user, error } = verifyAndGetBusiness(req);
    return { business, decoded, user: userInBusiness };
  } catch (error) {
    console.error("Error verifying token", error);
    return { error: { status: 401, message: "Invalid or expired token" } };
  }
}
