import { styled } from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { IconButton } from "../../../components/IconButton";
import { Title } from "./Title";
import { Button } from "./Button";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      {/* <BackButton /> */}
      <Title />
      <div className="flex items-center bts">
        <SaveButton />
        <Button title="Призупинити показ" />
        <Button title="Пуста підбірка" />
        <Button title="Неактуально" />
        <IconButton Icon={StarIcon} className="icon-btn" />
        <IconButton Icon={RemoveIcon} className="remove-btn" />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .remove-btn {
    margin-left: 10px;
  }
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }
  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: start;
    .bts {
      margin-top: 10px;
    }
  }
`;
