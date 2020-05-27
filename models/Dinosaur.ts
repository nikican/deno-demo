export interface Dinosaur {
  id: string;
  name: string;
  era: string;
  diet: string;
  regions: Region[];
  heigth: number;
  length: number;
  weigth: number;
}

type Region = "Asia" | "Europe" | "North America";
