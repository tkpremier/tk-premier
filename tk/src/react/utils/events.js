
class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callBack) {
    if( !this.hasEvent(event) ) {
      this.events[event] = [];
    }

    let index = this.events[event].push(callBack) -1;

    return () => {
      delete this.events[event][index];
    };
  }

  publish(event, ...args) {
    if (!this.hasEvent(event)) { return };

    this.events[event].forEach(function(callBack) {
      callBack(args);
    });

  }

  hasEvent(event) {
    return this.events.hasOwnProperty(event);
  }
}

export default new EventBus();
