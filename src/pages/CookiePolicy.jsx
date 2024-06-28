import styled from "styled-components";

export const CookiePolicy = () => (
  <StyledPage>
    <div className="title">ВИКОРИСТАННЯ COOKIE</div>
    <p>
      Користуючись нашим сайтом, ви погоджуєтесь на опрацювання файлів cookie та
      даних користувача (інформація про місцезнаходження; тип і версія ОС; тип і
      версія браузера; тип пристрою і роздільна здатність його екрану; звідки
      прийшов на сайт користувач; з якого сайту або через яку рекламу; мова ОС і
      браузера; які сторінки відкриває та на які кнопки натискає користувач;
      ip-адреса) з метою функціонування сайту, проведення ретаргетінгу, а також
      проведення статистичних досліджень та оглядів. У тому числі з
      використанням сервісу Google Analytics. Якщо ви не бажаєте, щоб ваші дані
      оброблялися, змініть налаштування браузера або залиште сайт.
    </p>
  </StyledPage>
);

const StyledPage = styled.div`
  height: 100vh;
  overflow: auto;
  max-width: 2000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  a {
    color: var(--main-color);
  }
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 32px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%;
    letter-spacing: 0.64px;
    text-align: center;
  }
  .subtitle {
    margin: 20px 0;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.4px;
  }
  p,
  li {
    margin-top: 7px;
    color: var(--white-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.28px;
    padding: 0 26px 0 0;
  }
  ul {
    padding-left: 40px;
    list-style: disc;
  }
`;
