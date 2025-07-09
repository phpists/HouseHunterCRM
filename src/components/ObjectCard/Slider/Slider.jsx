import { styled } from "styled-components";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import noPhoto from "../../../assets/images/no-photo.webp";
import { Slide } from "./Slide";
import { Photos } from "./Photos/Photos";
import { Arrows } from "./Arrows";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Tags } from "./Tags";
import prevIcon from "../../../assets/images/prev-arrow.svg";
import nextIcon from "../../../assets/images/next-arrow.svg";
import Star from "../../../assets/images/star.svg";
import Heart from "../../../assets/images/red-heart.svg";
import EmptyHeart from "../../../assets/images/empty-heart.svg";
import { Counter } from "../../../pages/Client/Object/Maininfo/Slider/Counter";
import { Status } from "./Status";
import { NewTag } from "../../../pages/Client/Object/Maininfo/Slider/NewTag";
import { Statistics } from "./Statistics";
import { Button } from "../ShowMore/Button";
import { Dropdown } from "../ShowMore/Dropdown";
import {
  useLazyAddToFavoritesQuery,
  useLazyPublishObjectQuery,
} from "../../../store/objects/objects.api";
import {
  handleCheckAccess,
  handleCopy,
  handleResponse,
  showAlert,
} from "../../../utilits";
import { useAppSelect } from "../../../hooks/redux";
import { AddToSelections } from "../../../pages/Objects/AddToSelections";
import { ObjectHistory } from "../../ObjectHistory/ObjectHistory";
import { ObjectPriceHistory } from "../../ObjectPriceHistory";
import { ObjectCommentHistory } from "../../ObjectCommentHistory/ObjectCommentHistory";
import { MarkObjectPhones } from "../../MarkObjectPhones/MarkObjectPhones";
import { useGetCompanyInfoQuery } from "../../../store/billing/billing.api";
import cogoToast from "cogo-toast";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: false,
  touchMove: true,
};

