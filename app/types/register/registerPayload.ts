interface OnboardingData {
  purpose: string;
  persona: string;
  extraYesNo: boolean;
}

interface CompanyData {
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
  onboarding: OnboardingData;
  company: CompanyData;
  invites: string[];
}
