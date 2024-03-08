import styled from "styled-components";

export const Name = ({ name }) => (
  <StyledName className="flex items-center" title={name}>
    <div className="name-title">Назва:</div> <span>{name}</span>
  </StyledName>
);

const StyledName = styled.div`
  font-family: Overpass;
  font-size: 14px;
  font-weight: 200;
  line-height: 17px;
  letter-spacing: 0em;
  color: #ffff;
  margin-bottom: 15px;
  .name-title {
    margin-right: 10px;
    color: #919191;
  }
  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px;
  }
`;
