import styled from "styled-components";
import olxIcon from "../../../../assets/images/olx.png";
import flombuIcon from "../../../../assets/images/flombu.png";
import realestateIcon from "../../../../assets/images/realstate-icon.png";
import rieltorIcon from "../../../../assets/images/rieltor-logo.webp";

const ICONS = {
  1: olxIcon,
  3: flombuIcon,
  4: realestateIcon,
  5: rieltorIcon,
};

export const Resource = ({ dataOlx, realestateEmail, userName, resource }) => (
  <StyledResource icon={ICONS?.[resource]} className="flex items-center">
    <div></div>{" "}
    {dataOlx?.name ??
      dataOlx?.phone ??
      dataOlx?.email ??
      dataOlx?.id ??
      realestateEmail ??
      userName}
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
