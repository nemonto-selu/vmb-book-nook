import { useState } from "react";
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react";
import { toast } from "sonner";

// Set up the worker
// Set up the worker to match the API version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFReader = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('bookId');
  const autoFillUrl = bookId ? `/${bookId}.pdf` : "";
  
  const [pdfUrl, setPdfUrl] = useState(autoFillUrl);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string | null>(autoFillUrl || null);
  const [jumpPageInput, setJumpPageInput] = useState<string>("");

  // Auto-load PDF if bookId is provided
  React.useEffect(() => {
    if (autoFillUrl) {
      setLoading(true);
      toast.success("Loading book PDF...");
    }
  }, [autoFillUrl]);

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

  const loadSamplePDF = () => {
    const sample = "/sample.pdf";
    console.log("Loading sample PDF:", sample);
    setPdfUrl(sample);
    setLoading(true);
    setPdfFile(sample);
    setPageNumber(1);
    toast.success("Loading sample PDF...");
  };

  const downloadPDF = () => {
    if (!pdfFile) {
      toast.error("No PDF loaded to download");
      return;
    }
    
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = `document-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("PDF download started");
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("PDF loaded successfully with", numPages, "pages");
    setNumPages(numPages);
    setLoading(false);
    toast.success(`PDF loaded successfully! ${numPages} pages`);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
    // Keep pdfFile for retry/inspection and surface detailed message
    const msg = typeof error === 'string' ? error : error?.message || 'Unknown error';
    toast.error(`Failed to load PDF: ${msg}`);
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

  const jumpToPage = () => {
    const page = parseInt(jumpPageInput);
    if (isNaN(page) || page < 1 || page > numPages) {
      toast.error(`Please enter a valid page number (1-${numPages})`);
      return;
    }
    setPageNumber(page);
    setJumpPageInput("");
    toast.success(`Jumped to page ${page}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            VMB Reading Room
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read our books online
          </p>
        </div>

        <Card className="mb-8 invisible">
          <CardContent className="space-y-4 pt-6">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="Enter PDF URL..."
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="flex-1"
                readOnly={!!bookId}
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
                {/* Left side: Navigation and page jump */}
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
                  <Input
                    type="number"
                    placeholder="Page"
                    value={jumpPageInput}
                    onChange={(e) => setJumpPageInput(e.target.value)}
                    className="w-20 h-8 ml-4"
                    min="1"
                    max={numPages}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={jumpToPage}
                    disabled={!jumpPageInput.trim() || numPages === 0}
                  >
                    Go
                  </Button>
                </div>
                
                {/* Right side: Zoom and download */}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadPDF} 
                    disabled={!pdfFile}
                    aria-label="Download current PDF"
                    className="ml-4"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-8">
            <div className="min-h-[600px] bg-muted/30 rounded-lg flex items-center justify-center overflow-auto">
              {pdfFile ? (
                <div className="relative w-full flex justify-center">
                  {loading && (
                    <p className="absolute top-4 text-muted-foreground">Loading PDF...</p>
                  )}
                  <div className="pdf-container">
                    <Document
                      file={pdfFile}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      onLoadStart={onDocumentLoadStart}
                      loading={<div className="text-muted-foreground">Loading PDF...</div>}
                      error={<div className="text-destructive">Failed to load PDF</div>}
                    >
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-lg">
                  Enter a PDF URL above to start viewing
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFReader;