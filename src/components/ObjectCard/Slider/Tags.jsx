import styled from "styled-components";

export const Tags = ({ data }) => (
  <StyledTags>
    {data?.type_object?.length > 0 ? <div>{data?.type_object}</div> : null}
  </StyledTags>
);

const StyledTags = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  z-index: 10;
  font-family: "Open Sans", sans-serif;
  font-size: 11px;
  font-weight: 200;
  line-height: 15px;
  letter-spacing: 0.02em;
  text-align: left;
  div {
    padding: 1px 4px 2px 4px;
    border-radius: 5px;
    background: #3d3d3d99;
  }
`;
