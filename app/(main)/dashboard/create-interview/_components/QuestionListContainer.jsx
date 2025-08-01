import React from "react";

function QuestionListContainer({ questionList }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-5">Generated Interview Questions</h2>
      <div className="p-5 border border-gray-300 rounded-xl bg-white">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded-xl mb-3"
          >
            <h2 className="font-semibold ">{item.question}</h2>
            <h2 className="text-sm mt-1 text-[#2d24d0]">Type: {item?.type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
