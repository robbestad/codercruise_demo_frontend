import Inferno from "inferno"
import * as constants from "../constants"
import {connect} from "inferno-mobx"
import {asString} from "../components/helpers/render"
import config from "../config/index"
import CruiseImages from "./cruise-images"

export default connect((props, context) => {

  return (
    <div className="grid">

      <div className="row">
        <div className="col-12">
          <div className="sub-header content">
            <div className="font-semi-bold font-size-xl">
              <div className="inner">
                {config.subtitle}
              </div>
            </div>
          </div>
          <div className="content">

            <CruiseImages />

          </div>
        </div>
      </div>

    </div>
  )


});
