import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';

export default function MyNextJsExcelSheet() {

  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
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

    promise.then((d) => {
      setItems(d);
    });


  };

  console.log("jkaskojo");

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
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
              items.map((datas, index) =>
                
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



    </div>
  );
}
