import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function CandidateList({ candidates }) {
  return (
    <Table>
      <TableCaption>List of Processed Candidates</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Skills</TableHead>
          <TableHead>Experience</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate, index) => (
          <TableRow key={index}>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate.email}</TableCell>
            <TableCell>{candidate.skills.join(', ')}</TableCell>
            <TableCell>{candidate.experience} years</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}