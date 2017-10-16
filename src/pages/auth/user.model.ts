export class User {
  public id: number;
  public admin: boolean;
  public image: string;
  public contact_phone: number;
  public contact_email: string;
  public provider: string;

  constructor(public email, public name) {}
}
