import styled from "styled-components";

export const Name = ({ name }) => (
  <StyledName className="flex items-center clickable" title={name}>
    <div className="name-title clickable">Назва:</div>{" "}
    <span className="clickable selectionName">{name}</span>
  </StyledName>
);

const StyledName = styled.div`
  font-family: Overpass;
  font-size: 14px;
  font-weight: 200;
  line-height: 17px;
  letter-spacing: 0em;
  var(--main-color)f;
  margin-bottom: 12px;
  .name-title {
    margin-right: 10px;
    color: var(--element-super-dark-text);
  }
  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 120px;
  }
`;
