import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';

// Configure le worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default defineNuxtPlugin(() => {
    return {
        provide: {
            pdfjs: pdfjsLib
        }
    }
});
