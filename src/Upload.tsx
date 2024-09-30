import React, { useEffect, useState, CSSProperties } from "react";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import Lightbox from "yet-another-react-lightbox";
import {
  Fullscreen,
  Slideshow,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

// Styles
const dropzoneStyle: CSSProperties = {
  border: "2px dashed #0087F7",
  borderRadius: 5,
  backgroundColor: "#f9f9f9",
  color: "#333",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "border 0.3s ease-in-out",
};

const thumbsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: CSSProperties = {
  display: "inline-flex",
  position: "relative",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

const thumbInner: CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const imgStyle: CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};

const removeButton: CSSProperties = {
  position: "absolute",
  top: 4,
  right: 4,
  background: "#ff4d4d",
  border: "none",
  borderRadius: "50%",
  color: "#fff",
  width: 20,
  height: 20,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
};

// Custom type for files with preview URLs and base64
interface FileWithPreview extends File {
  preview: string;
}

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      const mappedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
      setFiles((prevFiles) => [...prevFiles, ...mappedFiles]); // Add new files to existing files
    },
  });

  const removeFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner} onClick={() => openLightbox(index)}>
        <img src={file.preview} style={imgStyle} alt={file.name} />
      </div>
      <button
        style={removeButton}
        onClick={() => removeFile(file.name)}
        title="Remove file"
      >
        ×
      </button>
    </div>
  ));

  return (
    <section className="container">
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
      <aside style={thumbsContainer}>{thumbs}</aside>

      {/* Lightbox for image preview */}
      <Lightbox
        styles={{
          slide: {
            background: "#24242427",
          },
        }}
        slides={files.map((file) => ({
          src: file.preview,
          alt: file.name,
        }))}
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        plugins={[Zoom, Fullscreen, Slideshow]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
        }}
      />
    </section>
  );
};

export default Upload;
