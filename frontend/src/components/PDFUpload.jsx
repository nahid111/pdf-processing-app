import { useState } from 'react';

function PDFUpload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a PDF file to upload.');
      return;
    }

    setLoading(true);
    setText('');
    setMsg('');

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:5000/api/upload-pdf', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setText(data.text);
        setMsg(data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Upload a PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {loading && <p>Uploading and processing...</p>}
      {msg && (
        <div>
          <h3>Message: {msg}</h3>
        </div>
      )}
      {text && (
        <div>
          <h3>Processed Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

export default PDFUpload;
