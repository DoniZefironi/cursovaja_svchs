import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const Report = ({ userId }) => {
  const [selectedYear, setSelectedYear] = useState('');

  const fetchMethodsByYear = async (year) => {
    try {
      const response = await fetch(`/api/methods/all?year=${year}&userId=${userId}`);
      
      if (!response.ok) {
        console.error(`Ошибка: ${response.statusText}`);
        throw new Error(`Ошибка: ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log("Ответ от сервера: ", text);

      if (text.startsWith('<')) {
        console.error("Получен HTML вместо JSON:", text);
        throw new Error('Получен HTML вместо JSON');
      }

      const data = JSON.parse(text);
      return data.data; // Предполагая, что данные возвращаются в ключе 'data'
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      alert('Произошла ошибка при загрузке данных');
      return [];
    }
  };
  
  const generateReport = async () => {
    if (!selectedYear) {
      alert('Пожалуйста, выберите год для отчета');
      return;
    }

    const methods = await fetchMethodsByYear(selectedYear);
    console.log("Полученные методички: ", methods);

    if (!methods || methods.length === 0) {
      alert('Нет методичек за этот год');
      return;
    }

    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          children: [
            new TextRun('Отчет о методических рекомендациях'),
            new TextRun({
              text: `\nГод: ${selectedYear}`,
              bold: true,
            }),
          ],
        }),
      ],
    });

    methods.forEach((method) => {
      doc.addSection({
        children: [
          new Paragraph({
            children: [
              new TextRun(`Методичка: ${method.title}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`Описание: ${method.description || 'Нет описания'}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`Язык: ${method.language || 'Не указан'}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`Год создания: ${method.year_create || 'Не указан'}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`Дата выпуска: ${method.date_realese || 'Не указана'}`),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(`Количество страниц: ${method.quantity_pages || 'Не указано'}`),
            ],
          }),
        ],
      });
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Отчет_${selectedYear}.docx`;
    link.click();
  };

  return (
    <div>
      <div>
        <label>Выберите год: </label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Введите год"
        />
      </div>
      <Button onClick={generateReport}>Создать отчет</Button>
    </div>
  );
};

export default Report;
