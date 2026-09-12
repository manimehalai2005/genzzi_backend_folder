import { Skill } from "@/typess/Skill";

export interface SkillTableProps {
  data: Skill[];
  isLoading?: boolean;
  onEdit?: (skill: Skill) => void;  
  onDelete?: (id: string) => void;   
}