const QuizSelectEntity = () => {

  const quizId: number = 0; // Placeholder value, used to identify the quiz

  /**
   * When the element is clicked, this function is triggered 
   * to redirect the user to the quiz.
   */ 
  const redirectToQuiz = () => {
    window.location.href = `/quiz/${quizId}`;
  }

  /**
   * Returning an selectable quiz entity   
   */ 
  return (
    <div className="quiz-select-entity" onClick={() => redirectToQuiz()}>
      <h2 className="quiz-select-entity-title"></h2>
      <p className="quiz-select-entity-description"></p>
      <h4 className="quiz-select-entity-language"></h4>
    </div>
  )
}

export default QuizSelectEntity;
