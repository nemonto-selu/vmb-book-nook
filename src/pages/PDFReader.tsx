import { useState } from "react";
import * as React from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFReader = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  // Debug when pdfFile changes
  React.useEffect(() => {
    console.log("pdfFile state changed to:", pdfFile);
  }, [pdfFile]);

  const handleLoadPDF = () => {
    console.log("handleLoadPDF called with URL:", pdfUrl);
    if (!pdfUrl.trim()) {
      toast.error("Please enter a valid PDF URL");
      return;
    }
    setLoading(true);
    setPdfFile(pdfUrl);
    setPageNumber(1);
    toast.success("Loading PDF...");
    console.log("PDF file set to:", pdfUrl);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("PDF loaded successfully with", numPages, "pages");
    setNumPages(numPages);
    setLoading(false);
    toast.success(`PDF loaded successfully! ${numPages} pages`);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
    // Don't reset pdfFile on error - keep it for retry
    toast.error("Failed to load PDF. Please check the URL and try again.");
  };

  const onDocumentLoadStart = () => {
    console.log("Document loading started");
  };

  const goToPrevPage = () => {
    setPageNumber(page => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setPageNumber(page => Math.min(numPages, page + 1));
  };

  const zoomIn = () => {
    setScale(scale => Math.min(3, scale + 0.2));
  };

  const zoomOut = () => {
    setScale(scale => Math.max(0.5, scale - 0.2));
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            PDF Reader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload or enter a PDF URL to read documents online
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Load PDF Document</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="Enter PDF URL..."
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleLoadPDF} className="bg-primary hover:bg-primary/90">
                Load PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {pdfFile && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pageNumber} of {numPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-8">
            <div className="min-h-[600px] bg-muted/30 rounded-lg flex items-center justify-center overflow-auto">
              {(() => {
                console.log("Render state - loading:", loading, "pdfFile:", pdfFile);
                if (loading) {
                  return <p className="text-muted-foreground text-lg">Loading PDF...</p>;
                } else if (pdfFile) {
                  console.log("About to render Document component with file:", pdfFile);
                  return (
                    <div className="pdf-container">
                      <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        onLoadStart={onDocumentLoadStart}
                        loading={<div className="text-muted-foreground">Loading PDF...</div>}
                        error={<div className="text-red-500">Failed to load PDF</div>}
                      >
                        <Page
                          pageNumber={pageNumber}
                          scale={scale}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>
                  );
                } else {
                  return (
                    <p className="text-muted-foreground text-lg">
                      Enter a PDF URL above to start viewing
                    </p>
                  );
                }
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFReader;