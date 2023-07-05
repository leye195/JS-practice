(() => {
  const debounceButton = document.getElementById("debounce-button");
  const throttleButton = document.getElementById("throttle-button");

  // leading debounce
  const debounceLeading = (callback, wait) => {
    let timeout = null;

    return () => {
      clearTimeout(timeout);

      if (!timeout) {
        callback();
      }

      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    };
  };

  // trailing debounce
  const debounceTrailing = (callback, wait) => {
    let timeout = null;
    console.log("..");

    return () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        callback();
      }, wait);
    };
  };

  // debounce with leading, trailint options
  const debounce = (
    callback,
    wait,
    options = {
      leading: false,
      trailing: true,
    }
  ) => {
    let leadingTimeout = null;
    let trailingTimeout = null;

    return () => {
      if (options.leading) {
        clearTimeout(leadingTimeout);

        if (!leadingTimeout) {
          callback();
        }

        leadingTimeout = setTimeout(() => {
          leadingTimeout = null;
        }, wait);
      }

      if (options.trailing) {
        clearTimeout(trailingTimeout);

        trailingTimeout = setTimeout(() => {
          callback();
        }, wait);
      }
    };
  };

  const throttle = (callback, delay) => {
    let timer = null;

    return () => {
      if (timer) return;

      timer = setTimeout(() => {
        timer = null;
        callback();
      }, delay);
    };
  };

  const handleClickDebounce = debounce(
    () => {
      console.log("debounce");
    },
    1000,
    {
      trailing: true,
      leading: true,
    }
  );

  const handleClickThrottle = throttle(() => {
    console.log("throttle");
  }, 1000);

  const eventListeners = () => {
    debounceButton.addEventListener("click", handleClickDebounce);
    throttleButton.addEventListener("click", handleClickThrottle);
  };

  eventListeners();
})();
