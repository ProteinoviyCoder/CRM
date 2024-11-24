import { verifyAndGetBusiness } from "../process/verifyAndGetBuisness";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { business, user, error } = verifyAndGetBusiness(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  const isAllowed = user.permissions.includes("get_team");

  if (!isAllowed) {
    return res.status(403).json({
      status: 403,
      message: "You don't have enough access",
    });
  }

  const businessTeam = JSON.parse(
    JSON.stringify([...business.team, business.owner])
  );
  const businessTeamForResponse = businessTeam.map((user) => {
    delete user.passwordHash;
    delete user.refreshToken;
    return user;
  });

  return res.status(200).json({
    message: "Team was received",
    team: businessTeamForResponse,
  });
}
