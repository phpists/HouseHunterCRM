import { Modal } from "../Modal/Modal";
import { Tag } from "../ObjectCard/MainInfo/Tags/Tag";
import Viber from "../../assets/images/viber.svg";
import Phone from "../../assets/images/small-phone.svg";
import Telegram from "../../assets/images/telegram.svg";

const ContactsModal = ({ contacts, onClose, user }) => {
  return (
    <Modal onClose={onClose} title="Contacts">
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
                  <img className="w-8 h-8" src={Telegram} alt="Telegram icon" />
                </span>
              </a>
              <a
                href={`tel:+${phone}`}
                className="cursor-pointer flex justify-center"
                aria-label="Call phone number"
              >
                <span className="flex items-center justify-center bg-green-600 rounded-lg w-12 h-12">
                  <img className="w-8 h-8" src={Phone} alt="Phone icon" />
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ContactsModal;
