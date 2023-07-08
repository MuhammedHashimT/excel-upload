"use client"
import Image from 'next/image'
import { useState } from 'react';
import * as XLSX from "xlsx";
export default function Home() {
  const [items, setItems] = useState([]);

  const readExcel = (file : any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e : any) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        console.log(data);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d : any) => {
      setItems(d);
    });


  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

        
<div className="flex items-center justify-center w-1/2">
    <label  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">XLS, XLXS files only (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden"      onChange={(e : any) => {
          const file = e.target.files[0];
          readExcel(file);
        }}/>

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
  
           
            {
              items.map((datas : any, index) =>
                
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {datas.FirstName}
                </th>
                <td className="px-6 py-4">
                {datas.LastName}
                </td>
                <td className="px-6 py-4">
                {datas.Phone}
                </td>
                <td className="px-6 py-4">
                {datas.UserName}
                </td>
                <td className="px-6 py-4">
                {datas.Password}
                </td>
                <td className="px-6 py-4">
                {datas.Comment}
                </td>
            </tr>
                
              )}
        </tbody>
    </table>
</div>

    </main>
  )
}
