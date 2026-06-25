declare module '*.png' {
  const value: number;
  export default value;
}

declare const require: {
  (path: string): any;
};
