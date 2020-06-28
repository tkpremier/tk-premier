
class Touch {
  constructor(xStart = 0, xEnd = 0, yStart = 0, yEnd = 0) {
    this.coords = { xStart, xEnd, yStart, yEnd };
    this.timeStamp = Date.now();
  }
  reset() {
    _(this.coords).forEach((val, key) => {
      this.coords[key] = 0;
    });
  }
  getXDelta() {
    return this.coords.xStart - this.coords.xEnd;
  }
  getYDelta() {
    return this.coords.yStart - this.coords.yEnd;
  }
}

export default function touchHelper(el) {
  const $el = el instanceof jQuery ? el : $(el);
  const touch = new Touch();

  function touchCancel(event) {
    const t = event.data.touch;
    t.reset();
    return event;
  }

  function getTouches(e) {
    return e.touches || e.originalEvent.touches;
  }

  function timedOut(event) {
    const t = event.data.touch;
    return Math.abs(t.timeStamp - Date.now()) > 500;
  }

  function horizontalSwipe(event) {
    const t = event.data.touch;
    const deltaX = t.getXDelta();
    if (Math.abs(deltaX) < 300) {
      touchCancel(event);
    } else {
      const posInt = deltaX > 0;
      if (posInt) {
        $el.trigger(new jQuery.Event('swiperight'), t);
      } else {
        $el.trigger(new jQuery.Event('swipeleft'), t);
      }
    }
    return event;
  }

  function verticalSwipe(event) {
    const t = event.data.touch;
    const deltaY = t.getYDelta();
    if (Math.abs(deltaY) < 300) {
      touchCancel(event);
    } else {
      const posInt = deltaY > 0;
      if (posInt) {
        $el.trigger(new jQuery.Event('swipeup'), t);
      } else {
        $el.trigger(new jQuery.Event('swipedown'), t);
      }
    }
    return event;
  }

  function delegateSwipe(event) {
    if (timedOut(event)) {
      touchCancel(event);
    } else {
      horizontalSwipe(event);
      verticalSwipe(event);
    }
    touchCancel(event);
    return event;
  }

  function touchStart(event) {
    const t = event.data.touch;
    const touchList = getTouches(event);
    if (touchList.length > 1) {
      touchCancel(event);
    } else {
      const coords = touchList[0];
      [t.coords.xStart, t.coords.yStart] = [coords.clientX, coords.clientY];
      t.timeStamp = Date.now();
    }
    return event;
  }

  function touchMove(event) {
    const t = event.data.touch;
    const touchList = getTouches(event);
    if (touchList.length > 1) {
      touchCancel(event);
    } else {
      const coords = touchList[0];
      t.coords.xEnd = coords.clientX;
      t.coords.yEnd = coords.clientY;
    }
  }

  function touchEnd(event) {
    delegateSwipe(event);
    return event;
  }

  function delegateTouch(event) {
    switch (event.type) {
      case 'touchstart':
        touchStart(event);
        break;
      case 'touchmove':
        touchMove(event);
        break;
      case 'touchend':
        touchEnd(event);
        break;
      default:
        touchCancel(event);
        break;
    }
  }

  $el.on('touchstart touchmove touchend touchcancel', { touch }, delegateTouch);
  return $el;
}
