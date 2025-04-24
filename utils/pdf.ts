// import {getDocument} from "pdfjs-dist";

/**
 * Download a PDF file and return it as a Blob.
 * @param src - The URL of the PDF file to download.
 * @returns {Promise<Blob>} - A promise that resolves to the Blob of the downloaded PDF.
 */
export const downloadPdf = (src: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
        if (xhr.status === 200) {
            resolve(xhr.response);
        } else {
            reject(new Error(`Failed to download PDF: ${xhr.statusText}`));
        }
        };
        xhr.onerror = () => {
        reject(new Error('Network error while downloading PDF'));
        };
        xhr.send();
    });
}

/**
 * Convert a PDF file to an array of PNG images.
 * @param pdfBuffer - The PDF file as a Buffer.
 * @param options - Options for the conversion, including width, height, and viewport scale.
 * @return {Promise<string[]>} - A promise that resolves to an array of base64-encoded PNG images.
 */
// const pdfToPng = async (pdfBuffer: Buffer, options: {
//     width: number,
//     height: number,
//     viewportScale: number;
// }): Promise<string[]> => {
//     const loadingTask = getDocument({ data: new Uint8Array(pdfBuffer) });
//     const pdf = await loadingTask.promise;
//
//     const base64Images: string[] = [];
//     const scale = options.viewportScale;
//
//     for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
//         const pageData = await pdf.getPage(pageNumber);
//         const viewport = pageData.getViewport({ scale });
//
//         const canvas = createCanvas(viewport.width, viewport.height);
//         const context = canvas.getContext('2d');
//
//         const renderContext: RenderParameters = {
//             canvasContext: context as unknown as CanvasRenderingContext2D,
//             // transform: scale !== 1 ? [scale, 0, 0, scale, 0, 0] : null,
//             viewport: viewport,
//         };
//
//         await pageData.render(renderContext).promise;
//
//         const dataUrl = canvas.toDataURL('image/png');
//         base64Images.push(dataUrl);
//     }
//
//     return base64Images;
// };