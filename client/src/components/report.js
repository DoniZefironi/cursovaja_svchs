import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const Report = ({ userId }) => {
  const [selectedYear, setSelectedYear] = useState('');

  // Функция для получения методичек за выбранный год с сервера
  const fetchMethodsByYear = async (year) => {
    try {
      const response = await fetch(`/api/method?year=${year}&userId=${userId}`);
      
      // Проверяем статус ответа
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }
    
      const text = await response.text();  // Получаем ответ как текст
      console.log("Ответ от сервера: ", text);  // Логируем ответ в консоль
    
      // Если ответ является JSON, пытаемся его распарсить
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        console.error("Ошибка при парсинге JSON: ", error);
        throw new Error('Ответ не является корректным JSON');
      }
    
      return data;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      alert('Произошла ошибка при загрузке данных');
      return []; // Возвращаем пустой массив в случае ошибки
    }
  };
  
  // Функция для генерации отчета в формате docx
  const generateReport = async () => {
    if (!selectedYear) {
      alert('Пожалуйста, выберите год для отчета');
      return;
    }

    // Получаем методички за выбранный год
    const methods = await fetchMethodsByYear(selectedYear);
    
    if (!methods || methods.length === 0) {
      alert('Нет методичек за этот год');
      return;
    }

    // Создаем новый документ
    const doc = new Document();

    // Добавляем заголовок
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

    // Добавляем методички
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

    // Генерируем файл и скачиваем его
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
