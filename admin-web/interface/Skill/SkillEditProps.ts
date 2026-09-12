import { Skill } from "@/typess/Skill";

export interface SkillEditDialogProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}