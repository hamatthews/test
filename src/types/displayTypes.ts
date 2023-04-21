export type TaskFields = {
  completed: boolean;
  title: string;
  date: string;
  time: string;
  labels: {
    personal: boolean;
    professional: boolean;
    urgent: boolean;
  };
  description: string;
};
