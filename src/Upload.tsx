import React from "react";
import DropzoneArea from "./DropZoneArea";
import ImageLightbox from "./ImageLightBoxPreview";
import ThumbnailPreview from "./ThumbNailPreview";
import useFileUpload from "./useFileUpload";

interface UploadProps {
  onFilesChange?: (files: File[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onFilesChange }) => {
  const {
    files,
    lightboxOpen,
    currentImageIndex,
    handleFilesAdded,
    removeFile,
    openLightbox,
    closeLightbox,
  } = useFileUpload();

  // Notify parent component whenever files change
  React.useEffect(() => {
    if (onFilesChange) {
      onFilesChange(files);
    }
  }, [files, onFilesChange]);

  return (
    <section className="container">
      <DropzoneArea onFilesAdded={handleFilesAdded} existingFiles={files} />
      <ThumbnailPreview
        files={files}
        onRemoveFile={removeFile}
        onPreviewImage={openLightbox}
      />
      <ImageLightbox
        files={files}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentIndex={currentImageIndex}
      />
    </section>
  );
};

export default Upload;
