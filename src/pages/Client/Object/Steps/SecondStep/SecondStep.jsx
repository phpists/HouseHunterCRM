import { Divider } from "../../Divider";
import { Comment } from "../Comment";
import { OpenButton } from "./OpenButton";
import { TaskCard } from "../TaskCard/TaskCard";
import { DateField } from "../DateField/DateField";

export const SecondStep = () => (
  <div>
    <DateField />
    <Divider />
    <Comment />
    <Divider />
    <OpenButton />
    <Divider />
    <TaskCard />
    <Divider />
    <TaskCard />
    <Divider />
    <TaskCard />
  </div>
);
