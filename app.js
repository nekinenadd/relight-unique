

// Dark mode toggle functionality
const toggleBtn = document.getElementById("dark-toggle");
const body = document.body;

// Load saved mode
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("darkMode", "disabled");
        toggleBtn.textContent = "🌙";
    }
});







//step 1: get DOM

emailjs.init({
  publicKey: "_jsPMZFMRByyxKPi1",
});

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // sprečava reload

  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  emailjs.send("service_5rhl01e", "template_j24llsr", templateParams)
    .then(() => {
      status.textContent = "Poruka uspešno poslata!";
      status.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      status.textContent = "Slanje nije uspelo. Probajte ponovo.";
      status.style.color = "red";
      console.error("FAILED...", error);
    });
});


let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');
let heroTitleDom = document.getElementById('hero-dynamic-title');
let heroTopicDom = document.getElementById('hero-dynamic-topic');
let heroVisualImages = SliderDom.querySelectorAll('.hero-slide .premium-visual img');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

function restartTimeBar() {
    timeDom.style.animation = 'none';
    void timeDom.offsetWidth;
    timeDom.style.animation = `runningTime ${timeRunning}ms linear 1 forwards`;
}

function syncHeroHeadline() {
    let activeSlide = SliderDom.querySelector('.item:nth-child(1)');
    if (!activeSlide || !heroTitleDom || !heroTopicDom) {
        return;
    }

    heroTitleDom.textContent = activeSlide.dataset.title || '';
    heroTopicDom.textContent = activeSlide.dataset.topic || '';
}

function preloadHeroImages() {
    heroVisualImages.forEach((img) => {
        const preloaded = new Image();
        preloaded.src = img.src;
    });
}

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext)

restartTimeBar();
syncHeroHeadline();
preloadHeroImages();

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    }    

    restartTimeBar();
    syncHeroHeadline();

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
}
