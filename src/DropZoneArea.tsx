import React, { CSSProperties } from "react";
import { useDropzone, DropEvent, FileRejection } from "react-dropzone";

// Styles for dropzone
const dropzoneStyle: CSSProperties = {
  border: "2px dashed #aaa",
  borderRadius: 5,
  backgroundColor: "#f5f5f5",
  color: "#333",
  padding: "7px",
  textAlign: "center",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "border 0.3s ease-in-out",
};

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  existingFiles: File[];
}

const DropzoneArea: React.FC<DropzoneProps> = ({
  onFilesAdded,
  existingFiles,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter(
        (file) =>
          !existingFiles.some((existingFile) => existingFile.name === file.name)
      );

      if (filteredFiles.length < acceptedFiles.length) {
        alert("This file is already uploaded");
      }

      onFilesAdded(filteredFiles);
    },
  });

  return (
    <div
      {...getRootProps({
        className: "dropzone",
        style: isDragActive
          ? { ...dropzoneStyle, border: "2px solid black" }
          : dropzoneStyle,
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p style={{ color: "#0087F7" }}>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default DropzoneArea;
