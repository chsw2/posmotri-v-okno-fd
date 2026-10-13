/* КОНФИГ */
const preloaderWaitindTime = 1200;
const cardsOnPage = 5;
const BASE_URL = 'https://786f186c-eea2-4863-a6e9-cd15c13cb811.mdnplay.dev';
const endpoint = `${BASE_URL}/api/videos?pagination[pageSize]=${cardsOnPage}&`;

/* ЭЛЕМЕНТЫ СТРАНИЦЫ */
const cardsList = document.querySelector('.content__list');
const cardsContainer = document.querySelector('.content__list-container');
const videoContainer = document.querySelector('.result__video-container');
const videoElement = document.querySelector('.result__video');
const form = document.querySelector('form');

/* ТЕМПЛЕЙТЫ */
const cardTmp = document.querySelector('.cards-list-item-template');
const preloaderTmp = document.querySelector('.preloader-template');
const videoNotFoundTmp = document.querySelector('.error-template');
const moreButtonTmp = document.querySelector('.more-button-template');

/* МЕХАНИКА */

// Нужен для работы с переключателями
let cardsOnPageState = [];

// Первая загрузка ✅

showPreloader(preloaderTmp, videoContainer);
showPreloader(preloaderTmp, cardsContainer);
mainMechanics(endpoint);

// осуществляется поиск ✅
form.onsubmit = (e) => {
  e.preventDefault();

  cardsList.textContent = '';
  const buttonInDOM = cardsContainer.querySelector('.more-button');
  if (buttonInDOM) {
    buttonInDOM.remove();
  }

  [...videoContainer.children].forEach((el) => {
    el.className === 'error' && el.remove();
  });

  showPreloader(preloaderTmp, videoContainer);
  showPreloader(preloaderTmp, cardsContainer);

  const formData = serializeFormData(form);
  const requestUrl = generateFilterRequest(
    endpoint,
    formData.city,
    formData.timeArray
  );

  mainMechanics(requestUrl);
};

/* ФУНКЦИЯ, КОТОРАЯ ВСЕ ГЕНЕРИТ */

