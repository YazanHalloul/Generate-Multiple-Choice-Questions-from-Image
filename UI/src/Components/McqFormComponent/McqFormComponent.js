import React from "react";

const McqFormComponent = ({ mcq, handleChange, handleSubmit, buttonText }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.question}
          onChange={(e) => handleChange(e, "question")}
          placeholder="Question"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.option_1}
          onChange={(e) => handleChange(e, "option_1")}
          placeholder="Option 1"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.option_2}
          onChange={(e) => handleChange(e, "option_2")}
          placeholder="Option 2"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.option_3}
          onChange={(e) => handleChange(e, "option_3")}
          placeholder="Option 3"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.option_4}
          onChange={(e) => handleChange(e, "option_4")}
          placeholder="Option 4"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <input
          type="text"
          value={mcq.correct_answer}
          onChange={(e) => handleChange(e, "correct_answer")}
          placeholder="Correct Answer"
          required
        />
      </div>
      <div className="question-edit-create-input">
        <select
          id="cars"
          value={mcq.Difficulty_Level}
          onChange={(e) => handleChange(e, "Difficulty_Level")}
          required
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="question-edit-create-input">
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
};

export default McqFormComponent;
