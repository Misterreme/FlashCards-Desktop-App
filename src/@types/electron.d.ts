export {};

declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      toggleMaximize: () => void;
      close: () => void;
    };

    CRUD: {
      saveJSON: (data: any) => Promise<void>;
      loadJSON: () => Promise<Set[]>;
      deleteJSON: (id: string) => Promise<void>;
      editJSON: (data: any) => Promise<void>;
    };
  }
}
