import Inferno from "inferno";
import Component from "inferno-component";
import config from "../../config/index";

export default class Layout extends Component {
  render({ children }) {
    return (
      <div className="grid">

        <div className="row">
          <div className="col-12">
            <div className="header content border-left border-bottom">
              <div className="font-semi-bold font-size-xxl">
                <div className="inner">{config.title}</div>
              </div>
            </div>
          </div>
        </div>

        {children ? children : null}

      </div>
    );
  }
}
