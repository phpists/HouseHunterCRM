import styled from "styled-components";
import olxIcon from "../../../../assets/images/olx.png";
import flombuIcon from "../../../../assets/images/flombu.png";
import realestateIcon from "../../../../assets/images/realstate-icon.png";

const ICONS = {
  1: olxIcon,
  3: flombuIcon,
  4: realestateIcon,
};

export const Resource = ({ data, resource }) => (
  <StyledResource icon={ICONS?.[resource]} className="flex items-center">
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
