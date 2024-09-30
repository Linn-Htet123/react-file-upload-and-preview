import React from "react";
import Lightbox from "yet-another-react-lightbox";
import {
  Fullscreen,
  Slideshow,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css"; // Make sure to import the Thumbnails stylesheet

interface ImageLightboxProps {
  files: { preview: string; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  files,
  isOpen,
  onClose,
  currentIndex,
}) => {
  return (
    <Lightbox
      styles={{
        slide: {
          background: "#24242427", // Set a semi-transparent background
        },
      }}
      slides={files.map((file) => ({
        src: file.preview,
        alt: file.name,
      }))}
      open={isOpen}
      close={onClose}
      index={currentIndex}
      plugins={[Zoom, Fullscreen, Slideshow, Thumbnails]} // Enable plugins
      zoom={{
        scrollToZoom: true,
        maxZoomPixelRatio: 5, // Set maximum zoom ratio
      }}
      thumbnails={{
        width: 120,
        height: 80,
        border: 1,
        borderRadius: 4,
        gap: 10,
      }}
    />
  );
};

export default ImageLightbox;
