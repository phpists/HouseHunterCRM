import { styled } from "styled-components";
import { ReactComponent as Icon } from "../../assets/images/close-.svg";
import { Profile } from "./Profile";

export const Header = ({ onCloseChat, rieltor }) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center ">
      <Profile small rieltor={rieltor} />
    </div>
    <Icon className="cursor-pointer close-btn" onClick={onCloseChat} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  border-radius: 10px;
  background: var(--chat-bg);
  height: 60px;
  padding: 10px 14px 10px 10px;
  .close-btn {
    display: block;
  }
`;
