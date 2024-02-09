import { Title } from "./Title";
import { Description } from "./Description";
import arrowIcon from "../../assets/images/arrow.svg";
import { Button } from "../../components/Button";
import styled from "styled-components";

export const LoginMessage = ({ onClick }) => (
  <StyledLoginMessage className="flex flex-col items-center">
    <Title title="З поверненням!" className="mb-1" />
    <Description
      description={
        <>
          Швидше подивися, що нового сталося, <br /> доки тебе не було!
        </>
      }
      className="mb-5 description"
    />
    <Button title="Увійти" icon={arrowIcon} onClick={onClick} />
  </StyledLoginMessage>
);

const StyledLoginMessage = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
