(() => {
  const cardWrapper = document.querySelector(".card__wrapper");

  const handlePointEvent = (e) => {
    const { clientX, clientY } = e;

    const cardList = document.querySelectorAll(".card");

    const cards = Array.from(cardList);
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      card.style.setProperty("--x", x);
      card.style.setProperty("--y", y);
    });
  };

  cardWrapper.addEventListener("pointermove", handlePointEvent);
})();
