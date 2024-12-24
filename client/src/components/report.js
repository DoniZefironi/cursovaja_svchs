import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Context } from '../index';

const Report = observer(() => {
  const { author, specialityMethod, method } = useContext(Context);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [users, setUsers] = useState([]);
  const [methods, setMethods] = useState([]);
  const [userMethodologicals, setUserMethodologicals] = useState([]);
  const [specialityMethodologicals, setSpecialityMethodologicals] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        await specialityMethod.fetchSpecialities();
        setSpecialities(specialityMethod.specialities);
        console.log('Fetched Specialities:', specialityMethod.specialities);
      } catch (error) {
        console.error('Ошибка при получении специальностей:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        await author.fetchUsers();
        setUsers(author.users);
        console.log('Fetched Users:', author.users);
      } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
      }
    };

    const fetchMethods = async () => {
      try {
        await method.fetchMethods();
        setMethods(method.methods);
        console.log('Fetched Methods:', method.methods);
      } catch (error) {
        console.error('Ошибка при получении методичек:', error);
      }
    };

    const fetchUserMethodologicals = async () => {
      try {
        const response = await method.fetchUserMethodologicals();
        setUserMethodologicals(response);
        console.log('Fetched User Methodologicals:', response);
      } catch (error) {
        console.error('Ошибка при получении методических рекомендаций пользователей:', error);
      }
    };

    const fetchSpecialityMethodologicals = async () => {
      try {
        const response = await specialityMethod.fetchSpecialityMethodologicals();
        setSpecialityMethodologicals(response);
        console.log('Fetched Speciality Methodologicals:', response);
      } catch (error) {
        console.error('Ошибка при получении методических рекомендаций специальностей:', error);
      }
    };

    fetchSpecialities();
    fetchUsers();
    fetchMethods();
    fetchUserMethodologicals();
    fetchSpecialityMethodologicals();
  }, [specialityMethod, author, method]);

  const generateReport = async () => {
    if (!methods.length) {
      alert('Нет методичек по выбранным критериям');
      return;
    }

    const selectedSpecialityObj = specialities.find(spec => spec.id === Number(selectedSpeciality));
    const selectedAuthorObj = users.find(user => user.id === Number(selectedAuthor));

    console.log('Selected Year:', selectedYear);
    console.log('Selected Speciality:', selectedSpecialityObj);
    console.log('Selected Author:', selectedAuthorObj);
    console.log('Methods:', methods);
    console.log('User Methodologicals:', userMethodologicals);
    console.log('Speciality Methodologicals:', specialityMethodologicals);

    const filteredMethods = methods.filter(m => {
      return (!selectedYear || m.year_create === Number(selectedYear)) &&
             (!selectedSpeciality || (m.specialities && m.specialities.some(spec => spec.id === Number(selectedSpeciality)))) &&
             (!selectedAuthor || (m.authors && m.authors.some(author => author.id === Number(selectedAuthor))));
    });

    const filteredUserMethodologicals = userMethodologicals.filter(um => {
      return (!selectedYear || (um.methodological_rec && um.methodological_rec.year_create === Number(selectedYear))) &&
             (!selectedAuthor || um.userId === Number(selectedAuthor));
    });

    const filteredSpecialityMethodologicals = specialityMethodologicals.filter(sm => {
      return (!selectedYear || (sm.methodological_rec && sm.methodological_rec.year_create === Number(selectedYear))) &&
             (!selectedSpeciality || sm.specialityId === Number(selectedSpeciality));
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Пример отчета'),
                new TextRun({
                  text: `\nФильтры: Год: ${selectedYear || 'Все'}, Специальность: ${selectedSpecialityObj ? `${selectedSpecialityObj.code} - ${selectedSpecialityObj.qualification}` : 'Все'}, Автор: ${selectedAuthorObj ? `${selectedAuthorObj.name} ${selectedAuthorObj.surname}` : 'Все'}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: 'Это тестовый абзац.',
            }),
            ...filteredMethods.map(m => new Paragraph({
              text: `${m.title || 'Без названия'} - ${m.description || 'Нет описания'}`,
            })),
            new Paragraph({
              text: 'Методические рекомендации пользователей:',
              bold: true,
            }),
            ...filteredUserMethodologicals.map(um => {
              const title = um.methodological_rec && um.methodological_rec.title ? um.methodological_rec.title : 'Без названия';
              const description = um.methodological_rec && um.methodological_rec.description ? um.methodological_rec.description : 'Нет описания';
              const author = um.user && um.user.name && um.user.surname ? `${um.user.name} ${um.user.surname}` : 'Не указан';
              console.log('User Methodological:', { title, description, author });
              return new Paragraph({
                text: `${title} - ${description} (${author})`,
              });
            }),
            new Paragraph({
              text: 'Методические рекомендации специальностей:',
              bold: true,
            }),
            ...filteredSpecialityMethodologicals.map(sm => {
              const title = sm.methodological_rec && sm.methodological_rec.title ? sm.methodological_rec.title : 'Без названия';
              const description = sm.methodological_rec && sm.methodological_rec.description ? sm.methodological_rec.description : 'Нет описания';
              const code = sm.speciality && sm.speciality.code ? sm.speciality.code : 'Код отсутствует';
              const speciality = sm.speciality && sm.speciality.qualification ? sm.speciality.qualification : 'Не указана';
              console.log('Speciality Methodological:', { title, description, code, speciality });
              return new Paragraph({
                text: `${code} - ${speciality}: ${title} - ${description}`,
              });
            }),
          ],
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Отчет_${selectedYear || 'все'}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Ошибка при генерации отчета:', error);
    }
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
      <div>
        <label>Выберите специальность: </label>
        <select value={selectedSpeciality} onChange={(e) => setSelectedSpeciality(e.target.value)}>
          <option value="">Выберите специальность</option>
          {specialities && specialities.map(spec => (
            <option key={spec.id} value={spec.id}>{spec.qualification}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Выберите автора: </label>
        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">Выберите автора</option>
          {users && users.map(author => (
            <option key={author.id} value={author.id}>{author.name} {author.surname}</option>
          ))}
        </select>
      </div>
      <Button onClick={generateReport}>Создать отчет</Button>
    </div>
  );
});

export default Report;
