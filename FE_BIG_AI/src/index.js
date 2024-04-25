// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import ImageUploading from "react-images-uploading";
// import "./styles.css";

// function App() {
//   const [images, setImages] = useState([]);
//   const [apiResponse, setApiResponse] = useState([]);
//   const maxNumber = 69;

//   const onChange = (imageList, addUpdateIndex) => {
//     setImages(imageList);
//   };

//   const uploadImagesToDjango = async () => {
//     const formData = new FormData();
//     images.forEach((image) => {
//       formData.append("image", image.file);
//     });

//     try {
//       const response = await fetch("http://127.0.0.1:8000/", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const x = await response.json();
//         data.append(x)
//         setApiResponse(data);
//         console.log("Images uploaded successfully.");
//       } else {
//         console.error("Failed to upload images.");
//       }
//     } catch (error) {
//       console.error("Error uploading images:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <ImageUploading
//         multiple
//         value={images}
//         onChange={onChange}
//         maxNumber={maxNumber}
//         dataURLKey="data_url"
//         acceptType={["jpg"]}
//       >
//         {({
//           imageList,
//           onImageUpload,
//           onImageRemoveAll,
//           onImageUpdate,
//           onImageRemove,
//           isDragging,
//           dragProps,
//         }) => (
//           // write your building UI
//           <div className="upload__image-wrapper">
//             <button
//               style={isDragging ? { color: "red" } : null}
//               onClick={onImageUpload}
//               {...dragProps}
//             >
//               Browse Images
//             </button>
//             &nbsp;
//             <button onClick={onImageRemoveAll}>Remove all images</button>
//             {imageList.map((image, index) => (
//               <div key={index} className="image-item">
//                 <img src={image.data_url} alt="" width="100" />
//                 <div className="image-item__btn-wrapper">
//                   <button onClick={() => onImageUpdate(index)}>Update</button>
//                   <button onClick={() => onImageRemove(index)}>Remove</button>
//                 </div>
//                 {apiResponse && (
      
//       <p>{JSON.stringify(apiResponse, null, 2)}</p>
    
//   )}

//               </div>
//             ))}
//            {images.length > 0 ? <button onClick={uploadImagesToDjango}>Get Predict</button> : <p></p>}
          
//           </div>
//         )}
//       </ImageUploading>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


import React, { useState } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import "./styles.css";

function App() {
  const [images, setImages] = useState([]);
  const [imageResponses, setImageResponses] = useState([]); // Lưu trữ kết quả API cho từng ảnh
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const uploadImagesToDjango = async () => {
    const formData = new FormData();
    const newImageResponses = [];

    for (const image of images) {
      formData.append("image", image.file);

      try {
        const response = await fetch("http://127.0.0.1:8000/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          newImageResponses.push(data);
        } else {
          console.error("Failed to upload image.");
          newImageResponses.push(null); // Thêm null vào mảng nếu lỗi
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        newImageResponses.push(null); // Thêm null vào mảng nếu lỗi
      }
    }

    setImageResponses(newImageResponses);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
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
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Browse Image
            </button>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  {/* <button onClick={() => onImageRemove(index)}>Remove</button> */}
                </div>
                {imageResponses[index] && (
                  <div>
                    <pre>{JSON.stringify(imageResponses[index], null, 2)}</pre>
                  </div>
                )}
              </div>
            ))}
            {images.length > 0 ? (
              <button onClick={uploadImagesToDjango}>Get Predict</button>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);