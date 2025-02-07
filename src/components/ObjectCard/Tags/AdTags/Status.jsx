import styled from "styled-components";
import { Tag } from "../../Info/Header/Tag";
import {
  useGetStatusesOlxQuery,
  useLazyGetRielorAdStatusQuery,
  useLazyGetStatusAddQuery,
  useLazyGetStatusFlombuAdQuery,
  useLazySyncOtherDataRealestateAdQuery,
} from "../../../../store/auth/auth.api";
import { ReactComponent as RefreshIcon } from "../../../../assets/images/refresh-icon.svg";
import { useState } from "react";
import { handleResponse } from "../../../../utilits";

const STATUSES = {
  error: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Помилка",
  },
  closed: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Закритий",
  },
  err: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Помилка",
  },
  limited: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Перевищено ліміт",
  },
  removed_by_user: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Видалено користувачем",
  },
  blocked: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Заблоковано",
  },
  removed_by_moderator: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Видалено модератором",
  },
  not_found: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Не знайдено",
  },
  inactive: {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Не активний",
  },
  moderation: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  new: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  unconfirmed: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  unpaid: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Не оплачено",
  },
  disabled: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Не оплачено",
  },
  succeeded: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Рекламується",
  },
  active: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Рекламується",
  },
  "-2": {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Чорновик",
  },
  "-30": {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "Закрита база",
  },
  10: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Опубліковано",
  },
  1: {
    color: "#FF9F2EE5",
    bg: "#FF9F2E26",
    title: "На модерації",
  },
  "-10": {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Видалено",
  },
  "-20": {
    color: "#F93A3A",
    bg: "#F93A3A26",
    title: "Забанено",
  },
};

export const Status = ({
  status,
  date,
  idAd,
  idUserOlx,
  onUpdateField,
  idUserRealestate,
  resource,
  idObj,
  idUserRielor,
  noEdit,
}) => {
  const { data } = useGetStatusesOlxQuery();
  const [getStatusAdd] = useLazyGetStatusAddQuery();
  const [updateRealestateStatusAdd] = useLazySyncOtherDataRealestateAdQuery();
  const [getStatusFlombuAd] = useLazyGetStatusFlombuAdQuery();
  const [getRieltorAdStatus] = useLazyGetRielorAdStatusQuery();
  const [loading, setLoading] = useState(false);

  const handleRefreshStatus = () => {
    if (!loading) {
      setLoading(true);
      if (resource === "1") {
        getStatusAdd({
          id_ad_in_source: idAd,
          id_user_olx: idUserOlx,
        }).then((resp) => {
          setTimeout(() => {
            setLoading(false);
            if (resp?.data?.status) {
              onUpdateField("status", resp?.data?.status);
            }
          }, 1000);
        });
      } else if (resource === "3") {
        getStatusFlombuAd(idObj).then((resp) => {
          setTimeout(() => {
            setLoading(false);
            handleResponse(resp);
            if (resp?.data?.status) {
              onUpdateField("status", resp?.data?.status);
            }
          }, 1000);
        });
      } else if (resource === "5") {
        getRieltorAdStatus({
          id_account: idUserRielor,
          id_obj_in_source: idAd,
        }).then((resp) => {
          setTimeout(() => {
            setLoading(false);
            if (resp?.data?.status?.toString()?.length > 0) {
              onUpdateField("status", resp?.data?.status);
            }
          }, 1000);
        });
      } else {
        updateRealestateStatusAdd({
          id_add_in_source: idAd,
          id_account: idUserRealestate,
        }).then((resp) => {
          setTimeout(() => {
            setLoading(false);
            handleResponse(resp);
            if (resp?.data?.data) {
              onUpdateField("status", resp?.data?.data, true);
            }
          }, 1000);
        });
      }
    }
  };

  return (
    <StyledStatus onClick={handleRefreshStatus}>
      <div className="flex items-center gap-2">
        <Tag
          title={
            resource === "1"
              ? data?.data?.[status] ?? STATUSES[status]?.title
              : STATUSES[status]?.title ?? status
          }
          color="green"
          style={{
            color: STATUSES[status]?.color,
            background: STATUSES[status]?.bg,
          }}
        />
        {noEdit ? null : (
          <RefreshIcon className={`refreshIcon  ${loading && "loading"}`} />
        )}
      </div>
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--second-bg);
  padding: 10px;
  border-radius: 6px;
  gap: 5px;
  .clickable {
    width: max-content;
  }
  .date {
    margin-top: 5px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.24px;
    opacity: 0.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .refreshIcon {
    height: 15px;
    flex-shrink: 0;
    &.loading {
      animation: 2s infinite loading linear;
      @keyframes loading {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`;
