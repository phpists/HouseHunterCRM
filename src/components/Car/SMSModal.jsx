import { SMSTags } from "../../constants";
import { Modal } from "../Modal/Modal";

const SMSModal = ({ closeModal }) => {
  return (
    <Modal onClose={closeModal} title="SMS settings">
      <div className="flex flex-col justify-center gap-4">
        <div className="flex gap-3">
          <button className="rounded py-1 w-full bg-white text-[var(--modal-bg)]">
            Застосувати
          </button>
          <button className="rounded py-1 w-full bg-white/50 text-[var(--modal-bg)]">
            Скасувати
          </button>
        </div>
        <div className="relative bg-green-500 p-2 rounded-md text-xs flex items-center gap-2">
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
          Куплю ваше авто сьогодні, ЦІну узгодимо 0990123456
        </div>

        <h1 className="font-bold text-lg">Як праюють [ТЕГИ]?</h1>

        <div className="grid grid-cols-[30%_70%] gap-y-3">
          {SMSTags.map(({ tag, description }) => (
            <>
              <Tag text={tag} />
              <p className="text-white/60 text-xs">{description}</p>
            </>
          ))}
        </div>

        <hr className="border-white/30" />

        <h1 className="font-bold text-lg">Приклади шаблонів SMS:</h1>

        <div className="grid gap-2">
          <p className="text-white/60 text-xs">
            Куплю ваш авто по ціні <Tag text={"TORG_20"} /> Телефонуйте
          </p>
          <p className="text-white/60 text-xs">
            Терміновий викуп авто в м. Київ <Tag text={"[TEL]"} />
          </p>
          <p className="text-white/60 text-xs">
            Запчастини до <Tag text={"MARKA"} /> <Tag text={"[TEL]"} /> в м
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

const Tag = ({ text }) => {
  return (
    <span className="text-sm bg-zinc-700 w-fit h-fit rounded-md px-1 font-bold text-white/80">
      {text}
    </span>
  );
};

export default SMSModal;
