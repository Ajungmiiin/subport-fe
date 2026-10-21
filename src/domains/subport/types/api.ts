export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type FaqRes = {
  faqs: FaqItem[];
};
