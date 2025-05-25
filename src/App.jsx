import React, { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [commentText, setCommentText] = useState('');
  const [userId] = useState('user-123'); // Replace with actual user context

  useEffect(() => {
    fetch("http://127.0.0.1:8000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));

    fetchResponses();
  }, []);

  const fetchResponses = () => {
    fetch("http://127.0.0.1:8000/responses")
      .then((res) => res.json())
      .then((data) => setResponses(data));
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newResponse, user_id: userId })
    })
      .then((res) => res.json())
      .then(() => {
        setNewResponse('');
        fetchResponses();
      });
  };

  const upvoteResponse = (id) => {
    fetch(`http://127.0.0.1:8000/responses/${id}/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Upvoted:", data);
        fetchResponses(); // optional: refresh
      });
  };

  const commentOnResponse = (id) => {
    fetch(`http://127.0.0.1:8000/responses/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentText, user_id: userId })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Comment created:", data);
        setCommentText('');
        fetchResponses();
      });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>AskHer</h1>

      <section>
        <h2>Questions</h2>
        <ul>
          {questions.map((q, idx) => (
            <li key={idx}>{q.content}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Responses</h2>
        {responses.map((r, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '0.5rem', margin: '1rem 0' }}>
            <p>{r.content}</p>
            <button onClick={() => upvoteResponse(r.id)}>Upvote</button>

            <div style={{ marginTop: '0.5rem' }}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={() => commentOnResponse(r.id)}>Comment</button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Submit a Response</h3>
        <form onSubmit={handleSubmitResponse}>
          <input
            type="text"
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Type your response"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default App;
