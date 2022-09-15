export interface Column {
  name: string;
  header: string | null;
  width: string | null;
  headerAlign: string | null;
  dataAlign: string | null;
  isFilterable: boolean | null;
  isSortable: boolean | null;
}
