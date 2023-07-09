"use client";
import Alert from "@/components/Alert";
// import UploadForm from "@/components/FileUpload";
import EditFile from "@/components/EditFile";
import InstructionsModal from "@/components/InstructionsModal";
import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import {GetData,UpdateDatabase}from'../components/db'
// 
const downloadExcel = (data: any) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};

export default function Home() {

  
  const [items, setItems] = useState([]);

  useEffect( () => {
    
    const userId = localStorage.getItem("userId");
    

    if(userId) {
     const info : any = GetData(userId).then((data : any) => {

       console.log(data);
       setItems(data);
     });

     

    //  setItems(info)
    
    }

  }, []);

  const [isActive, setIsActive] = useState(false);
  const [alert, setAlert]: any = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    FIRSTNAME: "",
    LASTNAME: "",
    USERNAME: "",
    PASSWORD: "",
    PHONE: "",
    COMMENT: "",
    index: 0,
  });
  const [isNew, setIsNew] = useState(window.localStorage.getItem("IsNew") == "true");
  
  

  console.log("isNew" + isNew);

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e: any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        // validating sheet
        console.log("validating data");

        data.map((item:any)=>{
            if(item.USERNAME == "" || item.PASSWORD == "" || item.FIRSTNAME == "" || item.LASTNAME == "" || item.COMMENT == "" || item.PHONE == ""){
              console.log("item ");
              setAlert("Please fill are required fields")
              reject("Please fill")
            }else if(item.USERNAME == undefined || item.PASSWORD == undefined || item.FIRSTNAME == undefined || item.LASTNAME == undefined || item.COMMENT == undefined || item.PHONE == undefined){
              console.log("item und");
              setAlert("Please fill are required fields")
              reject("Please fill")
            }else if(item.USERNAME == null || item.PASSWORD == null || item.FIRSTNAME == null || item.LASTNAME == null || item.COMMENT == null || item.PHONE == null){
              console.log("item null");
              setAlert("Please fill are required fields")
              reject("Please fill")
            }
        })

        if(data.length <= 0){
          console.log("item null");
          setAlert("The file is not recognizable , you can try by demo file");
        }
        resolve(data);
        console.log(data);
       const userId = await UpdateDatabase(data)

       console.log(userId);
       
        
       localStorage.setItem("userId", userId)
        

      
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d: any) => {
      setItems(d);
    });
  };

  console.log(items);

  return (
    <>
      {alert && 
        <Alert alert={alert} isAlert={alert} setIsAlert={setAlert}/>
      }
      <main className="flex min-h-screen flex-col items-center p-10">
        <a
          className="flex flex-rowp-1 mb-2 p-2 w-1/2 bg-slate-400 text-white rounded-md"
          href="https://res.cloudinary.com/dx4ccftyk/raw/upload/v1688878129/avatars/Demo_File.csv"
        >
          <div className="mx-auto flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download demo excel file
          </div>
        </a>
        <div className="flex items-center justify-center w-1/2">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                XLS, XLXS files only (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e: any) => {
                const file = e.target.files[0];
                console.log(e.target.files[0]);

                readExcel(file);
              }}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;application/vnd.ms-excel"
            />
          </label>
        </div>

        <br></br>
        <br></br>
        <br></br>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  FirstName
                </th>
                <th scope="col" className="px-6 py-3">
                  LastName
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  UserName
                </th>
                <th scope="col" className="px-6 py-3">
                  Password
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
              </tr>
            </thead>
            <tbody>
              {items && items.map((data: any, index) => (
                <tr
                  className="bg-white border-b hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
                  key={index}
                  onClick={() => {
                    console.log(index);
                    console.log(data);

                    setSelectedItem({ index, ...data });

                    setIsActive(true);
                  }}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.FIRSTNAME}
                  </th>
                  <td className="px-6 py-4">{data.LASTNAME}</td>
                  <td className="px-6 py-4">{data.PHONE}</td>
                  <td className="px-6 py-4">{data.USERNAME}</td>
                  <td className="px-6 py-4">{data.PASSWORD}</td>
                  <td className="px-6 py-4">{data.COMMENT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isActive && selectedItem ? (
          <EditFile
            COMMENT={selectedItem.COMMENT}
            FIRSTNAME={selectedItem.FIRSTNAME}
            LASTNAME={selectedItem.LASTNAME}
            PASSWORD={selectedItem.PASSWORD}
            PHONE={selectedItem.PHONE}
            USERNAME={selectedItem.USERNAME}
            isActive={isActive}
            setIsActive={setIsActive}
            items={items}
            seItems={setItems}
            index={selectedItem.index}
          />
        ) : null}

        {items.length != 0 ? (
          <a
            className="mt-3 flex flex-rowp-1 mb-2 p-2 bg-slate-400 text-white rounded-md cursor-pointer"
            onClick={() => downloadExcel(items)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download Customized File
          </a>
        ) : null}
        

        {/* Instructions */}

        {!isNew && <InstructionsModal />}
      </main>
    </>
  );
}
