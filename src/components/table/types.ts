export type TableData<T> = T[];

export interface TableFields<T> {
  title: string;
  id: string;
  customCss?: string[];
  clickable?: boolean;
  clickfkt?: (value: T) => void;
  sortable?: boolean;
  sortfkt?: (value1: T, value2: T) => number;
  filterable?: boolean;
  filterfkt?: () => void;
  filtertype?: string;
  formatter?: (value: T) => string;
  htmlFormatter?: (value: T) => string;
}
export interface GenerateFieldOptions<T> extends Omit<TableFields<T>, "id" | "title"> { }
