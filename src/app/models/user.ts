export class User {
    id: string;
    email: string;
    phoneNumber : string
    constructor(id: string, email : string,phoneNumber : string) {
        this.id = id;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}