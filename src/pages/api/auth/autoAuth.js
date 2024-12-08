import { verifyAndGetBusiness } from "../process/verifyAndGetBuisness";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { business, decoded, error } = verifyAndGetBusiness(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  let user;

  if (
    business.owner.id.toString() === decoded.id.toString() &&
    business.owner.username === decoded.username
  ) {
    user = business.owner;
  } else {
    user = business.team.find((u) => u.username === decoded.username);
  }

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }

  const userForResponse = { ...user };
  delete userForResponse.passwordHash;
  delete userForResponse.refreshToken;

  return res.status(200).json({
    message: "User data retrieved successfully",
    userForResponse,
    tasks: business.tasks,
    businessName: business.businessName,
  });
}
