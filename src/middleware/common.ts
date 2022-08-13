import nc from "next-connect";
import helmet from "helmet";

export default function base() {
  return nc().use(helmet());
}
