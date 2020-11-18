export type Header = {
  id: string;
  text: string;
  size: "sm" | "md" | "lg" | "auto";
  order: number;
};

export type DocHeaders = Record<string, Header>;
