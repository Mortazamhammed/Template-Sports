

// check if there's local storage color option

let mainColors = localStorage.getItem("color-option");

if(mainColors !== null){
    document.documentElement.style.setProperty("--main-color",mainColors);
 
    // Remove class active from all color-list

    document.querySelectorAll(".colors-list li").forEach((element) => {
        element.classList.remove("active");

        // Add class active on element with data-color === local storage item
       if(element.dataset.color === mainColors){
        element.classList.add("active");
       }
    })

}


// Random Background Option
let backgroundOption = true;
// varibale to control the background interval
let backgroundInterval;


// Check if Random Background Locale Storage Is Not Empty

let backgroundLocaleItem =  localStorage.getItem("background-option");
if (backgroundLocaleItem !== null){
    
    if(backgroundLocaleItem === "true"){
        backgroundOption = true;
    } else{
        backgroundOption = false
    }

    // Remove class active from all span

    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    })

    if (backgroundLocaleItem === "true"){
        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
} 

// Toggle class in icon-gear and settings-box

let iconGear = document.querySelector(".toggle-settings .icon-gear");
let settingsBox = document.querySelector(".settings-box");

iconGear.onclick = function(){
    this.classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");
}

// Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) =>{
    li.addEventListener("click",(e) =>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        localStorage.setItem("color-option",e.target.dataset.color);

      handleActive(e);
    });

    
 
   
});

// Switch Random Backgrounds


const randomBackEl = document.querySelectorAll(".random-backgrounds span");

randomBackEl.forEach((span) =>{
    span.addEventListener("click",(e) =>{

       handleActive(e);

        if (e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();

            localStorage.setItem("background-option",true)

        } else{
            backgroundOption= false;
            clearInterval(backgroundInterval);

            localStorage.setItem("background-option",false)
        }
    });
});

// change background landing page

let landingPage = document.querySelector(".landing-page");

let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];


function randomizeImgs(){

    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("imgs/'+imgsArray[randomNumber] +'")';  
        },10000);
    }
  
}
randomizeImgs();




// Skiils and Gallery (Scroll)

let ourSkills = document.querySelector(".skills");
let skillSpan = document.querySelectorAll(".skill-progress span");


let ourGallery = document.querySelector(".gallery");
let imagesGallery = document.querySelector(".gallery .images-box");

let timeline = document.querySelector(".timeline");
let timeLeft = document.querySelectorAll(".timeline-content .left");
let timeRight = document.querySelectorAll(".timeline-content .right");


window.onscroll = function() {
    if(window.scrollY >= ourSkills.offsetTop - 200){
        skillSpan.forEach((element) => {
            element.style.width = element.dataset.progress;
        });
    };

    if(window.scrollY >= ourGallery.offsetTop - 200){
            imagesGallery.style.left = imagesGallery.dataset.left;
        };
    
    if(window.scrollY >= timeline.offsetTop - 200){
        timeLeft.forEach((element) => {
                element.style.left = element.dataset.position;
            });
        
        };
        if(window.scrollY >= timeline.offsetTop - 200){
            timeRight.forEach((element) => {
                    element.style.right = element.dataset.position;
                });
            
            };



};

// Our Gallery

let galleryImg  = document.querySelectorAll(".gallery .images-box img");

galleryImg.forEach(img => {
    img.addEventListener("click" ,(e) =>{

        // Create Overlay Popup
        
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

       // Create box Popup

        let pupupBox = document.createElement("div");
        pupupBox.className = "popup-box";


        // Create Heading Img

        if (img.alt !== null){

            let headingImg = document.createElement("h3");
            let textHeading = document.createTextNode(img.alt);

            headingImg.appendChild(textHeading);     
            pupupBox.appendChild(headingImg);    
        }
        
        // Create img Popup
       
        let popupImgage = document.createElement("img");
        popupImgage.className="popup-img"
        popupImgage.src = img.src;
        pupupBox.appendChild(popupImgage);


        document.body.appendChild(pupupBox);


        // Create Close Span

        let closeButton = document.createElement("span")
        closeButton.className="button-close"

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        pupupBox.appendChild(closeButton);

      
       document.addEventListener("click",(e) =>{
           
        if(e.target.className == "button-close"){
           e.target.parentElement.remove();

           overlay.remove();
        }
       });
       


    });
}) ;

// Scroll To Sections

const allBullest = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links li a");

function scrollToSection(element){

    element.forEach(ele => {

        ele.addEventListener("click",(e) => {

            e.preventDefault();
            
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSection(allBullest);
scrollToSection(allLinks);


// Handle Active Stats

function handleActive(ev){

    ev.target.parentElement.querySelectorAll(".active").forEach((element =>{
        element.classList.remove("active");
    }));

    ev.target.classList.add("active");
}


// Bullets

let bulletsSpans = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem !== null){
    
    bulletsSpans.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "block"){

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");
    } 
    else {

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpans.forEach(span => {

  span.addEventListener("click",(e)=>{

    if(span.dataset.display === "show"){

        bulletsContainer.style.display = "block";

        localStorage.setItem("bullets-option","block");
    } 
    else{

        bulletsContainer.style.display = "none";

        localStorage.setItem("bullets-option","none");
    }

    handleActive(e)
  })

});


// Reset Option 

let resetButton = document.querySelector(".settings-box .reset-options");

resetButton.onclick = function (){
    localStorage.clear();

    // localStorage.removeItem("bullets-option");
    // localStorage.removeItem("color-option");
    // localStorage.removeItem("background-option");

    window.location.reload();
}
    

// Toggle Menu

let buttonMenu = document.querySelector(".header-area .toggle-menu");

let myLinks = document.querySelector(".header-area .links");

buttonMenu.onclick = function (e) {
    

    e.stopPropagation();

    this.classList.toggle("menu-active");
    myLinks.classList.toggle("open");
    
}

// Click Anywhere Outside Menu And Toggle Menu

document.addEventListener("click",(e)=>{
    
    if(e.target !== buttonMenu && e.target !== myLinks){

        if(myLinks.classList.contains("open")){

            buttonMenu.classList.toggle("menu-active");
            myLinks.classList.toggle("open");
        }
     
    }
})

myLinks.onclick = function (e) {
    e.stopPropagation();
};

// Slide Testimonials

let slide = document.getElementById("slide");
let upArrow = document.getElementById("upArrow");
let downArrow = document.getElementById("downArrow");

let x = 0;

upArrow.onclick = function() {
    if(x > "-1500"){
        x = x - 300;
        slide.style.top = x + "px";
    }
}
downArrow.onclick = function() {
    if(x < 0){
        x = x + 300;
        slide.style.top = x + "px";
    }
}



// Video

let listVideo = document.querySelectorAll(".list-video .vid");

let mainVideo = document.querySelector(".main-video video");

let title = document.querySelector(".main-video .title");


listVideo.forEach(video => {
  video.onclick = () => {
    listVideo.forEach(vid => vid.classList.remove("active"));
    video.classList.add("active");
    if(video.classList.contains("active")){
        let src = video.children[0].getAttribute("src");
        mainVideo.src = src;
        let text = video.children[1].innerHTML;
        title.innerHTML = text;
    }
  }
});




