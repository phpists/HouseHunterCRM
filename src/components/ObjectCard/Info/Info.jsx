import styled from "styled-components";
import { Header } from "./Header/Header";
import { Text } from "./Text";
import { Footer } from "./Footer/Footer";

export const Info = ({
  className,
  data,
  editable,
  onEdit,
  ad,
  onOpenAdList,
}) => {
  return (
    <StyledInfo
      className={`flex flex-col justify-between hide clickable hide-scroll ${className}`}
    >
      {ad ? null : <Header data={data} ad={ad} onOpenAdList={onOpenAdList} />}
      <Text data={data} editable={editable} onEdit={onEdit} ad={ad} />
      {ad ? null : (
        <Footer
          createDate={data?.dt_add}
          dateEdit={data?.dt_edit}
          id={data?.id}
          idSource={data?.id_ad_in_source}
          nameSource={data?.id_source}
          typeObject={data?.type_object}
        />
      )}
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  margin-right: 10px;
  height: max-content;
  overflow: auto;
  align-self: flex-start;
  @media (min-width: 1400px) {
    width: 180px;
  }
  @media (min-width: 1500px) {
    width: 280px;
  }
  @media (min-width: 1550px) {
    width: 330px;
  }
  @media (min-width: 1660px) {
    width: 330px;
  }
  @media (min-width: 1760px) {
    width: 420px;
  }
`;
