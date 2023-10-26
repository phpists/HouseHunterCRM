import styled from "styled-components";
import { Header } from "./Info/Header/Header";
import { CardTitle } from "./CardTitle";
import { Slider } from "./Slider/Slider";
import { CardDescription } from "./CardDescription";
import { Footer } from "./Info/Footer/Footer";
import { MainInfo } from "./MainInfo/MainInfo";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";

export const MobileContent = ({ data }) => (
  <StyledMobileContent>
    <Header />
    <CardTitle title={data?.title} />
    <Slider />
    <CardDescription text={data?.description} />
    <Footer />
    <MainInfo className="mobile-main-info" data={data} />
    <Tags className="mobile-tags" data={data} />
    <Contacts data={data} />
    <ShowMore clientId={data?.id_client} id={data?.id} />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  .mobile-main-info {
    width: 100%;
    margin: 10px 0;
    height: max-content;
  }
  .mobile-tags {
    width: 100%;
    margin-bottom: 10px;
    height: 170px;
  }
  @media (min-width: 801px) {
    display: none;
  }
`;
