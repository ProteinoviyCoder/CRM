import { businessesBD } from "../allBusiness/businessBD";
import { verifyAndGetBusiness } from "../process/verifyAndGetBuisness";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow:", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { business, user, error } = verifyAndGetBusiness(req);

  if (error) {
    return res.status(error.status).json({ message: error.message });
  }

  if (!user.permissions.includes("create_worker")) {
    return res.status(403).json({
      status: 403,
      message: "You don't have enough access",
    });
  }

  if (business.team.length >= 25) {
    return res.status(403).json({
      status: 403,
      message:
        "The maximum number of employees has been exceeded. Your maximum is 25",
    });
  }

  const { username, password, role, permissions } = req.body;

  if (password.length < 15) {
    return res.status(422).json({
      status: 422,
      message: "The password is short, the minimum length is 15 characters",
    });
  }

  let isExistUsername = businessesBD
    .flatMap((buisness) => buisness.team)
    .some((user) => user.username === username);
  if (!isExistUsername) {
    isExistUsername = businessesBD.some(
      (business) => business.owner.username === username
    );
  }

  if (isExistUsername) {
    return res.status(409).json({
      status: 409,
      message: "This username is already taken, please enter another one",
    });
  }

  const newWorker = {
    id: (business.team.length + 1).toString() + Date.now().toString(),
    username: username,
    passwordHash: await bcrypt.hash(password, 10),
    permissions: [...permissions],
    role: role,
    businessId: business.businessId,
    themeSetting: {
      theme: "standart",
      mod: "light",
    },
  };

  business.team.push(newWorker);

  return res.status(200).json({
    status: 200,
    message: "New worker was added, remember username and password",
  });
}
