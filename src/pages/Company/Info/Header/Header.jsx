import { styled } from "styled-components";
import { CompanyLogo } from "../../../../components/CompanyLogo";
import { Title } from "./Title";
import { Date } from "./Date";
import { Owner } from "./Owner/Owner";

export const Header = ({ tarifOpen }) => {
  return (
    <StyledHeader
      className="flex items-center justify-between hover-effect-to-right"
      tarifOpen={tarifOpen}
    >
      <div className="flex items-center">
        <CompanyLogo />
        <div className="flex flex-col items-start ml-2.5">
          <Title />
          <Date />
        </div>
      </div>
      <Owner />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  border-radius: 13px;
  transition: all 0.3s;
  padding: 4px 17px 4px 4px;
  ${({ tarifOpen }) => !tarifOpen && "margin-bottom: 16px;"}
`;
