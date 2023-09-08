(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });

  const tl = gsap.timeline();
  tl.to("body", {
    overflow: "hidden",
  });
  tl.to(".box-container .box", {
    scale: 0.25,
    yoyo: true,
    backgroundColor: "white",
    repeat: -1,
    ease: "power3",
    delay: 1,
    stagger: {
      amount: 1,
      grid: "auto",
      from: "edges",
    },
  });
  tl.to(".box-container", {
    opacity: 0,
    delay: 1,
  });
  tl.to(".box-container", {
    delay: 1,
    onComplete: () => {
      tl.pause();

      gsap.to(".box-wrapper", {
        height: 0,
        display: "none",
      });

      gsap
        .timeline()
        .to(".contents", {
          onStart: () => {
            gsap.to(window, 0.7, {
              scrollTo: 0,
            });
          },
        })
        .to(".contents", {
          minHeight: "100vh",
          duration: 1.5,
        })
        .to(".panel h2", {
          y: -32,
          opacity: 1,
        })
        .from(".panel span", {
          opacity: 0,
        })
        .to(".panel span", {
          repeat: -1,
          yoyo: true,
          y: 15,
        })
        .to("body", {
          overflow: "auto",
          onComplete: () => {
            const tl2 = gsap.timeline({
              scrollTrigger: {
                trigger: ".section1",
                toggleActions: "restart none reverse pause",
                start: "top center",
                end: "+=180",
                scrub: 1,
              },
            });
            tl2.to(".section1-card", {
              opacity: 1,
              scale: 0.5,
            });
            tl2.to(".section1-card .box", {
              borderRadius: 50,
              onComplete: () => {
                const boxes = document.querySelectorAll(".section1-card .box");
                console.log(boxes);
                boxes.forEach((box, idx) => {
                  gsap.to(box, {
                    keyframes: [{ y: 10 }, { y: 0 }],
                    ease: "power3",
                    duration: 1.2,
                    repeat: -1,
                    delay: idx * 0.1,
                  });
                });
              },
            });

            const section2 = document.querySelector(".section2");
            const panels = gsap.utils.toArray(".section2 .panel");
            gsap.to(panels, {
              xPercent: -100 * (panels.length - 1),
              ease: "none",
              scrollTrigger: {
                trigger: section2,
                pin: true,
                scrub: 0.5,
                snap: 1 / (panels.length - 1),
                end: () => "+=" + section2.offsetWidth,
              },
            });

            const section1 = document.querySelector(".section1");
            const wrapper = document.querySelectorAll(".wrapper");
            wrapper.forEach((w, index) => {
              gsap.fromTo(w, { opacity: 0 }, { opacity: 1 });
              gsap.fromTo(
                w,
                { x: index % 2 === 0 ? w.scrollWidth : w.scrollWidth * -1 },
                {
                  x: 0,
                  scrollTrigger: {
                    trigger: section1,
                    scrub: 0.25,
                  },
                }
              );
            });
          },
        });
    },
  });
})();
