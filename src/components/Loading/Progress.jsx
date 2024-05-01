import { useEffect, useState } from "react";
import styled from "styled-components";

export const Progress = ({ load }) => {
  const [procent, setProcent] = useState(0);

  useEffect(() => {
    setTimeout(() => setProcent(10), 100);
    setTimeout(() => setProcent(40), 500);
  }, []);

  useEffect(() => {
    load && setTimeout(() => setProcent(100), 800);
  }, [load]);

  return (
    <StyledProgress procent={procent} className="main-loading-progress">
      <div />
    </StyledProgress>
  );
};

const StyledProgress = styled.div`
  background: #f1f2f41a;
  width: 190px;
  height: 4px;
  border-radius: 4px;
  margin-top: 20px;
  div {
    background: #f8f9fa;
    height: 4px;
    border-radius: 4px;
    width: ${({ procent }) => procent}%;
    transition: all 0.3s;
  }
`;