async function mainMechanics(endpoint) {
  try {
    const data = {
    "results": [
        {
            "id": 32,
            "description": "ночной Белгород",
            "time_of_day": "night",
            "createdAt": "2023-05-12T16:08:08.795Z",
            "updatedAt": "2023-05-12T16:33:50.064Z",
            "city": "Белгород",
            "video": {
                "id": 145,
                "url": "/shared-assets/videos/flower.mp4"
            },
            "poster": {
                "id": 125,
                "url": "/uploads/Belgorod_Noch_mp4_poster_b593de63bb.png",
                "previewUrl": "/uploads/thumbnail_Belgorod_Noch_mp4_poster_b593de63bb.png"
            },
            "thumbnail": {
                "id": 132,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Belgorod_Noch_mp4_thumb_8e63aba026.png"
            }
        },
        {
            "id": 33,
            "description": "Адлер утром",
            "time_of_day": "morning",
            "createdAt": "2023-05-12T16:10:48.000Z",
            "updatedAt": "2023-05-12T16:35:20.705Z",
            "city": "Адлер",
            "video": {
                "id": 143,
                "url": "/shared-assets/videos/flower.mp4"
            },
            "poster": {
                "id": 124,
                "url": "/uploads/Adler_Utro_mp4_poster_e4d1e4fe6d.png",
                "previewUrl": "/uploads/thumbnail_Adler_Utro_mp4_poster_e4d1e4fe6d.png"
            },
            "thumbnail": {
                "id": 139,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Adler_Utro_mp4_thumb_aa34fe8f1a.png"
            }
        },
        {
            "id": 34,
            "description": "Воронеж днем",
            "time_of_day": "afternoon",
            "createdAt": "2023-05-12T16:18:31.978Z",
            "updatedAt": "2023-05-12T16:36:22.215Z",
            "city": "Воронеж",
            "video": {
                "id": 141,
                "url": "/shared-assets/videos/flower.mp4"
            },
            "poster": {
                "id": 116,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Voronezh_Den_mp4_poster_bea3eae723.png"
            },
            "thumbnail": {
                "id": 128,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Voronezh_Den_mp4_thumb_f15c5913ca.png"
            }
        },
        {
            "id": 35,
            "description": "Утро в Дубае",
            "time_of_day": "morning",
            "createdAt": "2023-05-12T16:23:18.668Z",
            "updatedAt": "2023-05-12T16:37:24.379Z",
            "city": "Дубай",
            "video": {
                "id": 150,
                "url": "/shared-assets/videos/flower.mp4"
            },
            "poster": {
                "id": 119,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Dubaj_Utro_mp4_poster_cdb5da5635.png"
            },
            "thumbnail": {
                "id": 135,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Dubaj_Utro_mp4_thumb_531e868753.png"
            }
        },
        {
            "id": 36,
            "description": "Дневной Зеленоградск",
            "time_of_day": "afternoon",
            "createdAt": "2023-05-12T16:25:46.303Z",
            "updatedAt": "2023-05-12T16:38:08.675Z",
            "city": "Зеленоградск",
            "video": {
                "id": 140,
                "url": "/shared-assets/videos/flower.mp4"
            },
            "poster": {
                "id": 121,
                "url": "/uploads/Zelenogradsk_Den_mp4_poster_d2929523b7.png",
                "previewUrl": "/uploads/thumbnail_Zelenogradsk_Den_mp4_poster_d2929523b7.png"
            },
            "thumbnail": {
                "id": 138,
                "url": "https://avatars.mds.yandex.net/i?id=050817af1cf91a5eebadc384d02ea2cd_sr-7086355-images-thumbs&n=13",
                "previewUrl": "/uploads/thumbnail_Zelenogradsk_Den_mp4_thumb_308d520d6c.png"
            }
        }
    ],
    "pagination": {
        "page": 1,
        "pageSize": 5,
        "pageCount": 3,
        "total": 11
    }
};
    cardsOnPageState = data.results;

    if (!data?.results?.[0]) {
      throw new Error('not-found');
    }

    appendCards({
      baseUrl: BASE_URL,
      dataArray: data.results,
      cardTmp,
      container: cardsList,
    });

    setVideo({
      baseUrl: BASE_URL,
      video: videoElement,
      videoUrl: data.results[0].video.url,
      posterUrl: data.results[0].poster.url,
    });
    document
      .querySelectorAll('.content__card-link')[0]
      .classList.add('content__card-link_current');
    await waitForReadyVideo(videoElement);
    await delay(preloaderWaitindTime);
    removePreloader(videoContainer, '.preloader');
    removePreloader(cardsContainer, '.preloader');

    // Добавляем класс для стилизации скроллбара
    cardsContainer.classList.add('custom-scrollbar');

    chooseCurrentVideo({
      baseUrl: BASE_URL,
      videoData: cardsOnPageState,
      cardLinksSelector: '.content__card-link',
      currentLinkClassName: 'content__card-link_current',
      mainVideo: videoElement,
    });

    showMoreCards({
      dataArray: data,
      buttonTemplate: moreButtonTmp,
      cardsList,
      buttonSelector: '.more-button',
      initialEndpoint: endpoint,
      baseUrl: BASE_URL,
      cardTmp: cardTmp,
    });
  } catch (err) {
    if (err.message === 'not-found') {
      showError(videoContainer, videoNotFoundTmp, 'Нет подходящих видео =(');
    } else {
      showError(videoContainer, videoNotFoundTmp, 'Ошибка получения данных :(');
    }
    console.log(err);
    removePreloader(videoContainer, '.preloader');
    removePreloader(cardsContainer, '.preloader');
  }
}

/* УТИЛИТЫ */

// Простой промис, чтобы легче ставить паузу ✅

async function delay(ms) {
  return await new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}

// Промис, который резолвится, если видео целиком готово к проинрыванию без пауз

async function waitForReadyVideo(video) {
  return await new Promise((resolve) => {
    video.oncanplaythrough = resolve;
  });
}

// Устанавливает прелоадер на время загрузки данных ✅
function showPreloader(tmp, parent) {
  const node = tmp.content.cloneNode(true);
  if (parent === cardsContainer) {
  document.querySelector(".content__list").style.display = 'none';
  }
  parent.append(node);
  console.log('показал прелоадер');
}

// Убирает прелоадер из DOM ✅
function removePreloader(parent, preloaderSelector) {
  const preloader = parent.querySelector(preloaderSelector);
  if (preloader) {
    preloader.remove();
	document.querySelector(".content__list").removeAttribute("style");
  }

  console.log('убрал прелоадер');
}

// Добавляет карточки в контейнер, собирая их из данных API ✅
function appendCards({ baseUrl, dataArray, cardTmp, container }) {
  dataArray.forEach((el) => {
    const node = cardTmp.content.cloneNode(true);
    node.querySelector('a').setAttribute('id', el.id);
    node.querySelector('.content__video-card-title').textContent = el.city;
    node.querySelector('.content__video-card-description').textContent =
      el.description;
    node
      .querySelector('.content__video-card-thumbnail')
      .setAttribute('src', `${el.thumbnail.url}`);
    node
      .querySelector('.content__video-card-thumbnail')
      .setAttribute('alt', el.description);
    container.append(node);
  });
  console.log('Сгенерировал карточки');
}

