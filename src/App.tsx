import { useState } from "react";
import "./App.css";
import Upload from "./Upload";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFiles2, setUploadedFiles2] = useState<File[]>([]);
  return (
    <div>
      <h1>File Upload</h1>
      <Upload onFilesChange={setUploadedFiles} />
      <div>
        <h2>Files:</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <Upload onFilesChange={setUploadedFiles2} />
      <div>
        <h2>Files:</h2>
        <ul>
          {uploadedFiles2.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
