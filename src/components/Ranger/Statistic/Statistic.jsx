import { useEffect, useRef } from "react";
import { styled } from "styled-components";

export const Statistic = ({ activeSegment }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const elements = wrapperRef.current.children;
      const width = wrapperRef.current.offsetWidth;
      const start = parseInt(activeSegment.style.left);
      const segmentWidth = parseInt(activeSegment.style.width);
      const end = start + segmentWidth;

      Array.from(elements).forEach((e) => {
        const procent = (e?.offsetLeft / width) * 100;
        e.classList.toggle("active", procent > start && procent < end);
      });
    }
  }, [activeSegment]);

  return (
    <StyledStatistic ref={wrapperRef}>
      <div style={{ height: "10%" }} className="statistic-item"></div>
      <div style={{ height: "14%" }} className="statistic-item"></div>
      <div style={{ height: "10%" }} className="statistic-item"></div>
      <div style={{ height: "20%" }} className="statistic-item"></div>
      <div style={{ height: "20%" }} className="statistic-item"></div>
      <div style={{ height: "25%" }} className="statistic-item"></div>
      <div style={{ height: "25%" }} className="statistic-item"></div>
      <div style={{ height: "40%" }} className="statistic-item"></div>
      <div style={{ height: "40%" }} className="statistic-item"></div>
      <div style={{ height: "30%" }} className="statistic-item"></div>
      <div style={{ height: "30%" }} className="statistic-item"></div>
      <div style={{ height: "32%" }} className="statistic-item"></div>
      <div style={{ height: "36%" }} className="statistic-item"></div>
      <div style={{ height: "38%" }} className="statistic-item"></div>
      <div style={{ height: "40%" }} className="statistic-item"></div>
      <div style={{ height: "48%" }} className="statistic-item"></div>
      <div style={{ height: "50%" }} className="statistic-item"></div>
      <div style={{ height: "55%" }} className="statistic-item"></div>
      <div style={{ height: "60%" }} className="statistic-item"></div>
      <div style={{ height: "80%" }} className="statistic-item"></div>
      <div style={{ height: "80%" }} className="statistic-item"></div>
      <div style={{ height: "92%" }} className="statistic-item"></div>
      <div style={{ height: "80%" }} className="statistic-item"></div>
      <div style={{ height: "80%" }} className="statistic-item"></div>
      <div style={{ height: "78%" }} className="statistic-item"></div>
      <div style={{ height: "67%" }} className="statistic-item"></div>
      <div style={{ height: "55%" }} className="statistic-item"></div>
      <div style={{ height: "32%" }} className="statistic-item"></div>
      <div style={{ height: "43%" }} className="statistic-item"></div>
      <div style={{ height: "38%" }} className="statistic-item"></div>
      <div style={{ height: "35%" }} className="statistic-item"></div>
      <div style={{ height: "35%" }} className="statistic-item"></div>
      <div style={{ height: "32%" }} className="statistic-item"></div>
      <div style={{ height: "30%" }} className="statistic-item"></div>
      <div style={{ height: "28%" }} className="statistic-item"></div>
      <div style={{ height: "27%" }} className="statistic-item"></div>
      <div style={{ height: "26%" }} className="statistic-item"></div>
      <div style={{ height: "25%" }} className="statistic-item"></div>
      <div style={{ height: "24%" }} className="statistic-item"></div>
      <div style={{ height: "23%" }} className="statistic-item"></div>
      <div style={{ height: "22%" }} className="statistic-item"></div>
      <div style={{ height: "21%" }} className="statistic-item"></div>
      <div style={{ height: "22%" }} className="statistic-item"></div>
      <div style={{ height: "20%" }} className="statistic-item"></div>
      <div style={{ height: "18%" }} className="statistic-item"></div>
      <div style={{ height: "15%" }} className="statistic-item"></div>
      <div style={{ height: "15%" }} className="statistic-item"></div>
      <div style={{ height: "10%" }} className="statistic-item"></div>
      <div style={{ height: "0%" }} className="statistic-item"></div>
      <div style={{ height: "0%" }} className="statistic-item"></div>
    </StyledStatistic>
  );
};

const StyledStatistic = styled.div`
  display: grid;
  grid-template-columns: repeat(50, 1fr);
  gap: 2px;
  height: 35px;
  z-index: 80;
  align-items: end;
  div {
    background: var(--card-bg);
    height: 100%;
    width: 100%;
  }

  .active {
    background: linear-gradient(180deg, #ef2727 0%, #ef7b27 100%);
  }
`;