// Устанавливет внужное видео в контейнер ✅
function setVideo({ baseUrl, video, videoUrl, posterUrl }) {
  video.setAttribute('src', `${baseUrl}${videoUrl}`);
  //video.setAttribute('poster', `${baseUrl}${posterUrl}`);
  console.log('Подставил видео в основной блок');
}

// получает данные из формы и сериализует как надо ✅

function serializeFormData(form) {
  const city = form.querySelector('input[name="city"]');
  const checkboxes = form.querySelectorAll('input[name="time"]');
  const checkedValuesArray = [...checkboxes].reduce((acc, item) => {
    item.checked && acc.push(item.value);
    return acc;
  }, []);
  console.log('Собрал данные формы в объект');
  return {
    city: city.value,
    timeArray: checkedValuesArray,
  };
}

// Генерирует строку с фильтрами запросов в API в зависимости от данных из формы ✅
function generateFilterRequest(endpoint, city, timeArray) {
  if (city) {
    endpoint += `filters[city][$containsi]=${city}&`;
  }
  if (timeArray) {
    timeArray.forEach((timeslot) => {
      endpoint += `filters[time_of_day][$eqi]=${timeslot}&`;
    });
  }
  console.log('Сгенерировал строку адреса запроса в API из данных формы');
  return endpoint;
}

// переключает текущее видео ✅
function chooseCurrentVideo({
  baseUrl,
  videoData,
  cardLinksSelector,
  currentLinkClassName,
  mainVideo,
}) {
  const cardsList = document.querySelectorAll(cardLinksSelector);
  if (cardsList) {
    cardsList.forEach((item) => {
      item.onclick = async (e) => {
        e.preventDefault();
        cardsList.forEach((item) => {
          item.classList.remove(currentLinkClassName);
        });
        item.classList.add(currentLinkClassName);
        showPreloader(preloaderTmp, videoContainer);
        const vidoObj = videoData.find(
          (video) => String(video.id) === String(item.id)
        );
        setVideo({
          baseUrl,
          video: mainVideo,
          videoUrl: vidoObj.video.url,
          posterUrl: vidoObj.poster.url,
        });
        await waitForReadyVideo(mainVideo);
        await delay(preloaderWaitindTime);
        removePreloader(videoContainer, '.preloader');
        console.log('Переключил видео');
      };
    });
  }
}

// вывожу интерфейс, когда видео не найдено ✅
function showError(container, errorTemplate, errorMessage) {
  const node = errorTemplate.content.cloneNode(true);
  node.querySelector('.error__title').textContent = errorMessage;
  container.append(node);
  console.log('показал, ошибку');
}

// вывожу больше видео, если в пагинации больше страниц, чем показано

function showMoreCards({
  dataArray,
  buttonTemplate,
  cardsList,
  buttonSelector,
  initialEndpoint,
  baseUrl,
  cardTmp,
}) {
  if (dataArray.pagination.page === dataArray.pagination.pageCount) return;
  // добавить кнопку из темплейта в конец списка карточек
  const button = buttonTemplate.content.cloneNode(true);
  cardsContainer.append(button);
  // Выберем добавленный элемент по селектору и добавим слушатель клика
  const buttonInDOM = cardsContainer.querySelector(buttonSelector);
  buttonInDOM.addEventListener('click', async () => {
    // по клику запросим данные для следующей страницы
    let currentPage = dataArray.pagination.page;
    let urlToFetch = `${initialEndpoint}pagination[page]=${(currentPage += 1)}&`;
    try {
      let data = await (await fetch(urlToFetch)).json();
      buttonInDOM.remove();
      cardsOnPageState = cardsOnPageState.concat(data.results);
      appendCards({
        baseUrl,
        dataArray: data.results,
        cardTmp,
        container: cardsList,
      });
      chooseCurrentVideo({
        baseUrl: BASE_URL,
        videoData: cardsOnPageState,
        cardLinksSelector: '.content__card-link',
        currentLinkClassName: 'content__card-link_current',
        mainVideo: videoElement,
      });
      showMoreCards({
        dataArray: data,
        buttonTemplate,
        cardsList,
        buttonSelector,
        initialEndpoint,
        baseUrl,
        cardTmp,
      });
    } catch (err) {
      return err;
    }
  });
}
