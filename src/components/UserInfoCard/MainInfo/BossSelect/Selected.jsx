import styled from "styled-components";
import img from "../../../../assets/images/profile-avatar.svg";

export const Selected = ({ onClick }) => (
  <StyledSelected className="flex items-center" img={img} onClick={onClick}>
    <div className="avatar" />
    <div>
      <div className="name">Юрій Мицавка</div>
      <div className="role">Структурний керівник</div>
    </div>
  </StyledSelected>
);

const StyledSelected = styled.div`
  text-align: left;
  padding: 8px 10px;
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 34px;
    border: 1px solid #d0a6fa;
    margin-right: 8px;
    background: url(${({ img }) => img}) center/cover no-repeat;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .role {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
