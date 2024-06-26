import styled from "styled-components";

export const Name = ({ name }) => (
  <StyledName className="flex items-center" title={name}>
    <div className="name-title">Назва:</div>{" "}
    <span className="selectionName">{name}</span>
  </StyledName>
);

const StyledName = styled.div`
  font-family: Overpass;
  font-size: 14px;
  font-weight: var(--font-weight-200);
  line-height: 17px;
  letter-spacing: 0em;
  var(--main-color)f;
  margin-bottom: 15px;
  .name-title {
    margin-right: 10px;
    color: var(--element-super-dark-text);
  }
  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 150px;
  }
`;
