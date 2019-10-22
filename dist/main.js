/**
 *  UTILS  AND TEMPLATES
 */
// Images for Simple slider
const images = Array(7)
    .fill(1)
    .map((i, index) => `${index + 1}.jpeg`); // [1.jpeg, 2.jpeg ...]
// Simple Slider Template
const simpleSliderTemplate = (source) => `
   <img src="${source}" alt="" />
`;
const createDOMElFromString = (domstring) => {
    const html = new DOMParser().parseFromString(domstring, "text/html");
    return html.body.firstChild;
};
// Slider Classes
class BaseSlider {
    constructor(selector, showButtons = true) {
        this.showButtons = showButtons;
        this.imagePath = "./assets/";
        this.currentIndex = 0;
        this.slides = [];
        this.el = document.querySelector(selector);
    }
    next() {
        if (++this.currentIndex > this.slides.length - 1)
            this.currentIndex = 0;
        this.showSlide(this.currentIndex);
    }
    previous() {
        if (--this.currentIndex < 0)
            this.currentIndex = this.slides.length - 1;
        this.showSlide(this.currentIndex);
    }
    showSlide(index) {
        this.slides.forEach((item, i) => {
            if (index === i) {
                item.classList.remove("is-hidden");
                return;
            }
            item.classList.add("is-hidden");
        });
    }
    addButtons() {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("navigation");
        buttonsContainer.classList.add("has-text-centered");
        buttonsContainer.innerHTML = `
       <button class="prev button is-info">Previous</button>
       <button class="next button is-info">Next</button>
     `;
        const prevButton = buttonsContainer.querySelector(".prev");
        const nextButton = buttonsContainer.querySelector(".next");
        prevButton.addEventListener("click", () => this.previous());
        nextButton.addEventListener("click", () => this.next());
        this.el.appendChild(buttonsContainer);
    }
    render() {
        this.slides.forEach((item, index) => {
            item.classList.add('fadeIn'); // adds fadeIn animation
            if (index !== 0) {
                item.classList.add("is-hidden");
            }
            this.el.appendChild(item);
        });
        if (this.showButtons) {
            this.addButtons();
        }
    }
}
class SimpleSlider extends BaseSlider {
    constructor(selector, showButtons = true) {
        super(selector, showButtons);
    }
    addSlides(images) {
        if (Array.isArray(images)) {
            const sliderTemplate = (source) => {
                const imgString = simpleSliderTemplate(this.imagePath + source);
                return createDOMElFromString(imgString);
            };
            this.slides = images.map(source => sliderTemplate(source));
        }
    }
}
// TODO: add class TextSlide that implements ITextSlide
// TODO: add elements to textSlides
const textSlides = [
    {
        title: 'Angular',
        subtitle: 'is awesome'
    },
    {
        title: 'Typescript',
        subtitle: 'is awesome',
        baseClass: 'is-info'
    },
    {
        title: 'Lorem Ipsum',
        subtitle: 'dolorem',
        baseClass: 'is-success'
    }
];
const textSliderTemplate = (textSlide) => `
<section class="hero is-medium ${textSlide.baseClass ? textSlide.baseClass : "is-primary"} is-bold">
   <div class="hero-body">
   <div class="container">
       <h1 class="title">
       ${textSlide.title}
       </h1>
       <h2 class="subtitle">
       ${textSlide.subtitle}
       </h2>
   </div>
   </div>
</section>`;
// should extend abstract class BaseSlider
class TextSlider {
}
class AutomaticSlider {
}
const simpleSlider = new SimpleSlider('.simple-slider');
simpleSlider.addSlides(images);
simpleSlider.render();
//# sourceMappingURL=main.js.map