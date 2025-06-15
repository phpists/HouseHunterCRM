import { styled } from "styled-components";
import deleteIcon from "../../../assets/images/delete-history.svg";
export const Option = ({ title, onSelect, onDelete }) => (
  <StyledOption
    className="flex items-center justify-between"
    onClick={(e) => {
      onSelect();
      e.stopPropagation();
    }}
  >
    <div className="flex items-center gap-2">
      {onDelete ? (
        <img
          src={deleteIcon}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      ) : null}{" "}
      {title}
    </div>
    <span>→</span>
  </StyledOption>
);

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 19px 6px 11px;
  transition: all 0.3s;
  color: #2c2c2c;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  white-space: pre-line;
  span {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(44, 44, 44, 0.07);
    span {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;
