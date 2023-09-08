import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { IconButton } from "../../../components/IconButton";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <BackButton />
      <div className="flex items-center">
        <SaveButton />
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
`;
