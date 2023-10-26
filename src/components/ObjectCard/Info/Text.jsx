import styled from "styled-components";

export const Text = ({ data }) => {
  return (
    <StyledText className="hide-scroll clickable">
      <div className="title clickable">
        {data?.title?.length > 0 ? data?.title : "-"}
      </div>
      <div className="descr clickable">
        {data?.description?.length > 0 ? data?.description : "-"}
      </div>
    </StyledText>
  );
};

const StyledText = styled.div`
  width: 400px;
  max-height: 130px;
  overflow: auto;
  margin-bottom: 15px;
  .title {
    color: #fff;
    /* H3 */
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    margin-bottom: 10px;
  }
  .descr {
    overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 240px;
    height: 130px;
  }
  @media (min-width: 1600px) {
    width: 400px;
  }
`;
