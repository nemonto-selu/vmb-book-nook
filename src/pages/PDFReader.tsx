import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PDFReader = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const handleLoadPDF = () => {
    // PDF loading logic would go here
    console.log("Loading PDF:", pdfUrl);
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

        <Card>
          <CardContent className="p-8">
            <div className="min-h-[600px] bg-muted/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground text-lg">
                PDF viewer will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFReader;