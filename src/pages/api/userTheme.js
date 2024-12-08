import { verifyAndGetBusiness } from "./process/verifyAndGetBuisness";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { user, error } = verifyAndGetBusiness(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  user.themeSetting = req.body.themeSetting;

  return res.status(200).json({
    message: "theme settings was refreshed",
  });
}
