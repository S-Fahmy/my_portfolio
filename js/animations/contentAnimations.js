
function setUpanimations() {

    animateNavbar();
    navbarActiveTracker();
    animateLanding();
    animateMyTitles();
    animateWhatIdo();
    animateMyWorks();
    animateTechStack();
    animateContact();

}

async function animateNavbar() {
    gsap.to('.navbar', {
        scrollTrigger: {
            trigger: '.landing-text',
            start: 'top +=100',
            id: 'nav',
            toggleActions: "play none none reverse",
            // markers: true
        },

        background: '#2D3035',
        filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        duration: 0.4
    });

}

async function navbarActiveTracker() {
    gsap.utils.toArray('.sec').forEach((item, i) => {
        let navItem = '#' + item.id + 'Nav';

        gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'bottom 30%',
                toggleActions: "play reverse play reverse"
            }
        }).to(navItem, {
            color: "#FFF",
            duration: 0.1,
        }).to(navItem, {
            color: "#FF0000",
            duration: 0.5,
            ease: 'power3'
        }).to(navItem, {
            fontWeight: 600,
            duration: 0.2,
            ease: 'power4'
        }).to(navItem, {
            borderBottom: '2px solid red',
            duration: 0.2
        }, '-=0.2');

    });
}

async function animateLanding() {
    gsap.timeline().from('.landing-text h3', { delay: 1, duration: 0.5, scaleX: 0, ease: "back" })
        .to('.landing-text .animgrp', { duration: 1.5, clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)", y: '30' })
        .to('.landing-text .animgrp .bold-red', { duration: 1.5, opacity: 1 , ease: 'power3'})
        .from('.landing-laptop', {duration: 1, scale: 0, ease: 'back'})
        // .add(async function () { particlesJS.load('.landing-laptop', 'js/practicles/particles.json'); })
        .from('.scroll-icon', { duration: 1, opacity: 0, ease: "back", x: -50 }, '-=2.5')
        .from('.landing-container .social-icons', { duration: 1, opacity: 0, ease: "back", x: 50 }, '-=1.5');


}

async function animateMyTitles() {
    gsap.utils.toArray('#myTitles').forEach((item, i) => {
        gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 90%' } })
            .from(item, { x: (i % 2 === 0) ? 300 : -300, opacity: 0, duration: 2, ease: Power4.in })
            .from(item.querySelector('.myTitlesIcon'), { x: (i % 2 === 0) ? 50 : -50, rotation: (i % 2 === 0) ? 360 : -360, duration: 1 }, '-=1');

    });

}

async function animateWhatIdo() {
    gsap.from('.whatdo .whatdo-text p', {
        scrollTrigger: {
            trigger: '.whatdo .whatdo-text p',
            start: 'top bottom',
            toggleActions: "play none none reverse",
        }, opacity: 0, x: 100, y: 80, duration: 1.5
    });


    gsap.from('.whatDoCard', {
        scrollTrigger: {
            trigger: '.whatDoCards',
            start: 'top 60%',
            end: 'bottom 85%',

            scrub: 2,
            id: 'whatdocards',
            // markers: true
        },
        y: 400,
        opacity: 0,
        stagger: 1,
        duration: 1
    });

}

async function animateMyWorks() {
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


}

async function animateTechStack() {
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

function animateAboutMe() {


}

async function animateContact() {

    gsap.from('.contact-form-wrapper', {scrollTrigger: {trigger: '.contact-form-wrapper', start: 'top 80%'}, opacity: 0, duration: 3.5, ease: 'fadeOut'});

}


function pageTransition(namespace) {
    let tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1.2,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });

    tl.to(".loading-screen", {
        duration: 0.8,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { left: "-100%" });
}


const cleanGSAP = () => {
    ScrollTrigger.getAll().forEach(t => t.kill(false));
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event("resize"));
};