import { useState } from "react";

interface FileWithPreview extends File {
    preview: string;
}

const useFileUpload = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const handleFilesAdded = (acceptedFiles: File[]) => {
        const mappedFiles = acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
    };


    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };


    const closeLightbox = () => setLightboxOpen(false);

    return {
        files,
        lightboxOpen,
        currentImageIndex,
        handleFilesAdded,
        removeFile,
        openLightbox,
        closeLightbox,
        setCurrentImageIndex,
    };
};

export default useFileUpload;
