


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

async function scrollToSection(sectionId) {
  gsap.to(window, { duration: 1, scrollTo: { y: sectionId, offsetY: 120 } });
}

let scrollY = 0;



window.onload = async function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  barba.init({
    sync: true,
    debug: true,
    transitions: [{
      name: 'home',
      // leave(data) {

      //   return gsap.to(data.current.container, {
      //     opacity: 0
      //   });
      // },
      // enter(data) {

      //   if (data.next.namespace === "home") cleanGSAP();

      //   return gsap.from(data.next.container, {
      //     opacity: 0
      //   });


      // },

      async leave(data) {
        const done = this.async();
        pageTransition(data.current.namespace);
        await delay(800);
        done();
      },

      async enter(data) {
       data.next.namespace === "home" ? cleanGSAP() : window.scrollTo(0, 0); 

        // contentAnimation();
      },

      async once(data) {
        // contentAnimation();

      }

    }],
    views: [{
      namespace: 'home',
      beforeLeave: function (data) {
        scrollY = barba.history.current.scroll.y;

      },
      beforeEnter: function () {
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }

      },

      afterEnter: function (data) {
        animate();
      }
    },
    {
      namespace: 'projects',
      beforeEnter: function (data) {
        // window.scrollTo(0, 0);
      }
    }]
  });



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

function animate() {

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


  tl.from(landingH1, { delay: 1, duration: 0.5, scaleX: 0, ease: "back" })
    .to(landingH3, { duration: 1.5, clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)", y: '30' })
    .to(fs, { duration: 1.5, opacity: 1 })
    .add(async function () { particlesJS.load('landing', '/new/js/practicles/particles.json'); })
    .from('.landing-btn', { duration: 1, opacity: 0, stagger: -0.5, ease: "back", x: -500 }, '-=1')
    .from('.landing-container .social-icons', { duration: 1, opacity: 0, ease: "back", x: 500 }, '-=1.5');

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.whatdo-text',
      start: 'top bottom',
      end: 'top 200px',

      toggleActions: "play none none reverse",
      id: 'whatdo',
      // markers: true
    }
  });

  tl2.from('.whatdo h4', { x: -300, opacity: 0, duration: 3, ease: Power1.inOut })
    .from('.whatdo .whatdo-text, .whatdo .brackets', { y: 300, opacity: 0, duration: 0.7, ease: 'power1' }, '-=2.5');




  gsap.from('.whatDoCard', {
    scrollTrigger: {
      trigger: '.whatDoCards',
      start: 'top bottom',
      end: 'top 70%',

      scrub: 2,
      id: 'whatdocards',
      // markers: true
    },
    y: 400,
    opacity: 0,
    stagger: 1,
    duration: 1
  });

  gsap.from('.myworks', {
    scrollTrigger: {
      trigger: '.myworks',
      start: 'top center'
    },
    opacity: 0,
    duration: 1.5,
    ease: Power4.inOut
  });

  gsap.utils.toArray('.project-item').forEach((item, i) => {
    // i = 2 is hardcoded as the last element for now.
    gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'bottom bottom',
        end: (i == 2) ? 'top bottom' : 'bottom top',
        // toggleActions: "play none none none",
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        // markers: true,
        id: 'projects'
      }
    });
  });


  gsap.from('.techSkills', {
    scrollTrigger: {
      trigger: '.techSkills',
      start: 'top center',
      end: 'top 40%',
      scrub: 2,

    },
    scale: 0.7,
    borderRadius: '2%',
    duration: 0.5,
  });



}


function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition(namespace) {
  let tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 0.8,
    width: "100%",
    left:  "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".loading-screen", {
    duration: 0.6,
    width: "100%",
    left:  "100%" ,
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}

// function contentAnimation() {
//   var tl = gsap.timeline();
//   tl.from(".animate-this", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
// }



const cleanGSAP = () => {
  ScrollTrigger.getAll().forEach(t => t.kill(false));
  ScrollTrigger.refresh();
  window.dispatchEvent(new Event("resize"));
};