import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  //  </React.StrictMode>
);

// import { useState } from "react";

// function Slides() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const steps = [
//     {
//       title: "Première étape",
//       content: "Contenu de la première étape",
//     },
//     {
//       title: "Deuxième étape",
//       content: "Contenu de la deuxième étape",
//     },
//     {
//       title: "Troisième étape",
//       content: "Contenu de la troisième étape",
//     },
//   ];

//   const goToNextSlide = () => {
//     setCurrentSlide((prev) => prev + 1);
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prev) => prev - 1);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-4">
//         Étape {currentSlide + 1} : {steps[currentSlide].title}
//       </h1>
//       <p className="text-lg mb-8">{steps[currentSlide].content}</p>
//       <div className="flex">
//         <button
//           className={`px-4 py-2 mr-4 ${
//             currentSlide === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           onClick={goToPrevSlide}
//           disabled={currentSlide === 0}
//         >
//           Précédent
//         </button>
//         <button
//           className={`px-4 py-2 ${
//             currentSlide === steps.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           onClick={goToNextSlide}
//           disabled={currentSlide === steps.length - 1}
//         >
//           Suivant
//         </button>
//       </div>
//     </div>
//   );
// }
