namespace SE_Project.Models
{
    public class Question
    {
        public int Id { get; set; }
        public required string Text { get; set; }
        public List<string> Answers { get; set; } = new List<string>();
        public int CorrectAnswerIndex { get; set; }
    }
}
