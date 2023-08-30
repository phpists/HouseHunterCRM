import { styled } from "styled-components";

export const Info = () => (
  <StyledInfo>
    <h4 className="name">Юрій Олексійович</h4>
    <div className="email">yuriyo@gmail.com</div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  text-align: right;
  color: #fff;
  margin-right: 15px;
  .name {
    font-family: Overpass;
    font-size: 15px;
    font-weight: 100;
    line-height: 118%;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }
  .email {
    text-align: right;
    font-family: Open Sans;
    font-size: 11px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
