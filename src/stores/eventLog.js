import {extendObservable, observable} from "mobx";
import engine from "store/src/store-engine";
import _localStorage from "store/storages/localStorage";
import _cookieStorage from "store/storages/cookieStorage";
import storePluginDefault from "store/plugins/defaults";
import storePluginExpire from "store/plugins/expire";

const storages = [_localStorage, _cookieStorage];
const plugins = [storePluginDefault, storePluginExpire];
const store = engine.createStore(storages, plugins);

export default class EventLog {
  constructor(request, state = {}) {
    extendObservable(
      this, {
        eventLog: observable.shallowArray(
          store.get("events") ? JSON.parse(store.get("eventLog")) : []
        )
      }, state
    );
  }

  getEvents() {
    return this.eventLog;
  }

  setEvent(event) {
    //console.log(this.eventLog.peek());
    this.eventLog.push(event);
    store.set("eventLog", JSON.stringify(this.eventLog));
  }
}
