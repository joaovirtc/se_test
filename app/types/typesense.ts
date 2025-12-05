interface Artifact {
  id: number;
  title: string;
  source: string;
  media: {
    id: string;
    url: string;
    name: string;
  };
}

interface SectionHighlight {
  title?: {
    snippet: string;
    matched_tokens?: string[];
  };
}

interface SectionsDemo {
  id: number;
  title: string;
  slug: string;
  show_in_demo_light: boolean;
  artifacts: Artifact[];
}

export interface TypesenseDocument {
  document: {
    id: string;
    title: string;
    description?: string;
    type: string;
    locale: string;
    slug: string;
    sections_demo: SectionsDemo[];
    highlight?: {
      title?: { snippet: string };
      sections_demo?: {
        title?: { snippet: string };
        artifacts?: {
          title?: { snippet: string };
        }[];
      }[];
    };
  };
}
