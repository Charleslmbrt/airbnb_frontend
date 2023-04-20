//import packages
import { FileUploader } from "react-drag-drop-files";

const PicturesPublish = ({ preview, setPreview, pictures, setPictures }) => {
  const fileTypes = ["JPG", "PNG", "GIF", "WEBP", "JPEG"];

  const handleChange = async (files) => {
    const urls = await Promise.all(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
    setPictures(Array.from(files));
    setPreview(urls);
  };

  return (
    <>
      <div>
        {preview ? (
          <>
            <div className="mx-10 sm:flex sm:flex-col sm:items-center">
              <div className="text grow sm:text-center">
                <h1 className="text-3xl font-medium">
                  Ta-da! How does this look?
                </h1>
                <p className="text-lg text-gray-400">
                  You can add 5 pictures maximum. (Jpg, png, gif, webp, jpeg)
                </p>
              </div>

              <div className="flex flex-row flex-nowrap mt-5 overflow-hidden overflow-x-scroll sm:max-w-[700px]">
                {preview.map((blob) => {
                  return (
                    <img
                      src={blob}
                      alt=""
                      className="max-h-64 w-64 object-cover mr-1 last:mr-0"
                    />
                  );
                })}
              </div>
              <button
                className="mt-5 w-30 h-10 text-sm rounded-lg px-4 bg-red-400 text-white"
                onClick={() => {
                  setPreview("");
                }}
              >
                Remove pictures
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mx-10 sm:flex sm:flex-col sm:items-center">
              <div className="text grow sm:text-center">
                <h1 className="text-3xl font-medium">
                  Ta-da! How does this look?
                </h1>
                <p className="text-lg text-gray-400">
                  You can add 5 pictures maximum. (Jpg, png, gif, webp, jpeg)
                </p>
              </div>

              <div className="mt-5">
                <FileUploader
                  handleChange={handleChange}
                  types={fileTypes}
                  value={pictures}
                  multiple={true}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PicturesPublish;
