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
  width: 200px;
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
  }
  @media (max-width: 1399.9px) {
    ${({ empty }) => empty === "true" && "height: 250px;"}
  }
  @media (min-width: 1400px) {
    ${({ empty }) => empty === "true" && "width: 250px;"}
  }
`;
