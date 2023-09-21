import styled from "styled-components";
import { Colors } from "./Colors";
import { Footer } from "./Footer";

export const Creating = ({ onClose }) => {
  return (
    <StyledCreating>
      <div className="flex items-center justify-between content-wrapper-creating">
        <div>
          <div className="title">Назва ролі</div>
          <div className="subtitle">Оберіть назву та колір</div>
        </div>
        <Colors />
      </div>
      <Footer onClose={onClose} />
    </StyledCreating>
  );
};

const StyledCreating = styled.div`
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  .content-wrapper-creating {
    padding: 10px 20px 9px;
  }
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
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
`;
