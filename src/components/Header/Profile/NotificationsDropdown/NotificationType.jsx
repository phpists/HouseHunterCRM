import Star from "../../../../assets/images/star.svg";
import { ReactComponent as ChatIcon } from "../../../../assets/images/chat-grey.svg";
import { ReactComponent as Heart } from "../../../../assets/images/red-heart.svg";

const NotificationType = ({ id }) => {
  if (id === 1) {
    return (
      <div className="flex items-center gap-1">
        <span className="new rounded-sm px-1 text-[10px]">NEW</span>
        Нові автомобілі
      </div>
    );
  } else if (id === 2) {
    return (
      <div className="flex items-center gap-1">
        <div className="text-[10px] stats z-10">
          <div
            className={`rounded-sm bg-red-500 items-center flex gap-1 p-0.5`}
          >
            <img width={12} src={Star} alt="" />
            <span className="leading-none">10/10</span>
          </div>
        </div>
        Новий індекс
      </div>
    );
  } else if (id === 3) {
    return (
      <div className="flex items-center gap-1">
        Змінилась ціна на <span className="text-[#f94343]">-500$</span>
      </div>
    );
  } else if (id === 4) {
    return (
      <div className="flex items-center gap-1">
        У <Heart width={10} height={10} /> ціна змінилась на{" "}
        <span className="text-[#f94343]">-500$</span>
      </div>
    );
  } else if (id === 5) {
    return (
      <div className="flex items-center gap-1">
        <div className="relative">
          <div className="absolute top-[-5px] right-[-7px] before:inline-block before:w-1 before:h-1 before:mr-2 before:bg-red-500 before:rounded-full" />
          <ChatIcon width={15} height={15} />
        </div>
        Новий коментар
      </div>
    );
  } else if (id === 6) {
    return (
      <div className="flex items-center gap-1">
        <span className="animate-pulse text-[#f94343]">!!!</span>ціна часто
        змінюється <span className="text-[#f94343]">-500$</span>
      </div>
    );
  }
};

export default NotificationType;
