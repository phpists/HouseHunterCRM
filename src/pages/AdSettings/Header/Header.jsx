import styled from "styled-components";
import { Title } from "./Title";
import { Actions } from "./Actions/Actions";
import { BackButton } from "../../../components/BackButton";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate("/ad");

  return (
    <StyledHeader className="flex items-center justify-between">
      <div className="flex items-center">
        <BackButton onClick={handleBack} />
        <Title />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
`;
