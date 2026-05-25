import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import FormulaInfo from '../../components/calculator/FormulaInfo';

const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0,
};

export default function GPACalculator() {
  const [courses, setCourses] = useState([
    { name: 'Course 1', credits: '3', grade: 'A' },
    { name: 'Course 2', credits: '3', grade: 'B+' },
    { name: 'Course 3', credits: '4', grade: 'A-' },
  ]);
  const [gpa, setGpa] = useState(null);

  const update = (i, field, val) => setCourses(prev => prev.map((c, idx) => idx === i ? { ...c, [field]: val } : c));
  const addCourse = () => setCourses(prev => [...prev, { name: `Course ${prev.length + 1}`, credits: '3', grade: 'A' }]);
  const removeCourse = (i) => setCourses(prev => prev.filter((_, idx) => idx !== i));

  const calculate = () => {
    const valid = courses.filter(c => c.credits && c.grade);
    const totalCredits = valid.reduce((s, c) => s + Number(c.credits), 0);
    const totalPoints = valid.reduce((s, c) => s + (GRADE_POINTS[c.grade] || 0) * Number(c.credits), 0);
    setGpa(totalCredits ? totalPoints / totalCredits : 0);
  };

  const gpaColor = gpa === null ? '' : gpa >= 3.5 ? 'text-green-500' : gpa >= 3.0 ? 'text-blue-500' : gpa >= 2.0 ? 'text-yellow-500' : 'text-red-500';

  return (
    <PageWrapper>
      <CalculatorLayout title="GPA Calculator" description="Calculate your Grade Point Average from course grades." category="other">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-xs font-medium text-on-surface-muted">Course name</span>
            <span className="text-xs font-medium text-on-surface-muted">Credits</span>
            <span className="text-xs font-medium text-on-surface-muted">Grade</span>
          </div>
          <AnimatePresence>
            {courses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <input value={c.name} onChange={e => update(i, 'name', e.target.value)} className="calc-input text-sm" />
                <input type="number" value={c.credits} onChange={e => update(i, 'credits', e.target.value)} min="1" max="6" className="calc-input text-sm" />
                <div className="flex gap-1">
                  <select value={c.grade} onChange={e => update(i, 'grade', e.target.value)} className="calc-input text-sm flex-1">
                    {Object.keys(GRADE_POINTS).map(g => <option key={g}>{g}</option>)}
                  </select>
                  <button onClick={() => removeCourse(i)} className="px-2 text-red-400 hover:text-red-600 text-lg">×</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={addCourse} size="sm">+ Add course</Button>
            <Button onClick={calculate}>Calculate GPA</Button>
          </div>
          <ResultCard show={gpa !== null}>
            <div className="text-center py-2">
              <div className={`text-5xl font-bold font-mono ${gpaColor}`}>{gpa?.toFixed(2)}</div>
              <div className="text-on-surface-muted text-sm mt-2">out of 4.0</div>
            </div>
          </ResultCard>
        </div>
        <FormulaInfo>
          <p>GPA = Σ(grade points × credits) / Σ(credits)</p>
          <p className="mt-1 text-xs">A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, etc.</p>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
