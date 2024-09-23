import styled from "styled-components";
import { Resource } from "./Resource";
import { Status } from "./Status";
import { useGetStatusAccountQuery } from "../../../../store/objects/objects.api";
import { handleFormatDate } from "../../../../utilits";

export const AdTags = ({ data, onUpdateField }) => {
  const { data: accounts } = useGetStatusAccountQuery();

  return (
    <StyledAdTags>
      <Resource
        data={
          accounts?.accounts?.find(
            (a) => a.data?.id?.toString() === data?.id_user_olx
          )?.data
        }
      />
      <Status
        status={data?.status}
        date={handleFormatDate(Number(data?.dt_publicate) * 1000, true)}
        idAd={data?.id_ad_in_source}
        idUserOlx={data?.id_user_olx}
        onUpdateField={onUpdateField}
      />
    </StyledAdTags>
  );
};

const StyledAdTags = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
