using Xunit;
using SE_Project.Controllers;
using Microsoft.AspNetCore.Mvc;
using SE_Project.Models;
using System.Collections.Generic;

namespace QuizTest
{
    public class UnitTest1
    {
        [Fact] 
        public void GetQuestions_ReturnsListOfQuestions()
        {
            // Arrange
            var controller = new QuestionsController();

            // Act
            var result = controller.GetQuestions();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var questions = Assert.IsType<List<Question>>(jsonResult.Value);
            Assert.Equal(2, questions.Count); // Verifică dacă sunt 2 întrebări
        }

        [Fact] 
        public void SubmitAnswer_ReturnsOkResponse()
        {
            // Arrange
            var controller = new QuestionsController();
            var answer = new AnswerSubmission
            {
                QuestionId = 1,
                SelectedAnswerIndex = 0,
                IsCorrect = true
            };

            // Act
            var result = controller.SubmitAnswer(answer);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var message = (okResult.Value as dynamic)?.message;
            Assert.Equal("Răspuns salvat", message);
        }
    }
}
