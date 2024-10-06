import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function CandidateRanking({ candidates }) {
  const [rankedCandidates, setRankedCandidates] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.post('http://localhost:8000/rank-candidates', { candidates });
        setRankedCandidates(response.data.ranked_candidates);
      } catch (error) {
        console.error('Error fetching candidate ranking:', error);
      }
    };

    if (candidates.length > 0) {
      fetchRanking();
    }
  }, [candidates]);

  return (
    <Table>
      <TableCaption>Ranked Candidates</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Match Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rankedCandidates.map((candidate, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate.score.toFixed(2)}</TableCell>
            <TableCell>
              <Progress value={candidate.score} className="w-[60%]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}