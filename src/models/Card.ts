
export interface Card {
  id: string;
  templateId: string;
  canvasJSON: string;
  studentData?: any; // To be defined based on actual student data structure
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number; // For trash functionality
}
