import { styled } from "styled-components";
import agentMeIcon from "../../../../../../../assets/images/agent-me.svg";
import agentIcon from "../../../../../../../assets/images/agent.svg";
import ownerIcon from "../../../../../../../assets/images/emoji.svg";

const TYPES = {
  agentMe: {
    color: "#5D63FF",
    title: "Агент",
    icon: agentMeIcon,
    width: 53,
  },
  agent: {
    color: "#FFF",
    title: "Агент",
    icon: agentIcon,
    width: 53,
  },
  owner: {
    color: "#81FB21",
    title: "Власник",
    icon: ownerIcon,
    width: 74,
  },
};

export const Name = ({ type, name, onClick }) => {
  return (
    <StyledName
      color={TYPES[type].color}
      roleWith={TYPES[type].width}
      className="flex items-center"
      onClick={onClick}
    >
      <img src={TYPES[type].icon} alt="" className="icon name-content" />
      <span className="name-content">{name}</span>
      <div className="flex items-center">
        <img src={TYPES[type].icon} alt="" className="icon" />
        <span className="title"> {TYPES[type].title} /</span>
        <span>{name}</span>
      </div>
    </StyledName>
  );
};

const StyledName = styled.div`
  text-align: right;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  color: ${({ color }) => color};
  position: relative;
  padding: 3px 0 3px 3px;
  .icon {
    margin-right: 4px;
  }
  .name-content {
    transition: all 0.3s;
  }
  div {
    position: absolute;
    right: 0;
    top: 0;
    padding: 3px 7px 3px 3px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8.5px);
    width: max-content;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    .title {
      margin: 0 5px;
      width: 0;
      transition: all 0.5s;
    }
  }
  &:hover {
    div {
      opacity: 1;
      visibility: visible;
      .title {
        width: ${({ roleWith }) => roleWith}px;
      }
    }
    .name-content {
      opacity: 0;
    }
  }
`;
