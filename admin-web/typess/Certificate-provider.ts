import { CertificationProvider } from '@/app/api/CertificationProviderApi';



export interface CertificationProviderTableProps {
  providers: CertificationProvider[];
}
export interface CertificationProviderEditDialogProps {
  provider: CertificationProvider | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}