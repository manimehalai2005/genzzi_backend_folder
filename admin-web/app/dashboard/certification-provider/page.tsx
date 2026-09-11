'use client';

import { Award, AlertCircle, Loader2,} from 'lucide-react';
import { CertificationProviderCreateDialog } from '@/components/dashboard/CertificationProvider/CertificateCreateDialog';
import { CertificationProviderTable } from '@/components/dashboard/CertificationProvider/CertificateTable';
import { useCertificationProviders } from '@/hooks/useCertificationprovider';
export default function CertificationProviderPage() {
  const { data, isLoading, error,} = useCertificationProviders();

  const providers = Array.isArray(data) ? data : Array.isArray((data as any)?.data)   ? (data as any).data: Array.isArray((data as any)?.data?.data)
        ? (data as any).data.data
        : Array.isArray((data as any)?.providers)
          ? (data as any).providers
          : [];
  return (
    <div className=" mx-auto max-w-7xl space-y-6 p-4 sm:space-y-8 sm:p-8 " >
      <div  className=" relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl borde border-fuchsia-500/20 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10  to-brand-orange/10  p-6  shadow-2xl  backdrop-blur-2xl  sm:flex-row  sm:items-center  sm:p-8 " >
        <div className="   pointer-events-none   absolute   -right-24   -top-24   h-48   w-48   rounded-full   bg-fuchsia-500/20   blur-3xl " />
        <div className="?   pointer-events-none   absolute   -bottom-24   -left-24   h-48   w-48   rounded-full   bg-brand-orange/20   blur-3xl" />
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <Award className="   h-6   w-6   text-brand-orange "/>
            <h1 className="   bg-gradient-to-r from-foreground via-fuchsia-400 to-brand-orange bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl " >
              Certification Providers
            </h1>
          </div>
          <p className=" max-w-md text-xs font-medium text-muted-foreground sm:text-sm " >
            Manage certification providers, affiliations,
            websites, codes, and status in one streamlined flow.
          </p>
        </div>

        <div className="relative z-10 w-full sm:w-auto">
          <CertificationProviderCreateDialog />
        </div>
      </div>


      {isLoading && (
        <div className="   flex   flex-col   items-center   justify-center   gap-3   rounded-3xl   border   border-fuchsia-500/20   bg-card/40 py-24 shadow-xl backdrop-blur-xl">
          <Loader2 className="   h-8  w-8  animate-spin  text-fuchsia-500  " />
          <p className="  text-sm  font-black  bg-gradient-to-r  from-fuchsia-500  to-brand-orange  bg-clip-tex  text-transparent">
            Loading certification providers...
          </p>
        </div>
      )}
      {error && (
        <div className="  flex  items-center  gap-3  rounded-3xl  border  border-rose-500/30  bg-rose-500/10  p-5  text-rose-500  shadow-xl  backdrop-blur-xl  ">
          <AlertCircle className="  h-6  w-6  shrink-0  animate-bounce "  />
          <div>
            <p className="text-sm font-black">
              Failed to load certification providers
            </p>
            <p className="mt-0.5 text-xs opacity-90">
              Please refresh and try again.
            </p>

          </div>

        </div>
      )}

      {!isLoading && !error && (
        <CertificationProviderTable
          providers={providers}
        />
      )}

    </div>
  );
}