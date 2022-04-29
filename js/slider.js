// get the slider
const slider = document.querySelector('.featured__restaurants');
const slides = Array.from(slider.children);

// get the slider indicator
const indicator = document.querySelector('.featured__restaurants__indicator');
const indicators = Array.from(indicator.children);

// media query for mobile portrait devices
const phoneMediaQuery = window.matchMedia(
  '(max-width: 37.5em) and (orientation: portrait)'
);

// set up state
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

indicators[0].classList.add('indicator__item--selected');

// add event listeners
function addListeners() {
  slides.forEach((slide, index) => {
    // disable default image drag
    slide.addEventListener('dragstart', (e) => e.preventDefault());
    // touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);
    // mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mousemove', touchMove);
    slide.addEventListener('mouseleave', touchEnd);
  });
}

// remove event listeners
function removeListeners() {
  slides.forEach((slide, index) => {
    // disable default image drag
    slide.removeEventListener('dragstart', (e) => e.preventDefault());
    // touch events
    slide.removeEventListener('touchstart', touchStart(index));
    slide.removeEventListener('touchend', touchEnd);
    slide.removeEventListener('touchmove', touchMove);
    // mouse events
    slide.removeEventListener('mousedown', touchStart(index));
    slide.removeEventListener('mouseup', touchEnd);
    slide.removeEventListener('mousemove', touchMove);
    slide.removeEventListener('mouseleave', touchEnd);
  });
}

function handleMediaChange(e) {
  if (e.matches) {
    addListeners();
  } else {
    removeListeners();
    //reset state
    isDragging = false;
    startPos = 0;
    currentTranslate = 0;
    prevTranslate = 0;
    animationID = 0;
    currentIndex = 0;

    setSliderPosition();
  }
}

// register media query event listener
phoneMediaQuery.addListener(handleMediaChange);

// Initial check
handleMediaChange(phoneMediaQuery);

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex);

// prevent menu popup on long press
window.oncontextmenu = function (event) {
  //event.preventDefault();
  //event.stopPropagation();
  //return false;
};

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// use a HOF to have index in a closure
function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  // if moved enough negative then snap to next slide if there is one
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  // if moved enough positive then snap to previous slide if there is one
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  setIndicator();
}

function setIndicator() {
  indicators.forEach((e) => {
    e.classList.remove('indicator__item--selected');
  });

  if (currentIndex === 0)
    indicators[0].classList.add('indicator__item--selected');

  if (currentIndex > 0 && currentIndex < slides.length - 1)
    indicators[1].classList.add('indicator__item--selected');

  if (currentIndex === slides.length - 1)
    indicators[2].classList.add('indicator__item--selected');
}
