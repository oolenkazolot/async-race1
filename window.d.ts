export {};

declare global {
  interface Window {
    onload: () => void;
    slideOne: () => void;
    slideTwo: () => void;
  }
}
