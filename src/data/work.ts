export interface WorkItem {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export const workItems: readonly WorkItem[] = [
  {
    slug: "example-one",
    title: "Example project one",
    summary: "Replace this record with verified project content.",
    image: "/media/placeholder-landscape.svg",
    imageAlt: "Neutral placeholder for example project one",
  },
  {
    slug: "example-two",
    title: "Example project two",
    summary: "Keep content in data modules instead of hard-coding it into layouts.",
    image: "/media/placeholder-landscape.svg",
    imageAlt: "Neutral placeholder for example project two",
  },
] as const;

export const getWorkItem = (slug: string) =>
  workItems.find((item) => item.slug === slug);
