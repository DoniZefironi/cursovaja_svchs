import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";
import axios from 'axios';

const Report = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [methodologicals, setMethodologicals] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    console.log("Fetching report for User ID:", userId); // Логируем userId

    const fetchUserReport = async () => {
      try {
        const response = await axios.get(`/api/report/${userId}`);
        setUser(response.data.user);
        setMethodologicals(response.data.methodologicals);
      } catch (error) {
        console.error("Error fetching user report:", error);
      }
    };

    fetchUserReport();
  }, [userId]);

  const generatePDF = () => {
    if (!user || !methodologicals.length) return;

    const pdfDoc = new jsPDF();
    pdfDoc.setFont("times", "bold");
    pdfDoc.setFontSize(14);
    const formattedDate = new Date().toLocaleDateString();

    pdfDoc.text(`User Report. Date: ${formattedDate}`, 10, 10);
    pdfDoc.text(`Name: ${user.name} ${user.surname}`, 10, 20);

    const columns = ["Methodological ID", "Title"];
    const rows = methodologicals.map(item => [item.methodologicalId, item.title]);

    autoTable(pdfDoc, {
      theme: "grid",
      head: [columns],
      body: rows,
      startY: 40,
    });

    pdfDoc.save("UserReport.pdf");
  };

  return (
    <div className="report-section mt-3">
      <h5>Отчет</h5>
      <Button variant="light" className="download-button" onClick={generatePDF}>Скачать</Button>
    </div>
  );
};

export default Report;
