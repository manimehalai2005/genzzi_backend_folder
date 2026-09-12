import { CertificationProvider } from "@/typess/Certificate-provider";

export interface CertificationProviderEditDialogProps {
  provider: CertificationProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
