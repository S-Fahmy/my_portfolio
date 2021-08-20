


const landingH1 = document.querySelector('.landing-text h1');
const landingH3 = document.querySelector('.landing-text .animgrp');
const fs = document.querySelector('.landing-text .animgrp .bold-red');



gsap.to('.navbar', {
  scrollTrigger: {
    trigger: '.landing-text',
    start: 'top +=100',
    id: 'nav',
    toggleActions: "play none none reverse",
    // markers: true
  },

  background: '#242424',
  duration: 0.4
});

const tl = gsap.timeline();


tl.from(landingH1, { delay: 1, duration: 1.5, scaleX: 0, ease: "elastic" })
  .to(landingH3, { duration: 2, clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)", y: '30' }, '-=.5')
  .to(fs, { duration: 1.5, opacity: 1 })
  .add(async function () { particlesJS.load('landing', '/js/practicles/particles.json'); })
  .from('.landing-btn', { duration: 1, opacity: 0, stagger: 0.2, ease: "back", x: -500 }, '-=1')
  .from('.landing-container .social-icons', { duration: 1, opacity: 0, ease: "back", x: 500 }, '-=1.5');



const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.whatdo',
    start: 'top center',
    end: 'top 200px',

    scrub: 2.5,
    id: 'whatdo',
    // markers: true
  }
});


tl2.from('.whatdo h4', { x: -200, opacity: 0, duration: 1.5, ease: Power1.inOut })
  .from('.whatdo .whatdo-text, .whatdo .brackets', { y: 300, opacity: 0, duration: 1.5, ease: 'power1' }, '-=1')
  .from('.whatdo .whatDoCard', {
    y: 400,
    opacity: 0,
    stagger: 0.5,
    duration: 1.5
  });



gsap.utils.toArray('.project-item').forEach((item, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: getPin(),
      toggleActions: "play none none reverse",
      pin: true,
    }
  }).from(item, {opacity: 0, y: 200, duration: 0.7, ease: Power3.inOut});

});

// gsap.utils.toArray('.project-item').forEach((item, i) => {
//   ScrollTrigger.create({
//     trigger: item,
//     start: getPin(),
//     pin: true,
//   });

// });

function getPin() {
  if (window.innerWidth < 450) {
    return "top 15%";
  }

  return "top 35%";

}

window.onload = async function () {




  width = window.innerWidth;

  if (width < 450) {
    pin = '1px';

    const techTags = document.querySelectorAll(".tech-tag");
    const contactTitle = document.querySelector(".contact-container");
    let i = 0
    document.querySelectorAll('.project-image').forEach(elem => {
      techTags[i].after(elem);
      i++;
    });

    contactTitle.before(document.querySelector('.reviews-container'));
  }
};



let activeTabId = '#langs' //default

async function displayTab(e, tabName) {

  //remove active class from the tabs menu old element
  document.querySelector('.tech-tabs .active').classList.remove('active');

  //hide old content
  document.querySelector(activeTabId).classList.add('hidden');

  //add active class to the tabs menu element and display new content
  e.target.classList.add('active');

  document.querySelector(tabName).classList.remove('hidden');

  activeTabId = tabName



}


async function copyEmail() {

  await navigator.clipboard.writeText('saleh.fahmy2@gmail.com');

  const copyBtn = document.querySelector('.copy-btn');

  copyBtn.textContent = 'Copied!'

  setTimeout(() => copyBtn.textContent = 'Copy', 2000);


}