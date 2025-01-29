import React, { useState } from 'react';

const QuestionSelector = ({ subjects, onSelect }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Subjects */}
      <div className="flex flex-wrap gap-3">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setSelectedSubject(subject);
              setSelectedQuestion(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedSubject?.id === subject.id
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              } border border-transparent hover:border-gray-200`}
          >
            {subject.name}
          </button>
        ))}
      </div>

      {/* Questions */}
      {selectedSubject && (
        <div className="pl-2 space-y-2 animate-slideIn">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Select Question:</h3>
          <div className="flex flex-wrap gap-3">
            {selectedSubject.questions.map((question) => (
              <button
                key={question.id}
                onClick={() => setSelectedQuestion(question)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200
                  ${selectedQuestion?.id === question.id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  } border border-transparent hover:border-gray-200`}
              >
                {question.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subparts */}
      {selectedQuestion && (
        <div className="pl-4 space-y-2 animate-slideIn">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Select Subpart:</h3>
          <div className="flex flex-wrap gap-3">
            {selectedQuestion.subparts.map((subpart) => (
              <button
                key={subpart.id}
                onClick={() => onSelect(subpart)}
                className="px-4 py-2 rounded-lg text-sm bg-gray-50 text-gray-700
                         hover:bg-gray-100 transition-all duration-200
                         border border-transparent hover:border-gray-200"
              >
                {subpart.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionSelector;
