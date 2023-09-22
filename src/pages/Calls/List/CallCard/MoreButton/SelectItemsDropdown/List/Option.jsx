import styled from "styled-components";
import img from "../../../../../../../assets/images/profile-avatar.svg";

export const Option = () => (
  <StyledOption img={img} className="flex items-center">
    <div className="avatar" />
    <div className="name">Юрій Мицавка</div>
  </StyledOption>
);

const StyledOption = styled.div`
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 1px solid #b1ff91;
    margin-right: 8px;
    background: url(${({ img }) => img}) center/cover no-repeat;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
`;
