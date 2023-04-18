import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case "GET":
      response.status(200).json({
        message: "haha",
      });
  }
}
