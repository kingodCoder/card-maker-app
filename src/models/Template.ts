
export interface Template {
  id: string;
  name: string;
  canvasJSON: string;
  thumbnail: string; // Base64 image or URL
  createdAt: number;
  updatedAt?: number;
}
