import styled from "styled-components";

export const Icon = ({ IconImg }) => (
  <StyledIcon className="flex items-center justify-center icon-wrapper">
    <IconImg />
  </StyledIcon>
);

const StyledIcon = styled.div`
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(46, 245, 198, 0.1);
  margin-right: 13px;
  svg {
    height: 21px;
    width: 21px;
    g {
      opacity: 1;
    }
  }
`;
