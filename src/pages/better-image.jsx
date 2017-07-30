import Inferno from "inferno"

const handleClickCloseImage = () => {
  const imageDiv = document.querySelector("#highlighted-image")
  const imageNode = document.querySelector("#highlighted-image img")
  const wrapper = document.querySelector(".wrapper")
  imageNode.src = ""
  wrapper.classList.remove("wrapper-faded")
  wrapper.classList.remove("highlighted-image-active")
  imageDiv.classList.add("highlighted-image-inactive")
}

const handleOpenImageClick = image => {
  const imageDiv = document.querySelector("#highlighted-image")
  const imageNode = document.querySelector("#highlighted-image img")
  const wrapper = document.querySelector(".wrapper")
  wrapper.classList.add("wrapper-faded")
  imageDiv.classList.add("highlighted-image-active")
  imageDiv.classList.remove("highlighted-image-inactive")
  imageNode.src = `assets/images/${image}`
  wrapper.onclick = () => handleClickCloseImage()
  imageDiv.onclick = () => handleClickCloseImage()
}

export default image => {
  return (
    <div className="image-box">
      <img onClick={() => handleOpenImageClick(image.image)}
           src={`assets/images/thumb/${image.image}`}/>
    </div>
  )

}
