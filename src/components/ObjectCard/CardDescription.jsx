import styled from "styled-components";

export const CardDescription = ({ text = "-" }) => (
  <StyledCardDescription className="clickable hide-scroll">
    {text
      ?.replaceAll("<br />", "<DIVIDER/>")
      ?.replaceAll("&amp;#039;", "'")
      ?.replaceAll(/\s\s/g, "")
      ?.split("<DIVIDER/>")
      ?.filter((str) => str?.length > 0)
      ?.filter((str) => str !== "\t")
      ?.join("\n")}
  </StyledCardDescription>
);

const StyledCardDescription = styled.div`
  overflow: hidden;
  color: var(--main-color);
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  white-space: break-spaces;
  @media (max-width: 800px) {
    font-size: 14px;
    max-height: 153px;
    overflow: auto;
    margin: 10px 0 15px;
    word-break: break-all;
  }
`;
