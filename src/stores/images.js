import {extendObservable, observable} from "mobx"
import engine from "store/src/store-engine";
import _localStorage from "store/storages/localStorage";
import _cookieStorage from "store/storages/cookieStorage";
import storePluginDefault from "store/plugins/defaults";
import storePluginExpire from "store/plugins/expire";
const storages = [_localStorage, _cookieStorage]
const plugins = [storePluginDefault, storePluginExpire]
const store = engine.createStore(storages, plugins)

export default class ImageStore {
  constructor(request, state = {}) {
    extendObservable(
      this,
      {
        request,
        images: observable.shallowArray(store.get("images") ? store.get("images") : [])
      },
      state
    );
    this._fetchImages()
  }

  _fetchImages() {
    const opts = {
      method:  "GET",
      headers: {
        "Content-type": "application/json"
      }
    };
    return fetch("http://localhost:1337/api/images", opts).then(response => response.json()).then(json => {
      this.images = json
      store.set("images", json)
    });
  }

  getImages() {
    return this.images
  }

}
