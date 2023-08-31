import { styled } from "styled-components";
import { Icon } from "./Icon";
import emoji from "../../../../../../assets/images/emoji.svg";
import { Agents } from "./Agents";

export const Job = () => (
  <StyledJob className="flex items-center justify-between">
    <div className="flex items-center">
      <Icon />
      <div>
        <div className="title flex items-start">
          Структурний керівник <img src={emoji} alt="" />
        </div>
        <div className="subtitle">Посада</div>
      </div>
    </div>
    <Agents />
  </StyledJob>
);

const StyledJob = styled.div`
  padding: 4px 16px 4px 4px;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
    img {
      margin-left: 5px;
    }
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: #fff;
    .title,
    .subtitle {
      color: #2c2c2c;
    }
    .job-icon {
      background: #2c2c2c;
    }
  }
`;
