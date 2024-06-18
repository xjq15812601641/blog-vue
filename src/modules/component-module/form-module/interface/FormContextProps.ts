export interface FormContextProps {
  resetAction: () => Promise<void>;
  submitAction: () => Promise<void>;
}
