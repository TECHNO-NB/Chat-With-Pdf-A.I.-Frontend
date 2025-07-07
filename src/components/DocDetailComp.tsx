"use client";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "./ui/button";
import { useResizeDetector } from "react-resize-detector";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface IDocType {
  doc: File | string;
  size: boolean;
}

const DocDetailComp: React.FC<IDocType> = ({ doc, size }) => {
  const [numPages, setNumPages] = useState<number | null | undefined>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handlePrev = (): void => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleNext = (): void => {
    // @ts-ignore
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const { width, ref } = useResizeDetector();
  return (
    <div className="w-full h-full bg-white rounded-md shadow flex flex-col items-center">
      {!size ? (
        <div className="h-10 w-full border-b border-zinc-200 flex items-center justify-between px-2 sticky top-0 z-10 bg-white border-t ">
          Page {pageNumber} of {numPages}
          <div className="flex gap-2">
            <Button className="h-6" onClick={handlePrev}>
              Prev
            </Button>
            <Button className="h-6" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      ) : null}
      <div ref={ref} className=" flex items-center justify-center">
        <Document
          onLoadError={() => {
            <p>Pdf not load</p>;
          }}
          className=""
          file={doc}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page width={400} renderMode="canvas" pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default DocDetailComp;
