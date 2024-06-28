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
  border-bottom: 1px solid var(--bg-10);
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 1px solid var(--green-light);
    margin-right: 8px;
    background: url(${({ img }) => img}) center/cover no-repeat;
  }
  .name {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
`;
