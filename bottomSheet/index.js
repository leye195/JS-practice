(() => {
  const MAX_Y = window.innerHeight - 80;
  const MIN_Y = 80;

  const bottomSheet = document.querySelector(".bottom-sheet");

  const state = {
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
  };

  const handleTouthStart = (e) => {
    const { target, touches } = e;
    const { touchStart } = state;

    touchStart.sheetY = target.getBoundingClientRect().y;
    touchStart.touchY = touches[0].clientY;
  };

  const handleTouthMove = (e) => {
    e.preventDefault();

    const { currentTarget, touches } = e;
    const { touchStart, touchMove } = state;

    const currentTouch = touches[0];

    if (!touchMove.prevTouchY) touchMove.prevTouchY = touchStart.touchY;

    if (touchMove.prevTouchY < currentTouch.clientY) {
      touchMove.movingDirection = "down";
    }

    if (touchMove.prevTouchY > currentTouch.clientY) {
      touchMove.movingDirection = "up";
    }

    const touchOffset = currentTouch.clientY - touchStart.touchY;
    let nextSheetY = touchStart.sheetY + touchOffset;

    if (nextSheetY <= MIN_Y) nextSheetY = MIN_Y;

    if (nextSheetY >= MAX_Y) nextSheetY = MAX_Y;

    currentTarget.style.transform = `translateY(calc(100% - ${MIN_Y}px + ${
      nextSheetY - MAX_Y
    }px))`;
  };

  const handleTouthEnd = (e) => {
    const { currentTarget } = e;
    const { touchMove, touchStart } = state;
    const currentSheetY = currentTarget.getBoundingClientRect().y;

    if (currentSheetY !== MIN_Y && touchMove.movingDirection === "down") {
      currentTarget.style.transform = `translateY(calc(100% - 80px))`;
    }

    if (currentSheetY !== MIN_Y && touchMove.movingDirection === "up") {
      currentTarget.style.transform = `translateY(0)`;
    }

    touchStart.sheetY = 0;
    touchStart.touchY = 0;
    touchMove.movingDirection = "none";
    touchMove.prevTouchY = 0;
  };

  const addEventListener = () => {
    bottomSheet.addEventListener("touchstart", handleTouthStart);
    bottomSheet.addEventListener("touchmove", handleTouthMove);
    bottomSheet.addEventListener("touchend", handleTouthEnd);
  };

  addEventListener();
})();
