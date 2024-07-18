import styled from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/images/plus.svg";
import { IconButton } from "../../../../../components/IconButton";

export const Footer = ({ onCreate }) => (
  <StyledFooter className="flex items-center">
    <SaveButton />
    {/* <IconButton Icon={RemoveIcon} />
    <IconButton Icon={PlusIcon} onClick={onCreate} /> */}
  </StyledFooter>
);

const StyledFooter = styled.div`
  gap: 10px;
`;
