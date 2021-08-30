
async function scrollToSection(sectionId) {
  gsap.to(window, { duration: 1, scrollTo: { y: sectionId, offsetY: 120 } });
}

let scrollY = 0;



window.onload = async function () {

  barba.init({
    sync: true,
    transitions: [{
      name: 'home',

      async leave(data) {
        const done = this.async();
        pageTransition(data.current.namespace);
        await delay(800);        
        done();
      },

      async enter(data) {
        data.next.namespace === "home" ? cleanGSAP() : gsap.to(window, {scrollTo: {y: 0}});

      },


    }],
    views: [{
      namespace: 'home',
      beforeLeave: async function (data) {
        scrollY = barba.history.current.scroll.y;

      },
      beforeEnter: async function () {
        if (scrollY > 0) {
          window.scrollTo(0, scrollY);
        }

      },

      afterEnter: function (data) {
        setUpanimations();
      }
    },
    {
      namespace: 'projects',
    }]
  });


  if (window.innerWidth < 1000) {
    gsap.to('.navbar-brand', {
      scrollTrigger: {
        trigger: '.landing-text',
        start: 'top 5%',
        scrub: 2
      },
      opacity: 0, x: -100, duration: 2
    });
  }

};


let activeTabId = '#langs';

async function displayTab(e, tabName) {

  document.querySelector('.tech-tabs .active').classList.remove('active');

  document.querySelector(activeTabId).classList.add('hidden');

  e.target.classList.add('active');

  document.querySelector(tabName).classList.remove('hidden');

  activeTabId = tabName;

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
form.addEventListener("submit", mailSubmit);

async function mailSubmit(event) {

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
