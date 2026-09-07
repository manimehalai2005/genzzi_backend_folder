import { Skill } from "@/app/api/SkillApi";


export interface SkillEditDialogProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface SkillTableProps {
  skills: Skill[];
}