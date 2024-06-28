import styled from "styled-components";
import avatar from "../../../../assets/images/small-avarar-orange.svg";

export const Client = ({ name, phone }) => (
  <StyledClient className="flex items-center">
    <img src={avatar} alt="" />
    <div>
      <div className="name" title={name}>
        {name}
      </div>
      <div className="phone">{phone}</div>
    </div>
  </StyledClient>
);

const StyledClient = styled.div`
  color: var(--main-color);
  img {
    height: 30px;
    width: 30px;
    margin-right: 15px;
  }
  .name {
    font-family: Overpass;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 17px;
    letter-spacing: 0.02em;
    text-align: left;
    margin-bottom: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px;
  }
  .phone {
    font-family: Open Sans, sans-serif;
    font-size: 11px;
    font-weight: var(--font-weight-light);
    line-height: 15px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: 0.4;
  }
`;
