export interface ApiProfileResponse {
    code: number;
    message: string;
    me: UserProfile;
  }

  export interface UserProfile {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    identityNumber: string;
    updateDate: string;
    country: string;
  }