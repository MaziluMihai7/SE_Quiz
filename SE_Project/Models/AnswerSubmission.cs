namespace SE_Project.Models
{
    public class AnswerSubmission
    {
        public int QuestionId { get; set; }
        public int SelectedAnswerIndex { get; set; }
        public bool IsCorrect { get; set; }
    }
}
