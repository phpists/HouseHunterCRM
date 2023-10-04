import { styled } from "styled-components";
import { ClientAvatar } from "../../../../../components/ClientAvatar";
import { Name } from "./Name";
import { Id } from "./Id";
import { CreatedAt } from "./CreatedAt";
import smallAvatar from "../../../../../assets/images/small-avarar-orange.svg";

export const MainInfo = () => {
  return (
    <StyledMainInfo className="flex items-center">
      <ClientAvatar type={1} className="large-avatar" />
      <img src={smallAvatar} alt="" className="small-avatar" />
      <div className="ml-3 main-info-content">
        <div className="flex items-center">
          <Name />
          <Id />
        </div>
        <CreatedAt />
      </div>
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  margin-right: 45px;
  flex-shrink: 0;
  .small-avatar {
    display: none;
  }
  @media (max-width: 1600px) {
    margin-right: 8px;
    width: 100%;
    flex-shrink: 1;
    .large-avatar {
      display: none;
    }
    .small-avatar {
      display: block;
      width: 40px;
      height: 40px;
    }
    .main-info-content {
      margin-left: 4px;
    }
  }

  @media (max-width: 850px) {
    .small-avatar {
      display: none;
    }
    .main-info-content {
      margin-left: 0;
    }
    margin: 0 0 6px;
  }
`;
