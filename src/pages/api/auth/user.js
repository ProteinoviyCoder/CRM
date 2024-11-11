import { verifyToken } from "../process/verifyToken";
import { usersBD } from "../allUsers/usersBD";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const dataToken = await verifyToken(req.headers.cookie);

    if (!dataToken.isExistToken) {
      return res.status(401).json({
        message: dataToken.message,
      });
    }

    if (!dataToken.result) {
      return res.status(401).json({
        message: dataToken.message,
        error: dataToken.error,
      });
    }

    const decoded = dataToken.decoded;
    const user = usersBD.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userForResponse = { ...user };
    delete userForResponse.passwordHash;
    delete userForResponse.refreshToken;

    // if (!user.permissions || !user.permissions.includes("get_users")) {
    //   return res.status(403).json({
    //     message: "Forbidden: You do not have access to this resource",
    //   });
    // }

    return res.status(200).json({
      message: "User data retrieved successfully",
      userForResponse,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
