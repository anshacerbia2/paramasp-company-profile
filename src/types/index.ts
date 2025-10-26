export type MetaProps = {
  params: Promise<{ locale: string }>;
};

export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export type PageProps = {
  params: Promise<{ locale: string }>;
};

export type NewsPageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
};
