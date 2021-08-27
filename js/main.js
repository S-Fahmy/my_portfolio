


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

      afterEnter: async function (data) {
        setUpanimations();
      }
    },
    {
      namespace: 'projects',
      beforeEnter: function (data) {
        // window.scrollTo(0, 0);
      }
    }]
  });


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



function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}





let form = document.querySelector("#contactForm");
form.addEventListener("submit", helloBrozzer);

async function helloBrozzer(event) {

  event.preventDefault();

  let status = document.querySelector("#successmsg");

  fetch("https://formspree.io/f/mknkpdej", {
    method: "POST",
    body: new FormData(event.target),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    status.innerHTML = "Thanks, I'll get back to you soon!";
    form.reset()
  }).catch(error => {
    status.innerHTML = "Error, something went wrong";
  });
}


let burgerBtn = document.querySelector(".navbar-toggler");

burgerBtn.addEventListener("click", toggleMenu);

let menuAnim = null;
async function toggleMenu() {
  smallNav = document.querySelector('.smallNav');
  
  if(menuAnim == null){
  menuAnim = gsap.timeline().to(smallNav, { duration: 1, display: "flex", clipPath: "polygon(0 0, 100% 0, 100% 14%, 0 14%)" })
    .from(smallNav, { duration: 1, right: '-100%' }, '-=1.1')
    .to(smallNav, { duration: 0.6, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: 'power3' });

  }else{
    menuAnim.play();
  }
  setTimeout(() => { menuAnim.reverse();}, 4000); //close simulation


}