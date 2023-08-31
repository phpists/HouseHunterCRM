import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { Title } from "./Title";
import { ActionButton } from "./ActionButton";
import { Divider } from "./Divider";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";

export const Header = () => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center">
      <BackButton />
      <Title />
    </div>
    <div className="flex items-center">
      <ActionButton
        title="Поставити задачу"
        onClick={null}
        className="mr-2.5 icon-btn"
      />
      <ActionButton
        title="Передати кліента"
        onClick={null}
        className="icon-btn"
      />
      <Divider />
      <IconButton Icon={StarIcon} className="mr-2.5 icon-btn" onClick={null} />
      <IconButton
        Icon={RemoveIcon}
        className="remove-btn icon-btn"
        onClick={null}
      />
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin-bottom: 15px;
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }
`;
