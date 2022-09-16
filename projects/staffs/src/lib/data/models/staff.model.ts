export class Staff {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public role: string,
    public roleName: string,
    public active: boolean,
    public status: string
  ) {}

  toDto() {
    return {};
  }
}
