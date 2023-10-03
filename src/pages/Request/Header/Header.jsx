import { styled } from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { IconButton } from "../../../components/IconButton";
import { Title } from "./Title";
import { Button } from "./Button";
import { MoreButton } from "./MoreButton/MoreButton";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      {/* <BackButton /> */}
      <div className="flex title-wrapper">
        <Title />
        <div className="mobile-action-btns flex items-center">
          <SaveButton />
          <IconButton Icon={StarIcon} className="icon-btn" />
          <IconButton Icon={RemoveIcon} className="icon-btn remove-btn" />
          <MoreButton />
        </div>
      </div>
      <div className="flex items-center bts">
        <SaveButton />
        <Button title="Призупинити показ" />
        <Button title="Пуста підбірка" />
        <Button title="Неактуально" />
        <div className="desktop-action-btns flex items-center">
          <IconButton Icon={StarIcon} className="icon-btn" />
          <IconButton Icon={RemoveIcon} className="icon-btn remove-btn" />
        </div>
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
  .mobile-action-btns {
    display: none;
  }
  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: start;
    .bts {
      margin-top: 10px;
      justify-content: space-between;
      width: 100%;
      gap: 20px;
      button {
        width: 100%;
        margin: 0;
      }
    }
    .title-wrapper {
      justify-content: space-between;
      width: 100%;
    }
    .desktop-action-btns {
      display: none;
    }

    .mobile-action-btns {
      display: flex;
    }
  }

  @media (max-width: 800px) {
    .mobile-action-btns {
      width: 100%;
    }
    .bts {
      display: none;
    }
    .remove-btn {
      margin-left: 12px;
    }
  }
`;
