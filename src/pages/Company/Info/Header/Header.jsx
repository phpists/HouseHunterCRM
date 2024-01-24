import { styled } from "styled-components";
import { CompanyLogo } from "../../../../components/CompanyLogo";
import { Title } from "./Title";
import { Date } from "./Date";
import { Owner } from "./Owner/Owner";
import { handleFormatDate } from "../../../../utilits";

export const Header = ({ tarifOpen, data, onEdit }) => {
  return (
    <StyledHeader
      className="flex items-center justify-between hover-effect-to-right"
      tarifOpen={tarifOpen}
    >
      <div className="flex items-center">
        <CompanyLogo />
        <div className="flex flex-col items-start ml-2.5">
          <Title title={data?.company_name ?? "-"} onEdit={onEdit} />
          <Date date={handleFormatDate(Number(data?.dt_reg) * 1000, true)} />
        </div>
      </div>
      <Owner data={data} />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  border-radius: 13px;
  transition: all 0.3s;
  padding: 4px 17px 4px 4px;
  ${({ tarifOpen }) => !tarifOpen && "margin-bottom: 16px;"}
  @media(max-width: 600px) {
    flex-direction: column;
    align-items: start;
  }
`;
