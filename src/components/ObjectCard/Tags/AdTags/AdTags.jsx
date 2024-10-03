import styled from "styled-components";
import { Resource } from "./Resource";
import { Status } from "./Status";
import { useGetStatusAccountQuery } from "../../../../store/objects/objects.api";
import { handleFormatDate } from "../../../../utilits";
import { useGetRealestateStatusQuery } from "../../../../store/auth/auth.api";
import { useAppSelect } from "../../../../hooks/redux";

export const AdTags = ({ data, onUpdateField }) => {
  const { data: accounts } = useGetStatusAccountQuery();
  const { data: realestateAccounts } = useGetRealestateStatusQuery();
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledAdTags>
      <Resource
        dataOlx={
          accounts?.accounts?.find(
            (a) => a.data?.id?.toString() === data?.id_user_olx
          )?.data
        }
        realestateEmail={
          realestateAccounts?.data?.find(
            (a) => a.id_account === data?.id_realestate_account
          )?.email
        }
        userName={`${user?.first_name} ${user?.last_name}`}
        resource={data?.id_resource}
      />
      <Status
        status={data?.status}
        date={handleFormatDate(Number(data?.dt_publicate) * 1000, true)}
        idAd={data?.id_ad_in_source}
        idObj={data?.id_obj}
        idUserOlx={data?.id_user_olx}
        onUpdateField={onUpdateField}
        idUserRealestate={data?.id_realestate_account}
        resource={data?.id_resource}
      />
    </StyledAdTags>
  );
};

const StyledAdTags = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;
