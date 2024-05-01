import styled from "styled-components";
import img from "../../assets/images/profile-avatar.svg";

export const Selected = ({ onClick, selected, levels }) => (
  <StyledSelected className="flex items-center" img={img} onClick={onClick}>
    {/* <div className="avatar" /> */}
    <div>
      <div className="name" title={selected?.full_name}>
        {selected?.full_name ?? "-"}
      </div>
      <div className="role">{levels[selected?.structure_level - 1] ?? "-"}</div>
    </div>
  </StyledSelected>
);

const StyledSelected = styled.div`
  text-align: left;
  padding: 8px 10px;
  cursor: pointer;
  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 34px;
    border: 1px solid #d0a6fa;
    margin-right: 8px;
    background: url(${({ img }) => img}) center/cover no-repeat;
  }
  .name {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .role {
    color: var(--subtitle-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
  }
`;
