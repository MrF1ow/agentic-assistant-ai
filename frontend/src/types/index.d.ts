export interface ProvidersProps {
  children: React.ReactNode;
}

type ChatPrompt = {
  message: string;
};

export type ChatMessage = {
  message: string;
  isBot: boolean;
};
