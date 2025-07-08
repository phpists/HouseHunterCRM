import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useLazyGetCarBodyQuery,
  useLazyGetOpenObjectQuery,
} from "../../store/objects/objects.api";
import { Slider } from "../../components/ObjectCard/Slider/Slider";
import {
  car_body_type,
  CarMainInfoFileds,
  CarsColor,
  source,
  type_fuel,
} from "../../constants";
import { Tag } from "../../components/ObjectCard/MainInfo/Tags/Tag";
import { handleGetPrices } from "../../components/ObjectCard/Info/Price";
import { CARS_STATUSES } from "../../components/Base/Base";
import { ObjectPriceHistory } from "../../components/ObjectPriceHistory";
import { Modal } from "../../components/Modal/Modal";
import Viber from "../../assets/images/viber.svg";
import Phone from "../../assets/images/small-phone.svg";
import Telegram from "../../assets/images/telegram.svg";
import Like from "../../assets/images/heart.svg";
import Eye from "../../assets/images/eye.svg";
import rst from "../../assets/images/rst.svg";
import olx from "../../assets/images/olx.png";
import Autoria from "../../assets/images/autoria.svg";
import Message from "../../assets/images/message.svg";
import { useAppSelect } from "../../hooks/redux";

const Car = () => {
  const { id } = useParams();
  const [getOpenObject, { data, isLoading }] = useLazyGetOpenObjectQuery();
  const [getCarBody, { data: carBody }] = useLazyGetCarBodyQuery();
  const [carData, setCarData] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState(false);
  const [isOpenContactsModal, setIsOpenContactsModal] = useState(false);
  const { user } = useAppSelect((state) => state.auth);
  const navigate = useNavigate();
  const carColor = CarsColor.filter(({ id }) => id === carData?.id_color)[0];

  useEffect(() => {
    if (id) {
      getOpenObject(id).then((response) => {
        if (response.data && response.data.data) {
          setCarData(response.data.data);
          setContacts(response.data.ContactData);
        }
      });
    }
  }, [id, getOpenObject]);

  useEffect(() => {
    carData?.id_rubric && getCarBody(carData?.id_rubric);
  }, [carData?.id_rubric]);

  if (isLoading) return <div>Завантаження...</div>;
  if (!carData) return <div>Не вдалося завантажити дані про автомобіль.</div>;

  let photos = [];
  try {
    const parsedPhotos = JSON.parse(carData.photo_links_json || "[]");
    photos = parsedPhotos.map((p) => ({ name: p }));
  } catch {}

  const getFromCarMainInfoFiledsOptions = (fieldName, index) => {
    return CarMainInfoFileds.filter(({ field }) => field === fieldName)[0]
      .field_option[+index];
  };

  function formatSaleInfo() {
    const date = new Date(carData.dt_add_in_source * 1000);

    const formattedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const status = CARS_STATUSES.filter(
      ({ value }) => value === carData.id_status_add
    )[0].title;

    return `${status} ${diffDays} днів у продажі ${formattedDate}`;
  }

  return (
    <StyledCar>
      {isOpenHistoryModal && (
        <ObjectPriceHistory
          onClose={() => setIsOpenHistoryModal(false)}
          data={carData.price_history_json}
        />
      )}

      {isOpenContactsModal && (
        <Modal onClose={() => setIsOpenContactsModal(false)} title="Contacts">
          <div className="flex flex-col justify-center gap-4">
            {contacts?.phones.map(({ phone }) => (
              <div className="flex flex-col w-full items-center gap-2">
                <h1 className="text-xl">+{phone}</h1>
                <div className="grid grid-cols-5 w-full">
                  <div className="flex justify-center">
                    <Tag
                      className="!text-2xl cursor-pointer w-12 !h-12 justify-center"
                      iIcom={"bi bi-copy"}
                      сopyValue={`+${phone}`}
                      copy
                    />
                  </div>
                  <a
                    href={`sms:${phone}?&amp;body=${user.sms_template.replace(
                      "[TEL]",
                      phone
                    )}`}
                    className="cursor-pointer flex justify-center"
                    aria-label="Call phone number"
                  >
                    <span className="flex items-center justify-center bg-slate-600 rounded-lg w-12 h-12">
                      <img
                        className="w-8 h-8"
                        src={Message}
                        alt="Message icon"
                      />
                    </span>
                  </a>
                  <a
                    href={`tel:+${phone}`}
                    className="cursor-pointer flex justify-center"
                    aria-label="Call phone number"
                  >
                    <span className="flex items-center justify-center bg-gray-600 rounded-lg w-12 h-12">
                      <img className="w-8 h-8" src={Phone} alt="Phone icon" />
                    </span>
                  </a>
                  <a
                    href={`viber://contact?number=${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex justify-center"
                    aria-label="Open Viber chat"
                    onClick={(e) => {
                      if (
                        !navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)
                      ) {
                        e.preventDefault();
                        alert(
                          "Please open Viber on your mobile device to start a chat."
                        );
                      }
                    }}
                  >
                    <span className="flex items-center justify-center bg-purple-600 rounded-lg w-12 h-12">
                      <img className="w-8 h-8" src={Viber} alt="Viber icon" />
                    </span>
                  </a>
                  <a
                    href={`https://t.me/+${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex justify-center"
                    aria-label="Open Telegram chat"
                  >
                    <span className="flex items-center justify-center bg-blue-600 rounded-lg w-12 h-12">
                      <img
                        className="w-8 h-8"
                        src={Telegram}
                        alt="Telegram icon"
                      />
                    </span>
                  </a>
                </div>
              </div>
            ))}
            {/* {contacts?.phones.map(({ phone }) => (
              <a href={`tel:+${phone}`}>+{phone}</a>
            ))} */}
          </div>
        </Modal>
      )}

      <Slider photos={photos} data={carData} isCarPage />

      <div className="flex justify-between my-4 text-white/60 text-xs">
        <div className="flex gap-2">
          <h1 className="flex items-center gap-1">
            {carData.count_views} <img className="w-4" src={Eye} alt="" />
          </h1>
          <h1 className="flex items-center gap-1">
            {carData.count_likes} <img className="w-3" src={Like} alt="" />
          </h1>
        </div>
        <h1>Розміщено: {source[carData.id_source]}</h1>
      </div>

      <div>
        <h1
          onClick={() => {
            window.open(`${carData.link}`, "_blank");
          }}
          className="cursor-pointer hover:underline flex items-center gap-2 text-2xl"
        >
          {carData.id_source === "1" && (
            <img src={Autoria} alt="Autoria" className="w-10" />
          )}
          {carData.id_source === "2" && (
            <img src={olx} alt="olx" className="w-6" />
          )}
          {carData.id_source === "3" && (
            <img src={rst} alt="RST" className="w-8" />
          )}
          {`${carData?.brand_name} ${carData?.model_name} ${carData?.year}`}
        </h1>
      </div>

      <div
        className="cursor-pointer my-4 flex price justify-between"
        onClick={() => setIsOpenHistoryModal(true)}
      >
        <div>
          <div className="flex">
            <span className="text-lg">{carData.price_usd}$</span>
            <span className="text-red-500 text-xs ml-1">
              {carData.price_change_for_last !== "0" &&
                `- ${carData.price_change_for_last}`}
            </span>
          </div>
          {carData?.tag_market_bottom &&
          carData?.tag_price_dump !== "0" &&
          new Date(Number(carData?.tag_price_dump) * 1000) >=
            new Date().getTime() ? (
            <div className="text-xs text-red-500 animate-pulse">
              !!! Ціна часто змінюється
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex text-white/60 text-sm">
            {handleGetPrices(carData?.price_history_json)?.length < 3
              ? null
              : handleGetPrices(carData?.price_history_json)
                  .slice(0, 2)
                  ?.map((p, i) => (
                    <>
                      {i !== 0 && <span className="mr-1">,</span>}
                      <div key={i}>{p}$</div>
                    </>
                  ))}
          </div>
          <p className="underline text-white/60 text-xs">
            Переглянути всю історію цін
          </p>
        </div>
      </div>

      {/* <div className="my-4 flex flex-wrap gap-2">
        {carData?.state_number && (
          <Tag className="!text-xs" title={carData?.state_number} copy />
        )}
        {carData?.tag_faster && carData?.tag_faster === "1" && (
          <Tag className="!text-xs" title={"Терміново"} />
        )}
        {carData?.tag_nativePaint && carData?.tag_nativePaint === "1" && (
          <Tag className="!text-xs" title={"Рідна фарба"} />
        )}
        {carData?.tag_freshlyDriven &&
          (carData?.tag_freshlyDriven === "1") === "1" && (
            <Tag className="!text-xs" title={"Свіжопригнана"} />
          )}
        {carData?.tag_afterDTP && carData?.tag_afterDTP === "1" && (
          <Tag className="!text-xs" title={"Після дтп"} />
        )}
        {carData?.tag_market_bottom &&
          (carData?.tag_market_bottom === "1") === "1" && (
            <Tag className="!text-xs" title={"По низу ринку"} />
          )}
        {carData?.exchangePossible && carData?.exchangePossible === "1" && (
          <Tag className="!text-xs" title={"Можливий обмін"} />
        )}
        {carData?.id && (
          <Tag className="!text-xs" title={"ID"} copy сopyValue={carData?.id} />
        )}
      </div> */}

      <div className="grid grid-cols-2 gap-2">
        <Tag
          title={`${
            Number(carData?.сar_mileage) / 1000 === 0
              ? "-"
              : Number(carData?.сar_mileage) / 1000
          } тис. км.`}
          iIcom="bi bi-circle-fill"
        />
        <Tag title={carData.location_name} iIcom="bi bi-circle-fill" />
        <Tag
          title={`${getFromCarMainInfoFiledsOptions(
            "id_type_fuel",
            carData.id_type_fuel
          )} ${
            carData.volume_engine && carData.volume_engine !== "0"
              ? `${Number(carData.volume_engine) / 1000} л`
              : ""
          }`}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          title={getFromCarMainInfoFiledsOptions("kpp", carData.kpp)}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          title={getFromCarMainInfoFiledsOptions(
            "drive_type",
            carData.drive_type
          )}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          title={
            carBody?.data?.filter(({ id }) => id === carData?.id_type_body)[0]
              ?.name
          }
          iIcom="bi bi-circle-fill"
        />
        <Tag title={carData.rubric_name} iIcom="bi bi-circle-fill" />
        {carData.id_ecological_standard !== "0" && (
          <Tag
            title={
              CarMainInfoFileds.filter(
                ({ field }) => field === "id_ecological_standard"
              )[0].field_option[carData.id_ecological_standard]
            }
            iIcom="bi bi-circle-fill"
          />
        )}

        <Tag
          className={`!bg-[${carColor?.hex}]`}
          title={carColor?.name}
          iIcom="bi bi-circle-fill"
        />
      </div>

      <p className="text-xs my-4 text-white/60">{carData.description}</p>

      {carData.comment_autoria.length > 1 && (
        <div className="my-4">
          <h1>Коментарі</h1>
          <p className="text-sm my-2">
            дата додавання коментаря | {carData.comment_autoria_days}
          </p>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: carData.comment_autoria,
            }}
          ></div>
        </div>
      )}

      {carData.VIN && (
        <div className="flex flex-wrap gap-2 items-center">
          <Tag
            className="!text-xs cursor-pointer"
            title={`VIN ${carData.VIN}`}
            onClick={() => {
              localStorage.setItem(
                "objectsLastFilters",
                JSON.stringify({ VIN: carData.VIN })
              );
              window.open(`/objects`, "_blank");
            }}
          />

          <Tag
            className="!text-xs cursor-pointer"
            сopyValue={carData.VIN}
            iIcom="bi bi-copy"
            copy
          />
          <p
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=VIN+${carData.VIN}`,
                "_blank"
              )
            }
            className="cursor-pointer underline text-white/60 text-xs"
          >
            шукати в Google
          </p>
        </div>
      )}

      {carData.state_number && (
        <div className="flex flex-wrap gap-2 items-center">
          <Tag className="!text-xs" title={`${carData.state_number}`} />

          <Tag
            className="!text-xs"
            сopyValue={carData.state_number}
            iIcom="bi bi-copy"
            copy
          />
        </div>
      )}

      <div className="my-4 flex items-center gap-4">
        <Tag
          className={`${
            carData?.Count_object > 10
              ? "!bg-red-300/20 !text-red-500"
              : "!bg-inherit"
          }`}
          titleHtml={
            <span className={`text-xs`}>
              {carData?.Count_object > 10
                ? " Перекуп "
                : carData?.Count_object > 5
                ? " Перекуп ? "
                : carData?.Count_object > 2
                ? " Перекуп ? "
                : " Продавець "}
            </span>
          }
        />
        <span className="text-xs text-white/60">
          Продав ({carData?.Count_object}) авто
        </span>
      </div>

      <div className="my-4 flex items-center gap-2">
        <Tag className="!text-xs" title={`id xdrive ${carData.id_hash}`} />

        <Tag
          className="!text-xs cursor-pointer"
          сopyValue={carData.id_hash}
          iIcom="bi bi-copy"
          copy
        />
      </div>

      <div className="my-4 flex items-center gap-2">
        <Tag
          className="!text-xs"
          title={`Першоджерело ${carData.id_ad_in_source}`}
        />

        <Tag
          className="!text-xs cursor-pointer"
          сopyValue={carData.id_ad_in_source}
          iIcom="bi bi-copy"
          copy
        />
      </div>

      <p className="text-sm text-white/60 mb-6">{formatSaleInfo()}</p>

      <div className="flex gap-2 my-4">
        {carData?.exchangePossible !== "0" && (
          <Tag className="!text-xs" title={`Можливий обмін`} />
        )}
        {carData?.tag_afterDTP !== "0" && (
          <Tag className="!text-xs" title={`Участь у дтп`} />
        )}
        {carData?.id_custom !== "0" && (
          <Tag className="!text-xs" title={`Не розмитнена`} />
        )}
        {carData?.id_technical_condition !== "0" && (
          <Tag
            className="!text-xs"
            title={getFromCarMainInfoFiledsOptions(
              "id_technical_condition",
              carData.id_technical_condition
            )}
          />
        )}
        {carData?.tag_nativePaint && carData?.tag_nativePaint === "1" && (
          <Tag className="!text-xs" title={"Рідна фарба"} />
        )}
        {carData?.tag_freshlyDriven &&
          (carData?.tag_freshlyDriven === "1") === "1" && (
            <Tag className="!text-xs" title={"Свіжопригнана"} />
          )}
      </div>

      {carData.state_number && (
        <div className="flex flex-wrap gap-2 items-center">
          <Tag className="!text-xs" title={`${carData.state_number}`} />

          <Tag
            className="!text-xs"
            сopyValue={carData.state_number}
            iIcom="bi bi-copy"
            copy
          />
        </div>
      )}

      {contacts?.phones[0]?.phone !== "380000000000" ? (
        <span
          onClick={() => setIsOpenContactsModal(true)}
          className="sticky cursor-pointer bottom-0 w-full h-12 bg-green-500 flex items-center justify-center rounded"
        >
          +{contacts?.phones[0]?.phone}
        </span>
      ) : (
        <span
          onClick={() => {
            carData.link && window.open(`${carData.link}`, "_blank");
          }}
          className="text-xs cursor-pointer hover:underline w-full h-12 bg-red-400 flex items-center justify-center rounded gap-2"
        >
          <span>Номер телефону відсутній, перейдіть на</span>

          {carData.id_source === "1" && (
            <img src={Autoria} alt="Autoria" className="w-10" />
          )}
          {carData.id_source === "2" && (
            <img src={olx} alt="olx" className="w-6" />
          )}
          {carData.id_source === "3" && (
            <img src={rst} alt="RST" className="w-8" />
          )}
        </span>
      )}
    </StyledCar>
  );
};

const StyledCar = styled.div`
  height: calc(100svh - 2000px);
  color: #fff;
  padding: 0 10px;

  .price {
    color: var(--green);
  }
`;

export default Car;

// date_update_comment
