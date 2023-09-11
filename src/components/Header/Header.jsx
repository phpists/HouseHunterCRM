import { styled } from "styled-components";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";
import { Billing } from "./Billing/Billing";
import { Profile } from "./Profile/Profile";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <div>
        <Title />
        <Subtitle />
      </div>
      <div className="flex items-center">
        <Billing />
        <Profile />
      </div>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  padding: 20px 40px;
`;
