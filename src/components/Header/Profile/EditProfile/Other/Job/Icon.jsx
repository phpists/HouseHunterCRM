import { styled } from "styled-components";
import usersIcon from "../../../../../../assets/images/users-profile.svg";

export const Icon = () => (
  <StyledIcon className="flex items-center justify-center job-icon">
    <img src={usersIcon} alt="" />
  </StyledIcon>
);

const StyledIcon = styled.div`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--active-bg);
  margin-right: 8px;
  transition: all 0.3s;
`;
