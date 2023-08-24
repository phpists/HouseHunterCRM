import { Title } from "./Title";
import { Button } from "./Button";
import { Description } from "./Description";
import arrowIcon from "../../assets/images/arrow.svg";

export const LoginMessage = ({ onClick }) => (
  <div className="flex flex-col items-center">
    <Title title="З поверненням!" className="mb-1" />
    <Description
      description={
        <>
          Швидше подивися, що нового сталося, <br /> доки тебе не було!
        </>
      }
      className="mb-5 description"
    />
    <Button title="Увійти" icon={arrowIcon} onClick={onClick} />
  </div>
);
