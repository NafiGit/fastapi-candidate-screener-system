import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios';

export function InterviewSimulation({ candidates }) {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSimulation = async () => {
    try {
      const result = await axios.post('http://localhost:8000/simulate-interview', {
        candidate_id: selectedCandidate,
        question: question,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error simulating interview:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="candidate-select">Select Candidate</Label>
        <Select onValueChange={setSelectedCandidate}>
          <SelectTrigger>
            <SelectValue placeholder="Select a candidate" />
          </SelectTrigger>
          <SelectContent>
            {candidates.map((candidate, index) => (
              <SelectItem key={index} value={candidate.id.toString()}>
                {candidate.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="question">Interview Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your interview question"
        />
      </div>
      <Button onClick={handleSimulation}>Simulate Response</Button>
      {response && (
        <div>
          <Label htmlFor="response">AI-Generated Response</Label>
          <Textarea id="response" value={response} readOnly />
        </div>
      )}
    </div>
  );
}