export const Slider = ({ photos, data, showLike, isCarPage }) => {
  const { user } = useAppSelect((state) => state.auth);
  const sliderRef = useRef(null);
  const slickRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [openView, setOpenView] = useState(false);
  const [sortPhotos, setSortPhotos] = useState(null);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(data?.id_hash);
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openHistoryPriceModal, setOpenHistoryPriceModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [markPhoneModal, setMarkPhoneModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [advertaseObject, setAdvertaseObject] = useState(null);
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const [publishObject] = useLazyPublishObjectQuery();
  const [addObjectsToFavorites] = useLazyAddToFavoritesQuery();
  const moreRef = useRef(null);
  const { accessData } = useAppSelect((state) => state.auth);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    setIsFavorite(favorites.includes(data?.id_hash));
  }, [data?.id_hash]);

  const handleChangeSlide = (val, open) => {
    setOpenView(!!open);
    setCurrentSlide(val);
  };

  useEffect(() => {
    slickRef.current && slickRef.current.slickGoTo(0);
  }, []);

  const handleCloseDropdown = () => moreRef.current.blur();

  const handleOpen = () => {
    setSortPhotos(
      photos
        .map(({ name }, key) => ({
          src: name,
          key: key + 1 === currentSlide ? 100 : 2,
        }))
        ?.sort((a, b) => b?.key - a?.key)
    );
    setOpenView(true);
  };

  const handleClose = () => {
    setOpenView(false);
    setSortPhotos(null);
  };

  const handleCheckIsNew = () => {
    const { dt_edit_in_source, price_change_date } = data;
    const editInSourceDate = Number(dt_edit_in_source) * 1000;
    const priceChangeDate = Number(price_change_date) * 1000;
    let today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0);
    today = today.getTime();

    return editInSourceDate > today || priceChangeDate > today;
  };

  function handleToggleFavoriteStatus() {
    if (user) {
      addObjectsToFavorites([data.id_hash]).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", "Статус успішно змінено!");
        });
      });
    }
    let favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    if (favorites.includes(data.id_hash)) {
      favorites = favorites.filter((id) => id !== data.id_hash);
      setIsFavorite(false);
    } else {
      favorites.push(data.id_hash);
      setIsFavorite(true);
    }
    localStorage.setItem("favorite", JSON.stringify(favorites));
  }

  const handleFocus = () => moreRef.current.focus();

  const handleOpenDelete = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setDeleteId(id);
  };

  const handleCopyFastFolderLink = (id) => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(`["${id}"]`)}`;

    handleCopy(LINK);
  };

  const handleTelegramPublish = (id) => {
    const { hide } = cogoToast.loading("Опублікування реклами в телеграмі", {
      position: "top-right",
    });
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
            showAlert(
              "info",
              messages[resp?.data?.status] ?? "Оголошення успішно опубліковано"
            );
          },
          () => {
            const message = resp?.data?.messege;
            showAlert("error", message);
          },
          true
        );
      }, 1000);
    });
  };

  return (
    <>
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
        />
      )}
      {openHistoryModal && (
        <ObjectHistory
          onClose={() => setOpenHistoryModal(null)}
          object={openHistoryModal}
        />
      )}
      {openHistoryPriceModal && (
        <ObjectPriceHistory
          onClose={() => setOpenHistoryPriceModal(null)}
          data={openHistoryPriceModal}
        />
      )}
      {openCommentHistoryModal && (
        <ObjectCommentHistory
          onClose={() => setOpenCommentHistoryModal(null)}
          object={openCommentHistoryModal}
        />
      )}
      {/* {markPhoneModal && (
              <MarkObjectPhones
                onClose={() => setMarkPhoneModal(null)}
                object={markPhoneModal}
                onSuccess={onChangeContancts}
              />
            )} */}
      {openView && sortPhotos && (
        <PhotoSlider
          images={sortPhotos}
          visible={openView}
          onClose={() => setOpenView(false)}
          // index={currentSlide - 1}
          // onIndexChange={(index) => handleChangeSlide(index, true)}
          speed={() => 0}
          easing={(type) =>
            type === 2
              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        />
      )}

      <StyledSlider
        className="flex items-center"
        ref={sliderRef}
        empty={(photos?.length < 2).toString()}
        isOpenDropDown={isOpenDropDown}
      >
        <div className="relative slider">
          {showLike && <Status data={data} />}
          <div
            className={`absolute top-[10px] ${
              isCarPage ? "left-[5px]" : "right-[5px]"
            } flex items-center gap-1`}
          >
            {handleCheckIsNew() ? <NewTag /> : null}
            {!isCarPage && photos?.length > 1 ? (
              <Counter current={currentSlide} total={photos.length} />
            ) : null}
          </div>
          {!isCarPage && <Statistics data={data} />}
          {isCarPage && (
            <div className="text-sm stats absolute left-0 bottom-[40px] z-10">
              {data.data_level !== "0" && (
                <div className="bg-violet-400 items-center flex gap-2 pl-2 pr-1 py-0.5">
                  <span>TOP</span>
                </div>
              )}
            </div>
          )}

          {isCarPage && data.index_overbuying != 0 && (
            <div className="text-sm stats absolute left-0 bottom-[10px] z-10">
              <div
                className={`${+data.index_overbuying >= 8 && "bg-red-400"} ${
                  +data.index_overbuying >= 6 && "bg-orange-400"
                } ${
                  +data.index_overbuying <= 5 && "bg-gray-400"
                }  items-center flex gap-2 pl-2 pr-1 py-0.5`}
              >
                <img src={Star} alt="" />
                <span>{data.index_overbuying}/10</span>
              </div>
            </div>
          )}

          {isCarPage && (
            <div className="threbtn-dropdown bg-white w-7 h-7 flex items-center justify-center rounded absolute right-[5px] top-[10px] z-30">
              <Button onChangeFocus={(val) => setIsOpenDropDown(val)} />
              <Dropdown
                // clientId={clientId}
                id={data.id}
                onToggleFavoriteStatus={handleToggleFavoriteStatus}
                isFavorite={isFavorite}
                // onFindSimilar={onFindSimilar ? handleFindSimilar : null}
                isEdit={
                  handleCheckAccess(accessData, "objects", "edit") &&
                  data?.acsses_change
                }
                // onHide={onHide}
                onAddToSelection={() => setOpenAddModal(data?.id)}
                onOpenTagsHistory={() =>
                  setOpenHistoryModal({
                    id: data?.id,
                    isStreetBase: data?.obj_street_base === "1",
                  })
                }
                onOpenPriceHistory={() =>
                  setOpenHistoryPriceModal(data?.price_history_json)
                }
                link={data?.link ?? data?.url_resource}
                // isHideObjects={isHideObjects}
                onOpenCommetHistory={() =>
                  setOpenCommentHistoryModal({ id: data?.id })
                }
                // onDelete={onDelete && isAccess ? handleDelete : null}
                isStreetBase={data?.obj_street_base === "1"}
                searchTag="?objects"
                onFocus={handleFocus}
                // onMarkPhone={
                //   data?.type_object === "street_base"
                //     ? () => setMarkPhoneModal(data)
                //     : null
                // }
                onClose={handleCloseDropdown}
                onFastSelection={
                  user?.show_fast_folder
                    ? () => handleCopyFastFolderLink(data?.id)
                    : null
                }
                onAdvertise={() => setAdvertaseObject(data)}
                onAdvertiseTelegram={
                  companyInfo?.data?.id_hash ===
                    "0022b718e5a80c0e3992686fd10ff1dc" &&
                  data?.type_object !== "street_base" &&
                  data?.type_object !== "mls"
                    ? () => handleTelegramPublish(data?.id)
                    : null
                }
                // ad={ad}
                // onDeleteHistory={onDeleteHistory}
                // onDeleteAd={onDeleteAd}
                idRubric={data?.id_rubric}
              />
            </div>
          )}

          {isCarPage && (
            <div
              onClick={() => handleToggleFavoriteStatus()}
              className="cursor-pointer bg-white w-7 h-7 flex items-center justify-center rounded absolute right-[5px] bottom-[10px] z-10"
            >
              {isFavorite ? (
                <img className="w-4 h-4" src={Heart} alt="" />
              ) : (
                <img className="w-4 h-4" src={EmptyHeart} alt="" />
              )}
            </div>
          )}

          <Tags data={data} />
          {photos?.length === 0 ? (
            <Slide photo={noPhoto} active empty onOpen={() => null} />
          ) : (
            <SlickSlider
              {...settings}
              beforeChange={(currentSlide, nextSlide) =>
                setCurrentSlide(1 + nextSlide)
              }
              //   currentSlide={currentSlide}
              prevArrow={
                <button>
                  <img src={prevIcon} alt="" />
                </button>
              }
              nextArrow={
                <button>
                  <img src={nextIcon} alt="" />
                </button>
              }
              ref={slickRef}
            >
              {photos
                ?.map(({ name }) => name)
                .map((photo, i) => (
                  <Slide
                    key={i}
                    photo={photo}
                    active={true}
                    empty={photos?.length === 1}
                    onOpen={handleOpen}
                  />
                ))}
            </SlickSlider>
          )}
        </div>
      </StyledSlider>
    </>
  );
};

const StyledSlider = styled.div`
  ${({ isOpenDropDown }) =>
    isOpenDropDown &&
    `
   .dropdown {
      opacity: 1;
      visibility: visible;
    }
`}

  .threbtn-dropdown path {
    fill: #3d3d3d;
  }

  .stats {
    background: rgb(59 133 1 / 68%);
  }

  position: relative;
  margin-right: 10px;
  height: 200px;
  /* height: 100%; */
  .slider {
    width: 200px;
    min-height: 200px;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div {
    height: 100%;
  }
  .slick-arrow {
    transition: all 0.3s;
    &::before {
      display: none;
    }
  }
  .slick-next,
  .slick-prev {
    width: 30px;
    height: 30px;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
  .slick-next {
    right: 8px;
    z-index: 4;
  }
  .slick-prev {
    left: 8px;
    z-index: 4;
  }
  .slider-arrows {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  &:hover {
    .slider-arrows {
      opacity: 1;
      visibility: visible;
    }
  }

  @media (max-width: 800px) {
    flex-direction: row;
    margin: 0;
    .slider {
      width: calc(100svw - 4px - 8px - 50px - 24px - 39px);
    }
  }

  @media (max-width: 500px) {
    .slider {
      width: 350px;
    }
  }
  @media (max-width: 450px) {
    .slider {
      width: 320px;
    }
  }
  @media (max-width: 400px) {
    .slider {
      width: 300px;
    }
  }
  @media (max-width: 380px) {
    .slider {
      width: 280px;
    }
  }
  @media (max-width: 360px) {
    .slider {
      width: 270px;
    }
  }
  @media (max-width: 340px) {
    .slider {
      width: 250px;
    }
  }
  @media (max-width: 1399.9px) {
    flex-direction: column;
    height: auto;
    overflow: hidden;
  }

  @media (min-width: 1400px) {
    .slider {
      width: 200px;
    }
  }
`;
