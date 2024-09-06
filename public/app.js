import { Gallery } from './image-list.js';

const registerServiceWorker = async () => {
  // 判断浏览器支不支持serviceWorker特性
  if ('serviceWorker' in navigator) {
    try {
      // 先强制取消注册
      const registrations = await navigator.serviceWorker.getRegistrations()
      for (let r of registrations){
        if (r.scope.includes("read")){
          const ok = await r.unregister()
          console.log(`Service worker ${r.scope} unregisted -- ${ok}`);
        }
      }
      // 注册serviceworker
      // 这个接口会向服务端请求`sw.js`
      const registration = await navigator.serviceWorker.register(
        'sw.js',
        {
          scope: '/',
        }
      )
      if (registration.installing) {
        // registration.installing不为null则说明Service worker正在安装
        console.log('Service worker installing');
      } else if (registration.waiting) {
        // registration.waiting不为null则说明Service worker已经安装好
        console.log('Service worker installed');
      } else if (registration.active) {
        // registration.active不为null则说明Service worker已经激活
        console.log('Service worker active');
      }
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(`Get message from worker ${event.data}`);
      });
      navigator.serviceWorker.startMessages()
      await navigator.serviceWorker.ready
      registration.active.postMessage(
        "Test message sent immediately after creation from main to worker",
      )
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    const myName = document.createElement('span');
    myName.textContent = `${galleryImage.name}: `;
    const myCredit = document.createElement('span');
    myCredit.innerHTML = `Taken by ${galleryImage.credit}`;
    myCaption.append(myName, myCredit);
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();
Gallery.images.map(createGalleryFigure);
