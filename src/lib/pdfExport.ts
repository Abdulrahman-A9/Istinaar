"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

async function canvasFromElement(element: HTMLElement) {
  return html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });
}

function addCanvasToPdf(pdf: jsPDF, canvas: HTMLCanvasElement, title?: string) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageWidth = pageWidth - 20;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;
  const imageData = canvas.toDataURL("image/png");

  if (title) {
    pdf.setFontSize(16);
    pdf.text(title, pageWidth - 10, 12, { align: "right" });
  }

  let remainingHeight = imageHeight;
  let sourceY = 0;
  const firstPageOffset = title ? 20 : 10;
  const printableHeight = pageHeight - firstPageOffset - 10;

  if (remainingHeight <= printableHeight) {
    pdf.addImage(imageData, "PNG", 10, firstPageOffset, imageWidth, imageHeight);
    return;
  }

  const pageCanvas = document.createElement("canvas");
  const context = pageCanvas.getContext("2d");
  const pixelsPerPage = (canvas.width * printableHeight) / imageWidth;

  if (!context) {
    pdf.addImage(imageData, "PNG", 10, firstPageOffset, imageWidth, imageHeight);
    return;
  }

  pageCanvas.width = canvas.width;

  let pageIndex = 0;
  while (sourceY < canvas.height) {
    const sliceHeight = Math.min(pixelsPerPage, canvas.height - sourceY);
    pageCanvas.height = sliceHeight;
    context.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
    context.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);

    if (pageIndex > 0) {
      pdf.addPage();
    }

    const renderedHeight = (sliceHeight * imageWidth) / canvas.width;
    pdf.addImage(pageCanvas.toDataURL("image/png"), "PNG", 10, pageIndex === 0 ? firstPageOffset : 10, imageWidth, renderedHeight);
    sourceY += sliceHeight;
    remainingHeight -= printableHeight;
    pageIndex += 1;
  }
}

export async function exportSectionsToPdf(options: {
  fileName: string;
  sections: Array<{ element: HTMLElement | null; title?: string }>;
}) {
  const pdf = new jsPDF("p", "mm", "a4");
  let hasContent = false;

  for (const [index, section] of options.sections.entries()) {
    if (!section.element) {
      continue;
    }

    const canvas = await canvasFromElement(section.element);
    if (hasContent) {
      pdf.addPage();
    }

    addCanvasToPdf(pdf, canvas, section.title);
    hasContent = true;

    if (index === options.sections.length - 1) {
      break;
    }
  }

  if (hasContent) {
    pdf.save(options.fileName);
  }
}