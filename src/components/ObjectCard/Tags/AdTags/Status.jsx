import styled from "styled-components";
import { Tag } from "../../Info/Header/Tag";
import {
  useGetStatusesOlxQuery,
  useLazyGetStatusAddQuery,
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
  active: {
    color: "var(--green-tag)",
    bg: "var(--green-tag-bg)",
    title: "Рекламується",
  },
};

export const Status = ({ status, date, idAd, idUserOlx, onUpdateField }) => {
  const { data } = useGetStatusesOlxQuery();
  const [getStatusAdd] = useLazyGetStatusAddQuery();
  const [loading, setLoading] = useState(false);

  const handleRefreshStatus = () => {
    if (!loading) {
      setLoading(true);
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
    }
  };

  return (
    <StyledStatus onClick={handleRefreshStatus}>
      <div className="flex items-center gap-2">
        <Tag
          title={data?.data?.[status] ?? STATUSES[status]?.title}
          color="green"
          style={{
            color: STATUSES[status]?.color,
            background: STATUSES[status]?.bg,
          }}
        />
        <RefreshIcon className={`refreshIcon  ${loading && "loading"}`} />
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
