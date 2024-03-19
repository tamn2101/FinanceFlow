//  HIEN THI MENU MOBILE

// b1: html , css 
// b2: bat su kien bam nut
function menuMobile() {
    const btnnav = document.querySelector(".header__right-btn");
    // console.log(1);
    const nav = document.querySelector(".mobilenav");
    // console.log(2);

    // b3: toggle class (nav va btn)
    btnnav.addEventListener("click", function () {
        this.classList.toggle("active");
        nav.classList.toggle("active");
    })

    // b4 hide nav (an)
    function hideNav() {
        btnnav.classList.remove("active");
        nav.classList.remove("active");
    }

    // b5: resize window (tro lai kich thuoc)
    window.addEventListener("resize", function () {
        let wWindow = window.innerWidth;
        if (wWindow > 1200) {
            hideNav()
        }
    })
}

//TESTIMONIAL
function handleTestimonial() {
    // khoi tao slider
    var carousel = document.querySelector('.testimonial__list');
     flktyCarousel = new Flickity (carousel, {
        // options
        cellAlign: 'center',
        contain: true,
        draggable: '>1',
        prevNextButtons: false, //an 2 nut pre va next
        wrapAround: true,
        pageDots: true,
        pauseAutoPlayOnHover: true,
        fullscreen: true,
        groupCells:2,
        draggable: '>2',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              wrapAround: true,
              cellAlign: "center",
              freeScroll: false,
              groupCells: 1,
              prevNextButtons: false,
              pageDots: true,
              draggable: '>1'
            }
          }
        ]
    });
    flktyCarousel.on("change", function(index){
        var sliderWidth = 100 / flktyCarousel.cells.length;
        var progressWidth = sliderWidth * ( index + 1);
        progressBar.style.width = progressWidth + "%";
    })
    
}


// ACCORDION
var acc = document.querySelectorAll(".item");

acc.forEach(function(item){
  item.addEventListener("click", function() {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
})

// PRORESSBAR
function progressBar() {
  let progress = document.querySelector(".progressBar");
  window.addEventListener("scroll", function () {
    let scrollY = window.scrollY; // scroll được đoạn đường bao nhiêu
    //đoạn đường đi được / (đoạn đường tổng [chiều cao body] - chiều cao window [do không scroll được tới đáy]) * 100
    let percent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    // console.log(percent);
    progress.style.width = percent + "%";
  });
}

// LOADING
function initLoading(){
    let loadedCount = 0,
    imgs = document.querySelectorAll("img").length,
    container = document.querySelector("body")
    
    let imgLoaded = imagesLoaded(container);

    imgLoaded.on("progress", (instance) => {
        // console.log(instance);
        loadedCount++;
        // console.log(loadedCount);
        
        percent = ((loadedCount / imgs) * 100).toFixed();
        console.log(percent)
        handleLoading(percent);
    })
    .on("always",(instance) => {
        console.log("always");
    })
    .on("fail",(instance) => {
        console.log("fail");
    })
    .on("done",(instance) => {
        console.log("done");
        hideLoading();
    })
}

function handleLoading(percent){
  const progress = document.querySelector(".loading__inner-progress");
  textPerCenter = document.querySelector(".loading__percent");
  progress.style.width = `${percent}%`
  textPerCenter.innerHTML = `${percent}%`
}

function hideLoading(){
  const loading = document.querySelector('.loading'),
  body = document.querySelector('body');
  loading.classList.add("--is-loaded")
  body.classList.remove('--disable-scroll')
  // nho HTML disable-scroll de an thanh scroll
}

// NEWS TABS
function handleTabLatestPosts() {
  // bat su kien
  let tabs = document.querySelectorAll(".latestposts__tabs-item");
  listLatestPosts = document.querySelectorAll(".warplist");

  tabs.forEach(function (tab) {
      // xu ly su kien click
      tab.addEventListener("click", function () {
          console.log(1)
          // remove all class active to tabs
          tabs.forEach(function (tab) {
              tab.classList.remove("--active");
          })

          // add class active to tab
          this.classList.add("--active");

          // hide all news list
          listLatestPosts.forEach(function (newsList) {
              newsList.classList.remove("--active");
          })

          // get data-tab
          // cach 1:
          // let id = this.getAttribute("data-tab");

          // cach 2
          let id = this.dataset.tab;

          // add class active to newslist
          document.querySelector(".latestposts__list-" + id).classList.add("--active");
      })
  })
}


function handleModalVideo(){
  let videos = document.querySelectorAll(".getstared__video"),
  modalVideo = document.querySelector(".popupvideo"),
  iframeModalVideo = document.querySelector(".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"),
  btnClose = document.querySelector (".popupvideo .iconclose");

    videos.forEach(function (video) {
      video.addEventListener("click", function(){
        console.log(1)
     
      // show modal
      modalVideo.classList.add("active")

      // get data id
      let dataID = video.getAttribute("data-video-src")
      console.log(2)

      // // set ID iframe
      iframeModalVideo.setAttribute("src",
      "https://www.youtube.com/embed/" + dataID + "?autoplay=1")
    })
    })
    function closeVideo() {
      //Hide modal
      modalVideo.classList.remove("active");
      //Emty src iframe
      iframeModalVideo.setAttribute("src", "");
    }
    btnClose.addEventListener("click", function () {
      closeVideo();
    });
    modalVideo.addEventListener("click", function () {
      closeVideo();
    });

}

//Thực hiện tập lệnh khi tài nguyên tải xong
window.addEventListener("load", function () {
  progressBar();
  menuMobile();
  initLoading();
  handleTabLatestPosts("latestposts__tabs-item");
  handleModalVideo();
  handleTestimonial();
});