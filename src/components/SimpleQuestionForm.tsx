import { useState } from 'react';

interface SimpleQuestionFormProps {
  onSubmit?: (response: any, question: string) => void;
}

const SimpleQuestionForm = ({ onSubmit }: SimpleQuestionFormProps) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'ef02a2e7-dd66-477e-b1ec-5413f7c58e7a',
          content: question.trim(),
          tone: 'advice' as const // explicitly type as one of the allowed values
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit question');
      }

      const data = await response.json();
      console.log('Backend response:', data);
      console.log('Response:', data);
      
      // Clear the input
      setQuestion('');
      
      // Call the onSubmit callback if provided
      if (onSubmit) {
        onSubmit(data, question);
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      setError(error instanceof Error ? error.message : 'Failed to submit question');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
          disabled={isLoading}
        />
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : 'AskHer'}
        </button>
      </div>
    </form>
  );
};

export default SimpleQuestionForm; 