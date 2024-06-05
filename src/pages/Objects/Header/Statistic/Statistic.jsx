import styled from "styled-components";
import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as Icon } from "../../../../assets/images/statistic-icon.svg";
import { useState } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { useLazyGetObjectsStatusticQuery } from "../../../../store/objects/objects.api";
import {
  handleFromInputDate,
  handleResponse,
  removePhoneMask,
} from "../../../../utilits";
import { Loader } from "../../../../components/Loader";
import { Price } from "../../../../components/Price/Price";
import { PriceCard } from "./PriceCard";

export const Statistic = ({ filters }) => {
  const [open, setOpen] = useState(false);
  const [getStatistic, { data }] = useLazyGetObjectsStatusticQuery();
  const [loading, setLoading] = useState(false);

  const handleGetStatistic = () => {
    setLoading(true);

    let data = {};

    const {
      company_object,
      street_base_object,
      mls_object,
      sorting,
      ...otherFilters
    } = Object.fromEntries(
      Object.entries(filters)?.filter((f) => f[1] !== "0")
    );

    let dt_end_agreement_to = company_object?.dt_end_agreement_to
      ? new Date(handleFromInputDate(company_object?.dt_end_agreement_to))
      : undefined;

    if (dt_end_agreement_to) {
      dt_end_agreement_to.setHours(23);
      dt_end_agreement_to.setMinutes(59);
      dt_end_agreement_to.setSeconds(59);
    }

    data = {
      ...data,
      company_object: {
        ...company_object,
        dt_end_agreement_to: dt_end_agreement_to?.getTime() / 1000,
      },
      street_base_object,
      mls_object,
      sorting,
      filters: {
        ...otherFilters,
        // search_phone_code:
        //   removePhoneMask(filters?.search_phone)?.length > 0
        //     ? phoneCode
        //     : undefined,
        findPhone:
          filters?.findPhone?.length > 0 ? filters?.findPhone : undefined,
        search_phone:
          removePhoneMask(filters?.search_phone)?.length > 0
            ? removePhoneMask(filters?.search_phone)
            : undefined,
      },
    };

    getStatistic(data).then((resp) =>
      handleResponse(
        resp,
        () => {
          setLoading(false);
        },
        () => setLoading(false)
      )
    );
  };

  const handleOpen = () => {
    if (filters) {
      handleGetStatistic();
      setOpen(true);
    }
  };

  return (
    <StyledStatistic>
      {open && (
        <Modal onClose={() => setOpen(false)} title="Статистика ціни">
          {loading && <Loader white />}
          <PriceCard
            title="Середня ціна"
            cardType="avg"
            data={data?.date ?? {}}
          />
          <PriceCard
            title="Мінімальна ціна"
            cardType="min"
            data={data?.date ?? {}}
          />
          <PriceCard
            title="Максимальна ціна"
            cardType="max"
            data={data?.date ?? {}}
          />
        </Modal>
      )}
      <IconButton Icon={Icon} className="icon-btn" onClick={handleOpen} />
    </StyledStatistic>
  );
};

const StyledStatistic = styled.div`
  svg {
    opacity: 0.5;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;
