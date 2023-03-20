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
            <div className="flex  sm:max-w-[450px] place-items-end">
              <div className="text grow">
                <h1 className="text-xl mt-10">Ta-da! How does this look?</h1>
                <p className="text-sm text-slate-400">
                  You can add 5 pictures maximum.
                </p>
              </div>
              <button
                className="mt-5 w-30 h-10 text-sm rounded-xl px-2 bg-red-400 text-white "
                onClick={() => {
                  setPreview("");
                }}
              >
                Remove pictures
              </button>
            </div>
            <div className="flex flex-row flex-nowrap mt-5 overflow-hidden overflow-x-scroll sm:max-w-[450px]">
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
          </>
        ) : (
          <>
            <div className="flex  sm:max-w-[450px] place-items-end">
              <div className="text grow">
                <h1 className="text-xl mt-10">Ta-da! How does this look?</h1>
                <p className="text-sm text-slate-400">
                  You can add 5 pictures maximum.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <FileUploader
                handleChange={handleChange}
                types={fileTypes}
                value={pictures}
                multiple={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PicturesPublish;
