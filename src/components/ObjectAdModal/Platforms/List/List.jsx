import styled from "styled-components";
import { Card } from "./Card";
import olxIcon from "../../../../assets/images/olx.png";
import realstateIcon from "../../../../assets/images/realstate-icon.png";
import {
  useGetStatusAccountQuery,
  useLazyPublishObjectQuery,
} from "../../../../store/objects/objects.api";
import { Link } from "react-router-dom";
import { useGetRealestateStatusQuery } from "../../../../store/auth/auth.api";
import { Button } from "./Button";
import { XHOUSE_COMPANY_ID } from "../../../../constants";
import { useGetCompanyInfoQuery } from "../../../../store/billing/billing.api";
import cogoToast from "cogo-toast";
import { handleResponse } from "../../../../utilits";

export const List = ({ data, onChange, onChangeActiveTab }) => {
  const { data: accounts } = useGetStatusAccountQuery();
  const { data: realestateAccounts } = useGetRealestateStatusQuery();
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const [publishObject] = useLazyPublishObjectQuery();

  const handleTelegramPublish = (id) => {
    const { hide } = cogoToast.loading("Опублікування реклами в телеграмі", {
      position: "top-right",
    });
    console.log(data);
    publishObject({
      id_obj: id,
      resource: "telegram",
    }).then((resp) => {
      setTimeout(() => {
        hide();
        handleResponse(
          resp,
          () => {
            const messages = {
              new: "Нове оголошення, до активації та провірки",
              active: "Опубліковано на olx",
              limited:
                "Вичерпаний ліміт безкоштовних оголошень у вибраній категорії",
              removed_by_user: "Видалено користувачем",
              outdated: "Оголошення досягло дати придатності",
              unconfirmed: "Оголошення очікує на підтвердження ",
              unpaid: "Очікується оплата",
              moderated: "Відхилено модератором",
              blocked: "Заблоковано модератором",
              disabled:
                "Вимкнено модерацією, пропозиція заблокована та очікує перевірки",
              removed_by_moderator: "Видалено",
            };
            cogoToast.info(
              messages[resp?.data?.status] ?? "Оголошення успішно опубліковано",
              {
                hideAfter: 3,
                position: "top-right",
              }
            );
          },
          () => {
            const message = resp?.data?.messege;

            cogoToast.error(<>{message}</>, {
              hideAfter: 3,
              position: "top-right",
            });
          },
          true
        );
      }, 1000);
    });
  };

  return (
    <StyledList>
      {(accounts?.accounts?.length === 0 || !accounts?.accounts) &&
      realestateAccounts?.data?.length === 0 ? (
        <div className="empty">
          <span>Потрібно</span>
          <Link to="/advertising-setting">авторизуватись</Link>
        </div>
      ) : null}
      {accounts?.accounts?.length > 0
        ? accounts?.accounts?.map((account, i) => (
            <Card
              key={i}
              icon={olxIcon}
              title={
                account?.data?.name ??
                account?.data?.phone ??
                account?.data?.email ??
                account?.data?.id
              }
              onClick={() =>
                onChange(
                  "id_user_olx",
                  data?.id_user_olx?.includes(account?.data?.id)
                    ? data?.id_user_olx.filter((id) => id !== account?.data?.id)
                    : [...data?.id_user_olx, account?.data?.id]
                )
              }
              onChangeActiveTab={() => onChangeActiveTab(0)}
              active={data?.id_user_olx?.includes(account?.data?.id)}
            />
          ))
        : null}
      {realestateAccounts?.data?.length > 0
        ? realestateAccounts?.data?.map(({ id_account, email }, i) => (
            <Card
              key={i}
              icon={realstateIcon}
              title={email ?? id_account}
              onClick={() =>
                onChange(
                  "id_realstate_users",
                  data?.id_realstate_users?.includes(id_account)
                    ? data?.id_realstate_users.filter((i) => i !== id_account)
                    : [...data?.id_realstate_users, id_account]
                )
              }
              onChangeActiveTab={() => onChangeActiveTab(1)}
              active={data?.id_realstate_users?.includes(id_account)}
            />
          ))
        : null}
      <Button
        title="MLS"
        active={data?.mls}
        onClick={() => onChange("mls", !data?.mls)}
      />

      {XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash) &&
        data?.type_object !== "street_base" &&
        data?.type_object !== "mls" && (
          <Button
            title="Рекламувати в телеграм"
            onClick={() => handleTelegramPublish(data?.id)}
          />
        )}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    a {
      color: var(--main-color);
      font-weight: 500;
      margin-left: 10px;
      display: inline-block;
      text-decoration: underline;
    }
  }
`;
