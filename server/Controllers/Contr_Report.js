const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabun.ttf",
    bold: "THSarabun Bold.ttf",
    italics: "THSarabun Italic.ttf",
    bolditalics: "THSarabun Bold Italic.ttf",
  },
};

exports.generatePdfPath1 = async (req, res) => {
  try {

    const documentDefinition = {
      content: [{ text: "ดีค่าบ", style: "header" }],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          font: "THSarabunNew",
        },
      },
      defaultStyle: {
        font: "THSarabunNew",
      },
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);

    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="path1.pdf"',
      });
      const download = Buffer.from(data.toString("utf-8"), "base64");
      res.end(download);
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error generating PDF", error: err.message });
  }
};
