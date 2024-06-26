import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";

export const Slide = ({ photo, active, empty, onOpen }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <StyledSlide
      photo={active && inView ? photo : ""}
      empty={empty.toString()}
      onClick={onOpen}
      ref={ref}
    />
  );
};

const StyledSlide = styled.div`
  width: 100%;
  min-height: 200px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
  ${({ empty }) => empty === "true" && "background-size: 150%;"}
  @media (max-width: 800px) {
    width: 100%;
    height: 250px;
    width: calc(100svw - 4px - 8px - 10px - 24px - 39px);
  }
  @media (max-width: 500px) {
    width: 350px;
  }
  @media (max-width: 450px) {
    width: 320px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
  @media (max-width: 380px) {
    width: 280px;
  }
  @media (max-width: 360px) {
    width: 270px;
  }
  @media (max-width: 340px) {
    width: 250px;
  }
  @media (max-width: 1399.9px) {
    height: 250px;
  }
  @media (min-width: 1400px) {
    width: 250px;
  }
`;
