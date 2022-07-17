// **Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// Реалізація делегування на div.gallery і отримання url великого зображення.
// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.
// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотекаи basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');
createGallery();

galleryRef.addEventListener('click', onGalleryClk);

function onGalleryClk(i) {
    i.preventDefault();
    
    if (!i.target.dataset.source) return;

    const instanceOptions = {
        onShow: instance => {
            document.addEventListener('keyup', fnShow);
        },
        onClose: instance => { 
            document.removeEventListener('keyup', fnShow);
        },
    };

    const instance = basicLightbox.create(`
            <img src="${i.target.dataset.source}" width="800" height="600">
        `, instanceOptions);
    
    const fnShow = onKeyPress(instance);
    instance.show();

};

function onKeyPress(instance) {
    return (i) => {
        if (i.code === 'Escape') {
            instance.close();
        };
    }
}

function createGallery() {
    const galleryMarkup = galleryItems.map(createGaleryItemMarkup).join("");

    galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
}



function createGaleryItemMarkup({ preview, original, description }) {
    return `<div class="gallery__item"><a class="gallery__link" 
    href="${original}">
    <img class="gallery__image" 
    src="${preview}" 
    data-source="${original}" 
    alt="${description}"/>
    </a>
    </div>`;
}

// function createGallery(array) {
//     return array.ruduce((acc, link) => acc +`<div class="gallery__item"><a class="gallery__link" 
//     //     href="${original}">
//     //     <img class="gallery__image" 
//     //     src="${preview}" 
//     //     data-source="${original}" 
//     //     alt="${description}"/>
//     //     </a>
//     //     </div>`, "");
// }