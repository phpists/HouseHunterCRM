import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Role } from "./Role/Role";

export const MainInfo = ({ isScrolled }) => (
  <StyledMainInfo
    className="flex flex-col items-center justify-center"
    isScrolled={isScrolled}
  >
    <div className="flex flex-col items-center justify-center main-info-wrapper">
      <Avatar isScrolled={isScrolled} />
      <Name isScrolled={isScrolled} />
    </div>
    <Role />
  </StyledMainInfo>
);

const StyledMainInfo = styled.div`
  padding: 42px 0 32px;
  border-bottom: 1px solid var(--bg-20);
  transition: all 0.5s;
  ${({ isScrolled }) =>
    isScrolled &&
    `
    padding: 18px 12px 19px; 
    flex-direction: row; 
    justify-content: space-between; 
    .main-info-wrapper {
        flex-direction: row; 
        justify-content: space-between;
    }
    `}
`;
