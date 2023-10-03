import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { SaveButton } from "./SaveButton";
import { SendClientButton } from "./SendClientButton";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <BackButton />
      <div className="btns-header flex items-center">
        <SaveButton />
        <SendClientButton />
        <IconButton Icon={StarIcon} className="icon-btn" />
        <IconButton Icon={RemoveIcon} className="icon-btn remove-btn" />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 12px 38px 23px 2px;
  .remove-btn {
    margin-left: 10px;
  }
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }

  .icon-btn {
    border: 1.4px solid rgba(255, 255, 255, 0.2) !important;
    &:hover {
      border: 1.4px solid rgba(255, 255, 255, 0) !important;
    }
  }
  @media (max-width: 800px) {
    padding: 20px !important;
  }
  @media (max-width: 600px) {
    .btns-header {
      width: 100%;
    }
  }
`;
