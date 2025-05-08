using Microsoft.AspNetCore.Mvc;
using SE_Project.Models;

namespace SE_Project.Controllers
{
    [ApiController]
    public class QuestionsController : Controller
    {
        [HttpGet("/api/questions")]
        public IActionResult GetQuestions()
        {
            var questions = new List<Question>
            {
                new Question
                {
                    Id = 1,
                    Text = "Ce semnifică indicatorul STOP?",
                    Answers = new List<string> { "Oprire obligatorie", "Interzis", "Reducere viteză" },
                    CorrectAnswerIndex = 0
                },
                new Question
                {
                    Id = 2,
                    Text = "Care este limita de viteză în oraș?",
                    Answers = new List<string> { "50 km/h", "70 km/h", "90 km/h" },
                    CorrectAnswerIndex = 0
                }
            };

            return Json(questions);
        }

        [HttpPost("/api/answers")]
        public IActionResult SubmitAnswer([FromBody] AnswerSubmission answer)
        {
            Console.WriteLine($"Răspuns primit: Întrebare: {answer.QuestionId}, Index răspuns selectat: {answer.SelectedAnswerIndex}, Corect: {answer.IsCorrect}");
            return Ok(new { message = "Răspuns salvat" });
        }
    }
}
