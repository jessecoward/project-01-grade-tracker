import React, { useState } from 'react';

const gpaMap: { [key: string]: number } = {
  A: 4.0,
  B: 3.0,
  C: 2.0,
  D: 1.0,
  F: 0.0
};

const calculateGPA = (grades: string[]): number => {
  if (grades.length === 0) {
    return 0;
  }

  let total = 0;
  let totalCredits = 0;

  grades.forEach(grade => {
    const [letterGrade, creditHoursString] = grade && grade.split(" ") || [];

    if (!letterGrade || !creditHoursString) {
      return;
    }

    const creditHours = parseInt(creditHoursString, 10);
    if (isNaN(creditHours)) {
      return;
    }

    const gpa = gpaMap[letterGrade.toUpperCase()];
    if (gpa === undefined) {
      return;
    }

    total += gpa * creditHours;
    totalCredits += creditHours;
  });

  return total / totalCredits;
};

const HomePage = () => {
  const [grades, setGrades] = useState<string[]>([]);
  const [gpa, setGPA] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGrades(e.target.value.split(','));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGPA(calculateGPA(grades));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} />
        <button type="submit">Calculate GPA</button>
      </form>
      <p>GPA: {gpa}</p>
    </div>
  );
};

export default HomePage;
