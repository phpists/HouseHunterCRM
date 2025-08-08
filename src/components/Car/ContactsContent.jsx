import rst from "../../assets/images/rst.svg";
import olx from "../../assets/images/olx.png";
import Autoria from "../../assets/images/autoria.svg";
import Viber from "../../assets/images/viber.svg";
import Telegram from "../../assets/images/telegram.svg";
import Phone from "../../assets/images/small-phone.svg";
import { useAppSelect } from "../../hooks/redux";
import { Tag } from "../ObjectCard/MainInfo/Tags/Tag";
import SMSModal from "./SMSModal";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/actions";
import { applyDiscount } from "../../utilits";

const ContactsContent = ({ phones, data, isMainPage }) => {
  const { user } = useAppSelect((state) => state.auth);
  const { smsMessage, smsTagsMessage } = useAppSelect((state) => state.car);
  const { setSmsMessage, setSmsTagsMessage } = useActions();
  const [isOpenSMSModal, setIsOpenSMSModal] = useState(false);
  const defaultMessage = "Куплю ваш [MARKA] по ціні [TORG_10] [TEL].";

  const finalMessage = (tagText) =>
    tagText
      .replaceAll("[TEL]", user?.phones?.[0]?.phone)
      .replaceAll("[MARKA]", data.brand_name)
      .replaceAll("[MODEL]", data.model_name)
      .replaceAll("[TORG_5]", applyDiscount(data.price_usd, 5))
      .replaceAll("[TORG_10]", applyDiscount(data.price_usd, 10))
      .replaceAll("[TORG_15]", applyDiscount(data.price_usd, 15))
      .replaceAll("[TORG_20]", applyDiscount(data.price_usd, 20));

  // set default message
  useEffect(() => {
    const storageSmsMessage = localStorage.getItem("smsMessage");
    const storageSmsTagsMessage = localStorage.getItem("smsTagsMessage");
    // console.log(storageSmsMessage);
    // console.log(storageSmsTagsMessage);
    setSmsMessage(storageSmsMessage || finalMessage(defaultMessage));
    setSmsTagsMessage(storageSmsTagsMessage || defaultMessage);
  }, []);

  return (
    <>
      {isOpenSMSModal && (
        <SMSModal
          finalMessage={finalMessage(smsTagsMessage)}
          data={data}
          setDefault={() => setSmsTagsMessage(defaultMessage)}
          realMessage={smsMessage}
          defaultMessage={defaultMessage}
          closeModal={() => setIsOpenSMSModal(false)}
        />
      )}

      {phones[0]?.phone !== "380000000000" ? (
        <div className="mt-6 flex flex-col gap-3">
          {phones.map(({ phone }) => (
            <>
              <span className="cursor-pointer bottom-0 w-full h-12 bg-[var(--tag-bg-2)] flex items-center justify-center rounded">
                +{phone}
              </span>
              <div className="flex justify-between w-full">
                <div>
                  <Tag
                    className="!text-2xl cursor-pointer w-12 !h-12 justify-center"
                    iIcom={"bi bi-copy"}
                    сopyValue={`+${phone}`}
                    copy
                  />
                </div>
                {isMainPage ? (
                  <>
                    <a
                      href={`viber://chat?number=${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex justify-center"
                      aria-label="Open Viber chat"
                      onClick={(e) => {
                        if (
                          !navigator.userAgent.match(
                            /(iPhone|iPod|iPad|Android)/
                          )
                        ) {
                          e.preventDefault();
                          alert(
                            "Please open Viber on your mobile device to start a chat."
                          );
                        }
                      }}
                    >
                      <span className="flex items-center justify-center bg-purple-600 rounded-lg w-12 h-12">
                        <img className="w-7 h-7" src={Viber} alt="Viber icon" />
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
                          className="w-7 h-7"
                          src={Telegram}
                          alt="Telegram icon"
                        />
                      </span>
                    </a>
                  </>
                ) : (
                  <div className="flex gap-4 md:gap-12">
                    <a
                      href={`sms:${phone}?body=${smsMessage}`}
                      className="cursor-pointer flex justify-center"
                      aria-label="Call phone number"
                    >
                      <span className="flex items-center justify-center bg-slate-600 rounded-lg w-12 h-12">
                        SMS
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
                          !navigator.userAgent.match(
                            /(iPhone|iPod|iPad|Android)/
                          )
                        ) {
                          e.preventDefault();
                          alert(
                            "Please open Viber on your mobile device to start a chat."
                          );
                        }
                      }}
                    >
                      <span className="flex items-center justify-center bg-purple-600 rounded-lg w-12 h-12">
                        <img className="w-7 h-7" src={Viber} alt="Viber icon" />
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
                          className="w-7 h-7"
                          src={Telegram}
                          alt="Telegram icon"
                        />
                      </span>
                    </a>
                  </div>
                )}
                <a
                  href={`tel:+${phone}`}
                  className="cursor-pointer flex justify-end"
                  aria-label="Call phone number"
                >
                  <span className="flex items-center justify-center bg-green-600 rounded-lg w-20 h-12">
                    <img className="w-7 h-7" src={Phone} alt="Phone icon" />
                  </span>
                </a>
              </div>
            </>
          ))}
          {!isMainPage && (
            <span
              onClick={() => setIsOpenSMSModal(true)}
              className="cursor-pointer hover:underline text-center w-full my-2 text-white/80"
            >
              Налаштування SMS шаблону
            </span>
          )}
        </div>
      ) : (
        <span
          onClick={() => {
            data.link && window.open(`${data.link}`, "_blank");
          }}
          className="mt-6 text-xs cursor-pointer hover:underline w-full h-12 bg-red-500 flex items-center justify-center rounded gap-2"
        >
          <span>Номер телефону відсутній, перейдіть на</span>
          {data.id_source === "1" && (
            <img src={Autoria} alt="Autoria" className="w-10" />
          )}
          {data.id_source === "2" && (
            <img src={olx} alt="olx" className="w-6" />
          )}
          {data.id_source === "3" && (
            <img src={rst} alt="RST" className="w-8" />
          )}
        </span>
      )}
    </>
  );
};

export default ContactsContent;
