export interface Button {
  title: string;
  text: string | null;
  icon: string | null;
  iconColor: string | null;
  action(): void;
}
