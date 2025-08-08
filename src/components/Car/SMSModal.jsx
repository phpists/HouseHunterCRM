import { useState } from "react";
import { useAppSelect } from "../../hooks/redux";
import { Modal } from "../Modal/Modal";
import { useActions } from "../../hooks/actions";
import { applyDiscount } from "../../utilits";

const SMSModal = ({
  data,
  closeModal,
  defaultMessage,
  setDefault,
  finalMessage,
}) => {
  const { setSmsMessage } = useActions();
  const { setSmsTagsMessage } = useActions();
  const { user } = useAppSelect((state) => state.auth);
  const { smsMessage, smsTagsMessage } = useAppSelect((state) => state.car);

  const saveSmsMesssage = () => {
    localStorage.setItem("smsMessage", finalMessage);
    localStorage.setItem("smsTagsMessage", smsTagsMessage);
  };

  const Tag = ({ text }) => {
    return (
      <span
        onClick={() => setSmsTagsMessage(smsTagsMessage + text)}
        className="cursor-pointer text-sm bg-zinc-700 w-fit h-fit rounded-md px-1 font-bold text-white/80"
      >
        {text}
      </span>
    );
  };

  return (
    <Modal onClose={closeModal} title="Мій шаблон для SMS">
      <div className="flex flex-col justify-center gap-4">
        <div
          className={`p-3 flex flex-col items-end bg-[var(--second-bg)] rounded`}
        >
          <textarea
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue > 300) {
                setSmsTagsMessage(inputValue.slice(0, 300));
              } else {
                setSmsTagsMessage(inputValue);
              }
            }}
            value={smsTagsMessage}
            className="resize-none text-xs h-20 w-full"
            placeholder=" Enter your message here..."
          />
          <span className="text-xs text-gray-500">{smsMessage.length}/300</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              saveSmsMesssage();
              setSmsMessage(finalMessage);
              closeModal();
            }}
            className="rounded py-1 w-full hover:bg-white/90 bg-white text-[var(--modal-bg)]"
          >
            Застосувати
          </button>
          <button
            onClick={() => {
              setDefault();
              setSmsTagsMessage(defaultMessage);
            }}
            className="rounded py-1 w-full hover:bg-white/60 bg-white/50 text-[var(--modal-bg)]"
          >
            Скасувати
          </button>
        </div>
        <div className="relative bg-green-500 p-2 rounded-md text-xs flex flex-col gap-1">
          <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-[-9px] right-[14px]"
          >
            <path d="M16.5 11L0 1.5L16.5 0V11Z" fill="#22c55e" />
          </svg>
          <p className="overflow-hidden">{finalMessage}</p>
          <span className="self-end text-xs text-white/80">
            {finalMessage.length}
          </span>
        </div>

        <h1 className="font-bold text-lg">Як праюють [ТЕГИ]?</h1>

        <div className="grid grid-cols-[30%_70%] gap-y-3">
          <Tag text="[TEL]" />
          <p className="text-white/60 text-xs">
            - цей текст заміниться на ваш номер телефону, який ви вказали в
            профілі (+{user?.phones?.[0]?.phone})
          </p>
          <Tag text="[MARKA]" />
          <p className="text-white/60 text-xs">
            - Якшо в даному оголошенні марка авто {data.brand_name}, то текст
            [MARKA] перетвориться в "{data.brand_name}"
          </p>
          <Tag text="[MODEL]" />
          <p className="text-white/60 text-xs">
            - модель авто, в оголошенні ({data.model_name})
          </p>
          <Tag text="[TORG_5]" />
          <p className="text-white/60 text-xs">
            - Якщо в оголошенні була ціна "{data.price_usd}", то тег замінить
            текст на "{applyDiscount(data.price_usd, 5)}"
          </p>
          <Tag text="[TORG_10]" />
          <p className="text-white/60 text-xs">
            - ціна на авто в оголошенні -10% (
            {applyDiscount(data.price_usd, 10)})
          </p>
          <Tag text="[TORG_15]" />
          <p className="text-white/60 text-xs">
            - ціна на авто в оголошенні -15% (
            {applyDiscount(data.price_usd, 15)})
          </p>
          <Tag text="[TORG_20]" />
          <p className="text-white/60 text-xs">
            - ціна на авто в оголошенні -20% (
            {applyDiscount(data.price_usd, 20)})
          </p>
        </div>

        <hr className="border-white/30" />

        <h1 className="font-bold text-lg">Приклади шаблонів SMS:</h1>

        <div className="grid gap-2">
          <p className="text-white/60 text-xs">
            Куплю ваш авто по ціні <Tag text={"[TORG_20]"} /> Телефонуйте
          </p>
          <p className="text-white/60 text-xs">
            Терміновий викуп авто в м. Київ <Tag text={"[TEL]"} />
          </p>
          <p className="text-white/60 text-xs">
            Запчастини до <Tag text={"[MARKA]"} /> <Tag text={"[TEL]"} /> в м
            Львів. 
          </p>
          <p className="text-white/60 text-xs">
            Хімчистка вашого авто в м. Луцьк <Tag text={"[TEL]"} />
            <Tag text={"[TEL]"} />
          </p>
        </div>

        <p className="text-white/40 text-xs">
          *Зверніть увагу, що текст в SMS, в якому більше 70 символів
          оплачується як два повідомлення.
        </p>
      </div>
    </Modal>
  );
};
export default SMSModal;
