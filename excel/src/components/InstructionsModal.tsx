import { useState } from "react";

export default function InstructionsModal() {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-[#ffffffd3]">
            <div className=" relative w-full max-w-2xl max-h-full mx-auto mt-32">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    How to use this app
                  </h3>
                  <button
                    type="button"
                    onClick={() => {setShowModal(false)
                    localStorage.setItem("IsNew", "true")
                    }}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    This app is for Edit your Excel project of a specific model
                    of an application. the file must include the following
                    columns: <span className="text-gray-700  dark:text-gray-300 font-bold">FIRSTNAME, LASTNAME, USERNAME, PASSWORD, PHONE,
                    COMMENT
                    </span> 
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                   You can Edit , delete , populate and add new columns.
                   your data is safely stored in a database.
                  </p>
                </div>
                {/* Modal footer */}
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    onClick={()=>{
                      setShowModal(false)
                      localStorage.setItem("IsNew", "true")
                    }}
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
                  >
                    I Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
