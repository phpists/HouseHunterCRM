import { styled } from "styled-components";
import editIcon from "../assets/images/edit-company.svg";

export const Comment = ({ className, comment }) => (
  <StyledComment className={`flex items-start ${className}`}>
    <div>
      <div className="value">{comment}</div>
      <div className="label">Коментар</div>
    </div>
    <img src={editIcon} alt="" />
  </StyledComment>
);

const StyledComment = styled.div`
  padding: 6px 6px 6px 8px;
  border-radius: 6px;
  background: #444;
  transition: all 0.3s;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  .value {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    min-height: 10px;
  }
  .label {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  img {
    margin-left: 17px;
    transform: translateX(-5px);
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover {
    background: #535252;
    img {
      transform: translateX(0px);
      opacity: 1;
    }
  }
`;
