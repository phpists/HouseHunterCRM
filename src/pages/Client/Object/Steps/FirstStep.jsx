import { Divider } from "../Divider";
import { Comment } from "./Comment";
import { DateField } from "./DateField/DateField";

export const FirstStep = () => (
  <div>
    <DateField />
    <Divider />
    <Comment />
  </div>
);
