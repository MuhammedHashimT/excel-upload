import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile]:any = useState(null);
  const [filename, setFilename] = useState('');

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset','lh1j34d3');

    try {
      await axios.post(
        'https://api.cloudinary.com/v1_1/dx4ccftyk/auto/upload',
        formData
      ).then(response=>{
        console.log(response);
      })
      .catch(error =>{
        console.log('error');
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='file'  onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;