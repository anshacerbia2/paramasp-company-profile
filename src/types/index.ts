export type PageProps = {
  params: Promise<{ locale: string }>;
};

export type NewsPageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
};
