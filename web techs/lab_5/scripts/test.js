const questions = Array(10)
  .fill({})
  .map(() => ({ answers: Array(3).fill('') }));

questions.map((question, questionIndex) => {
  let qusetionHtml = `
		<li class="list-group-item">
			<h4>Question #${questionIndex + 1}</h4>
			<ul class="list-group list-group-flush">
	`;

  question.answers.map((_, answerIndex) => {
    qusetionHtml += `
			<li class="list-group-item">
				<div class="custom-control custom-radio">
					<input
						onchange="answerQusetion(${questionIndex}, ${answerIndex})"
						type="radio" id="answer-${questionIndex}-${answerIndex}"
						class="custom-control-input"
						name="question-block-${questionIndex}"
					>
					<label class="custom-control-label" for="answer-${questionIndex}-${answerIndex}">
						Answer #${answerIndex + 1} for question #${questionIndex + 1}
					</label>
				</div>
			</li>
		`;
  });

  qusetionHtml += `
			</ul>
		</li>
	`;

  document.querySelector('#questions-container').innerHTML += qusetionHtml;
});

const answerQusetion = (questionIndex, answerIndex) => {
  questions[questionIndex].answers = Array(3).fill('');
  questions[questionIndex].answers[answerIndex] = answerIndex;
};

const calculate = () => {
  const result = questions.reduce(
    (acc, { answers }) =>
      acc + answers.reduce((acc, value) => acc + parseInt(value | 0), 0),
    0
  );
  document.querySelector('#result').innerHTML = `Result: ${result}`;
};

const clearResult = () => {
  [...document.querySelectorAll('[type="radio"]')].map((el) => {
    el.checked = false;
  });
  document.querySelector('#result').innerHTML = `Result`;
};
