import InvestmentIntelligenceClient from "@/components/amanah/InvestmentIntelligenceClient";

type InvestmentIntelligencePageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function InvestmentIntelligencePage({
  searchParams,
}: InvestmentIntelligencePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return <InvestmentIntelligenceClient initialTab={resolvedSearchParams?.tab} />;
}
