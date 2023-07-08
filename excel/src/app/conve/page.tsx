"use client";

import React from 'react';
import Script from 'next/script'
import * as XLSX from 'xlsx';
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

const downloadExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };



const data = 
    [{
    "id": 1,
    "temaIndicador": "Indian",
    "codigo": "001",
    "observaciones": "Interactions Specialist tertiary Regional Tennessee",
    "activo": "SI",
    "urlImagen": "http://placeimg.com/640/480",
    "color": "cyan",
    "createdAt": "2022-01-26T18:48:36.002Z"}]
    

export default function Home() {
    return(
        <div>
            
            <button onClick={()=>downloadExcel(data)} className='border'>
    Download As Excel
</button>
            </div>
    )
}
