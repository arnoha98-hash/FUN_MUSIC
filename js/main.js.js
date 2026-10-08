// Interactive Quiz Checking Script
function checkAnswer(buttonElement, selectedOption) {
  const quizCard = buttonElement.closest('.quiz-card');
  const correctAnswer = parseInt(quizCard.getAttribute('data-correct'));
  const feedbackDiv = quizCard.querySelector('.quiz-feedback');
  const allOptions = quizCard.querySelectorAll('.quiz-option');

  // Disable buttons after answer
  allOptions.forEach(btn => btn.style.pointerEvents = 'none');

  if (selectedOption === correctAnswer) {
    buttonElement.classList.add('correct');
    feedbackDiv.style.color = '#06D6A0';
    feedbackDiv.innerHTML = '🎉 إجابة صحيحة! أحسنت يا بطل!';
  } else {
    buttonElement.classList.add('wrong');
    feedbackDiv.style.color = '#FF6B6B';
    feedbackDiv.innerHTML = '❌ حاول مرة أخرى في المرة القادمة!';
    
    // Highlight correct answer
    allOptions[correctAnswer - 1].classList.add('correct');
  }
}

// Collapsible Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
  const unitHeaders = document.querySelectorAll('.unit-header');
  
  unitHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const lessonList = header.nextElementSibling;
      if (lessonList.style.display === 'none') {
        lessonList.style.display = 'grid';
      } else {
        lessonList.style.display = 'none';
      }
    });
  });
});