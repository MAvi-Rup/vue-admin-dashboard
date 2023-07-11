const printQrCodeValue = (qrCodeDataURL, iframe) => {
  const printDocument = `
    <html>
      <head>
        <style>
          @media print {
            .qr-code {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            p {
              text-align: center;
            }
          }
        </style>
      </head>
      <body>
        <div class="qr-code">
          <div>
            <h1>Virgo Tobacco</h1>
            <p>Tracking Code</p>
            <img src="${qrCodeDataURL}" alt="QR Code" style="width: 200px; height: 200px;">
          </div>
        </div>
      </body>
    </html>
  `;

  const printWindow = iframe.contentWindow || iframe.contentDocument.defaultView;
  printWindow.document.open();
  printWindow.document.write(printDocument);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.print();
  };
};

export default printQrCodeValue;
