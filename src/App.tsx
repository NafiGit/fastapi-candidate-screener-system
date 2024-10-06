import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateUpload } from './components/CandidateUpload';
import { CandidateList } from './components/CandidateList';
import { InterviewSimulation } from './components/InterviewSimulation';
import { CandidateRanking } from './components/CandidateRanking';

function App() {
  const [candidates, setCandidates] = useState([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Candidate Screening System</h1>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList>
          <TabsTrigger value="upload">Upload Candidates</TabsTrigger>
          <TabsTrigger value="list">Candidate List</TabsTrigger>
          <TabsTrigger value="interview">Interview Simulation</TabsTrigger>
          <TabsTrigger value="ranking">Candidate Ranking</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <CandidateUpload onUpload={setCandidates} />
        </TabsContent>
        <TabsContent value="list">
          <CandidateList candidates={candidates} />
        </TabsContent>
        <TabsContent value="interview">
          <InterviewSimulation candidates={candidates} />
        </TabsContent>
        <TabsContent value="ranking">
          <CandidateRanking candidates={candidates} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;