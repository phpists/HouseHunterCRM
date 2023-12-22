import { styled } from "styled-components";
import { ReactComponent as CheckIcon } from "../../assets/images/check-check.svg";
import replyIcon from "../../assets/images/reply.svg";
import { getHours } from "../../utilits";

export const MessageFooter = ({ date, isOwner, isSelected }) => (
  <StyledMessageFooter
    className="flex items-center justify-end message"
    isOwner={isOwner}
  >
    {getHours(date)}
    {isSelected ? (
      <img src={replyIcon} alt="" className="message" />
    ) : (
      <>
        <CheckIcon className="message" />
        <img src={replyIcon} alt="" className="reply-icon message" />
      </>
    )}
  </StyledMessageFooter>
);

const StyledMessageFooter = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 100%; /* 12px */
  letter-spacing: 0.24px;
  min-height: 16px;
  svg,
  img {
    margin-left: 3px;
  }
  .reply-icon {
    display: none;
  }
  &:hover {
    svg {
      display: none;
    }
    .reply-icon {
      display: block;
    }
  }

  ${({ isOwner }) =>
    isOwner &&
    `
    path {
        stroke: #67CB4E;
    }
  `}
`;
