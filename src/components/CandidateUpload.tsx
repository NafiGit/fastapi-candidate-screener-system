import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';

export function CandidateUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const { toast } = useToast()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpload(response.data);
      toast({
        title: "Success",
        description: "Candidates uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload candidates. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file">Upload Candidate Resumes (PDF, DOC, DOCX)</Label>
        <Input id="file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      </div>
      <Button onClick={handleUpload}>Upload and Process</Button>
    </div>
  );
}