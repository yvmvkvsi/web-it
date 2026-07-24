export interface WorkItem {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
}

// Collection records are added from approved project data. No records exist yet.
export const workItems: readonly WorkItem[] = [] as const;

export const getWorkItem = (slug: string) =>
  workItems.find((item) => item.slug === slug);
