import nc from "next-connect";
import helmet from "helmet";
import cors from "cors";

export default function base() {
  return nc().options("*", cors()).use(helmet()).use(cors());
}
