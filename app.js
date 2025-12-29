

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

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}
