import React, { CSSProperties } from "react";

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
  cursor: "pointer",
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

interface ThumbnailProps {
  files: { preview: string; name: string }[];
  onRemoveFile: (fileName: string) => void;
  onPreviewImage: (index: number) => void;
}

const ThumbnailPreview: React.FC<ThumbnailProps> = ({
  files,
  onRemoveFile,
  onPreviewImage,
}) => {
  return (
    <aside style={thumbsContainer}>
      {files.map((file, index) => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner} onClick={() => onPreviewImage(index)}>
            <img src={file.preview} style={imgStyle} alt={file.name} />
          </div>
          <button
            style={removeButton}
            onClick={() => onRemoveFile(file.name)}
            title="Remove file"
          >
            ×
          </button>
        </div>
      ))}
    </aside>
  );
};

export default ThumbnailPreview;
