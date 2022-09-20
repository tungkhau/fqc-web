export class Customer {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public fullName: string,
    public address: string,
    public taxCode: string,
    public phoneNumber: string
  ) {}
}
