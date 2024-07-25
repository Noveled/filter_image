const btnChars = ["all", "bag", "shoe", "watch", "camera", "headphone"];

// filter-btns
const btnsWrapper = document.querySelector('.filter-btns');

btnChars.map((btnChar, i) => {
    btnInnerText = String(btnChar)[0].toUpperCase() + String(btnChar).substr(1);

    const btnElement = `
    <button class="filter-btn" data-filter="${btnChar}">${btnInnerText}</button>
    `;

    btnsWrapper.insertAdjacentHTML('beforeend', btnElement);
});

// First button add active class
const btns = document.querySelectorAll('.filter-btn');
btns[0].classList.add('active');

// Creater images elemnet
const imgs = ["bag-1.jpg", "camera-1.jpg", "camera-2.jpg", "headphone-1.jpg", "headphone-2.jpg", "shoe-1.jpg", "shoe-2.jpg", "watch-1.jpg"]

// filter-images
const imagesWrapper = document.querySelector('.filter-images');

imgs.map((img) => {
    const results = img.split('-')[0];
    // const pattern = '/(?<=\/)[^\/-]+(?=-)/';
    // const results = img.match(pattern);


    const imgElement = `
    <div class="filter-image" data-filter="${results}">
        <span><img src="./images/${img}" alt="${img}"></span>
    </div>
    `;

    imagesWrapper.insertAdjacentHTML('beforeend', imgElement);
});

const imageElements = document.querySelectorAll('.filter-image');
// console.log(imageElements);


// Filter images
function activateFilter() {
    btns.forEach((btn) => {
        btn.classList.remove('active');
    });
    this.classList.add('active');

    const selectedBtn = this.getAttribute('data-filter');
    
    // map, filter, reduce 함수는 DOM 요소에 사용할 수 없다.
    Array.from(imageElements).filter((imageElement) => {
        imageElement.classList.add('hide');
        imageElement.classList.remove('show');

        setTimeout(() => {
            if (imageElement.getAttribute('data-filter') == selectedBtn || selectedBtn === 'all') {
                imageElement.classList.remove('hide');
                imageElement.classList.add('show');
            } else {
                imageElement.classList.remove('show');
                imageElement.classList.add('hide');
            }
        }, 100); // 시간 지연 함수(promise)
    });
}

btns.forEach((btn) => {
    btn.addEventListener('click', activateFilter);
});

// activate light box when click each image
const showLightBox = (e) => {
    const ligthBoxElement = document.querySelector('.light-box');
    const ligthBoxElementOverlay = document.querySelector('.overlay');

    const target = e.currentTarget;
    const selectedImage = target.children[0].children[0].getAttribute('src');
    const categoryName = target.getAttribute('data-filter');
    
    const lightBoxImage = document.querySelector('.light-box-image img');
    const catagoryElement = document.querySelector('.light-box-text .title p');

    // getAttribute(): 파라미터 속성 값 가져오기
    // setAttribute(a, b): a: 속성 이름, b: 변경할 속성 값\
    // a.textContent = b: a 요소에 b 텍스트 입력
    lightBoxImage.setAttribute('src', selectedImage);
    catagoryElement.textContent = categoryName;

    // activate light box & overlay
    ligthBoxElement.style.display = 'block';
    ligthBoxElementOverlay.style.display = 'block';
}

imageElements.forEach((imageElement) => {
    imageElement.addEventListener('click', showLightBox);
});

const hideLightBox = (e) => {
    const ligthBoxElement = document.querySelector('.light-box');
    const ligthBoxElementOverlay = document.querySelector('.overlay');
    console.log(ligthBoxElementOverlay);

    // deactivate light box & overlay
    ligthBoxElement.style.display = 'none';
    ligthBoxElementOverlay.style.display = 'none';
}

const closeButton = document.querySelector('.light-box .light-box-text button')
const overlayLayer = document.querySelector('.filter-wrapper .overlay')

closeButton.addEventListener('click', hideLightBox);
overlayLayer.addEventListener('click', hideLightBox);