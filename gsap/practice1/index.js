(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline();
  tl.to("body", {
    overflow: "hidden",
  });
  tl.to(".box", {
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
        });
    },
  });
})();
