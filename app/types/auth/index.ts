interface IOnboardingData {
  purpose: string;
  persona: string;
  extraYesNo: boolean;
}

interface ICompanyData {
  name: string;
  direction: string;
  teamSize: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  phone: string;
  dial: string;
  smsCode: string;
  phoneToken: string;
  onboarding: IOnboardingData;
  company: ICompanyData;
  invites: string[];
}
