import { User } from './../auth/user.model';
export class Adoption {
  public id: number;
  public created_at: Date;
  public adopted?: boolean;

  constructor(
    public name?: string,
    public age?: number,
    public publication_type?: string,
    public age_measurement_unit?: string,
    public image?: string,
    public description?: string,
    public location?: string,
    public published_date?: Date,
    public contact_phone?: number,
    public contact_email?: string,
    public user?: User
    ) {  }

}
