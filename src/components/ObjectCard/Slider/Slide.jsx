import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";

export const Slide = ({ photo, active, empty, onOpen, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <StyledSlide
      className={className}
      photo={active && inView ? photo : ""}
      empty={empty.toString()}
      onClick={onOpen}
      ref={ref}
    />
  );
};

const StyledSlide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ photo }) => photo}) center/cover no-repeat;
  flex-shrink: 0;
  ${({ empty }) => empty === "true" && "background-size: 150%;"}
`;
