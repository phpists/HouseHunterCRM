import { Divider } from "../../Divider";
import { Comment } from "../Comment";
import { OpenButton } from "./OpenButton";
import { TaskCard } from "../TaskCard/TaskCard";

export const SecondStep = () => (
  <div>
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
