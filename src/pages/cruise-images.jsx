import Inferno from "inferno"
import * as constants from "../constants"
import {connect} from "inferno-mobx"
import BetterImage from "./better-image"

export default connect((props, context) => {
  const imageStore = context.mobxStores[constants.IMAGESTORE];
  const images = imageStore.images.peek();

  // images.map(image => {
  //   console.log(image)
  //   return <BetterImage {...image} />
  // })

  return (
    <div className="image-grid">
      {images.map(image => <BetterImage {...image} />)}
    </div>
  )


});
