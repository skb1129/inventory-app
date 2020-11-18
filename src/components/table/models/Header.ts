export type Header = {
  id: string;
  text: string;
  size: "sm" | "md" | "lg" | "auto";
};

export type DocHeaders = Record<string, Header>;
