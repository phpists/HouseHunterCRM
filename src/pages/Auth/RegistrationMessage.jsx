import { styled } from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import { Button } from "../../components/Button";

export const RegistrationMessage = ({ ishover, onClick }) => (
  <StyledRegistrationMessage
    className="flex flex-col items-center"
    ishover={ishover}
  >
    <Title title="Зареєструватись" className="mb-1" />
    <Description
      description={
        <>
          Заповніть невелику форму та подайте <br />
          заявку на модерацію, щоб почати <br />
          користуватися сервісом.
        </>
      }
      className="mb-5 description"
    />
    <Button title="Заповнити форму" outline="true" onClick={onClick} />
  </StyledRegistrationMessage>
);

const StyledRegistrationMessage = styled.div`
  .description {
    transition: all 0.3s;
    opacity: ${({ ishover }) => (ishover === "true" ? 0.3 : 1)} !important;
  }
`;
