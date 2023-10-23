import jsPDF from 'jspdf';


export const generatePDF = (blog) => {
  const doc = new jsPDF();

  // Set the right margin (for example, 10 mm)
  doc.setProperties({
    pageMargins: { top: 10, right: 10, bottom: 10, left: 10 },
  });

  const blogTitle = blog.title;
  const blogBody = blog.body;

  // Split the blog body into lines based on your content and layout needs
  const bodyLines = doc.splitTextToSize(
    blogBody,
    doc.internal.pageSize.width + 40
  );

    // Function to add content to the PDF
  const addContent = () => {
    let y = 30; // Initial vertical position
    const lineHeight = 5; // Adjust this as needed

    // Add the blog title
    doc.setFontSize(16);
    doc.text(blogTitle, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.text(blog.authorName, 10, y);
    y += 5;

    doc.setFontSize(12);
    doc.text(blog.time, 10, y);
    y += 10;

    // Add the blog body content
    bodyLines.forEach((line) => {
      if (y + lineHeight > doc.internal.pageSize.height - 30) {
        doc.addPage();
        y = 20;
    
      }
      doc.setFontSize(12); // Adjust the font size as needed
      doc.text(line, 10, y);
      y += lineHeight;
    });
  };

  // Add content to the PDF
  addContent();

  // Save the PDF
  doc.save('blog.pdf');
};
