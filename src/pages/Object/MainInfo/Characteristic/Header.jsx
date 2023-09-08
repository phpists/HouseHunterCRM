import { styled } from "styled-components";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center justify-between">
      <span>Дані об’єкту</span>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  svg {
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
