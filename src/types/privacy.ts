export type PrivacyFile = {
  title?: string;
  "sub-title"?: string;
  active?: boolean;
  version?: string;
  lastUpdated?: string;
  board: {
    resume?: string;
    sections: {
      title: string;
      description?: string;
      table?: {
        headers?: string[];
        rows: {
          columns: {
            content: string;
            bold?: boolean;
          }[];
        }[];
      };
      content?: string;
    }[];
  };
}