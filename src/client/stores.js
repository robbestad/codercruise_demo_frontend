import requestCreator from "../components/helpers/request";
import Common from "../stores/common";
import Images from "../stores/images";
import EventLog from "../stores/eventLog";

// All our stores are listed here
function createStores(state, token) {
  /* eslint-disable */
  state = state || {
      common: {
        hostname: "http://localhost:5001"
      }
    };
  /* eslint-enable */

  const request = requestCreator(state.common.hostname, token);
  return {
    images:   new Images(),
    eventLog: new EventLog(),
    common:   new Common(request, state.common)
  };
}

// Initialize actions and state
export default (typeof window !== "undefined" ? createStores(window.__STATE) : createStores);
