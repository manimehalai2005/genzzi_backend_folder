'use client';

import { CertificationProviderCreateDialog } from '@/components/dashboard/CertificationProvider/CertificateCreateDialog';
import { CertificationProviderTable } from '@/components/dashboard/CertificationProvider/CertificateTable';
import { useCertificationProviders } from '@/hooks/useCertificationprovider';
import { Award, Loader2 } from 'lucide-react';

export default function CertificationProvidersPage() {
  const { data, isLoading, error } = useCertificationProviders();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading certification providers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-destructive/10 border border-destructive/20 rounded-2xl max-w-md mx-auto mt-12">
        <p className="text-destructive font-semibold">Error loading certification providers.</p>
        <p className="text-sm text-muted-foreground mt-1">Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  const providersList = data?.data || [];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-2xl border border-border/50 shadow-xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 brand-gradient opacity-5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange">
              <Award className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight brand-gradient-text">
              Certification Providers
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage master certification providers database and configurations for your application.
          </p>
        </div>
        <div className="relative z-10 w-full sm:w-auto">
          <CertificationProviderCreateDialog />
        </div>
      </div>

      <CertificationProviderTable providers={providersList} />
    </div>
  );
}