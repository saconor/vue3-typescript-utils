import { GenerateFieldOptions, TableFields } from "./types";

type Nullable<T> = T | null;

export function generateField<T>(
  title: string,
  id: string,
  options: GenerateFieldOptions<T>
): TableFields<T> {
  const tablefield: TableFields<T> = {
    title: title,
    id: id,
    customCss: options.customCss ? options.customCss : undefined,
    clickable: options.clickable ? options.clickable : false,
    sortable: options.sortable ? options.sortable : false,
    filterable: options.filterable ? options.filterable : false,
    clickfkt: options.clickfkt ? options.clickfkt : undefined,
    sortfkt: options.sortfkt ? options.sortfkt : undefined,
    filterfkt: () => (options.filterfkt ? options.filterfkt : undefined),
    filtertype: options.filtertype ? options.filtertype : undefined,
    formatter: options.formatter ? options.formatter : undefined,
    htmlFormatter: options.htmlFormatter ? options.htmlFormatter : undefined,
  };
  return tablefield;
}
