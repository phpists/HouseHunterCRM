import styled from "styled-components";
import icon from "../../../../assets/images/olx.png";

export const Resource = ({ data }) => (
  <StyledResource icon={icon} className="flex items-center">
    <div></div> {data?.name ?? data?.phone ?? data?.email ?? data?.id}
  </StyledResource>
);

const StyledResource = styled.div`
  background: var(--second-bg);
  padding: 10px;
  border-radius: 6px;
  gap: 5px;
  font-size: 12px;
  line-height: 16.8px;
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  div {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: url(${(props) => props.icon}) center / cover no-repeat;
  }
`;
