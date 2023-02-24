import React, { useEffect } from "react";
// import ImageUploading from "react-images-uploading"; 

export default function Uploadphoto() {
  const buttonToggle = () => {
    if (images.length < 2) {
      document.getElementById("uploadPageBtn").disabled = true;
    } else {
      document.getElementById("uploadPageBtn").disabled = false;
    }
  };

  const handleSlide = (e) => {
    e.preventDefault();
    document.getElementById("profile_setup").style.transform =
      "translateX(-600vw)";
  };

  const handlebackwardSlide = (e) => {
    e.preventDefault();
    document.getElementById("profile_setup").style.transform =
      "translateX(-400vw)";
  };

  const [images, setImages] = React.useState([]);
  const maxNumber = 20;
  const onChange = (imageList, addUpdateIndex) => {
    buttonToggle();
    setImages(imageList);
  };

  useEffect(() => {
    // buttonToggle();
  });

  return (
    <>
      <div className="outer_signup" id="outer_signup">
        <div className="col1"></div>
        <div className="col2">
          <div className="upper">
            <h2>Upload Your Photos</h2>
          </div>
          {console.log(images)}
          {/* <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <form
                className="photo_section"
                action = 'http://localhost:8000/details/userImages'
                method="post"
                enctype="multipart/form-data"
              >
                <label 
                htmlFor="input-files">
                  Select Photo <br />
                  <i class="fa fa-2x fa-camera"></i>
                <input
                type="file"
                name="image"
                id="input-files"
                placeholder="Choose Photo"
              />
                </label>
                <div className="image_wrapper">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.data_url} alt="" width="130" />
                    </div>
                  ))}
                </div>
                <button>submit</button>
              </form>
            )}
          </ImageUploading> */}

          <div className="suggestions">
            <p>
              <span> &#129488; </span> Minimum 2 Photos
            </p>
            <p>
              <span>&#129331; </span> Selfies Are Good
            </p>
            <p>
              <span>&#10060;</span> Avoid Group Photos
            </p>
          </div>
          <div className="middle">
            <button className="btn" id="uploadPageBtn" onClick={handleSlide}>
              Upload
            </button>
            <button className="btn_back" onClick={handlebackwardSlide}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
