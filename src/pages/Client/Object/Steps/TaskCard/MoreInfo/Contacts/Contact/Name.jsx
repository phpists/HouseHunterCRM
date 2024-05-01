import { styled } from "styled-components";
import agentMeIcon from "../../../../../../../../assets/images/agent-me.svg";
import agentIcon from "../../../../../../../../assets/images/agent.svg";
import ownerIcon from "../../../../../../../../assets/images/emoji.svg";

const TYPES = {
  agentMe: {
    color: "#5D63FF",
    title: "Агент",
    icon: agentMeIcon,
    width: 53,
  },
  agent: {
    color: "var(--main-color)",
    title: "Агент",
    icon: agentIcon,
    width: 53,
  },
  owner: {
    color: "var(--green)",
    title: "Власник",
    icon: ownerIcon,
    width: 74,
  },
};

export const Name = ({ type, name, onClick, isHover }) => {
  return (
    <StyledName
      color={TYPES[type].color}
      roleWith={TYPES[type].width}
      className="flex items-end"
      onClick={onClick}
      isHover={isHover}
    >
      <span>{name}</span>
      <div className="role">/ {TYPES[type].title}</div>
      <img src={TYPES[type].icon} alt="" className="icon " />
    </StyledName>
  );
};

const StyledName = styled.div`
  text-align: right;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  color: ${({ color }) => color};
  .icon {
    margin: 0 0 2px 4px;
  }
  .name-content {
    transition: all 0.3s;
  }
  .role {
    ${({ isHover }) => isHover && " margin: 0 5px;"}
    width: ${({ roleWith, isHover }) => (isHover ? roleWith : 0)}px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s;
  }
`;
