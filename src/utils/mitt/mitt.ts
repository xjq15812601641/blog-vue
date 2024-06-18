import {
  EventHandlerList,
  EventHandlerMap,
  EventType,
  Handler, WildCardEventHandlerList
} from "/@/utils/mitt/variable/emitterVariable";

export class Mitt{
  private all: EventHandlerMap;

  constructor(all?: EventHandlerMap) {
    this.all = all || new Map();
  }

  on<T = any>(type: EventType, handler: Handler<T>) {
    const handlers = this.all.get(type);
    const added = handlers && handlers.push(handler);
    if (!added) {
      this.all.set(type, [handler]);
    }
  }

  off<T = any>(type: EventType, handler: Handler<T>) {
    const handlers = this.all.get(type);
    if (handlers) {
      handlers.splice(handlers.indexOf(handler) >>> 0, 1);
    }
  }

  emit<T = any>(type: EventType, evt?: T) {
    ((this.all.get(type) || []) as EventHandlerList).slice().map((handler) => {
      handler(evt);
    });
    ((this.all.get('*') || []) as WildCardEventHandlerList).slice().map((handler) => {
      handler(type, evt);
    });
  }

  clear() {
    this.all.clear();
  }
}
