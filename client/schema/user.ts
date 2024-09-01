export type User = {
  id: string;
  email: string;
  role: "Admin" | "Manager" | "Saler" | "Bloger" | "Customer";
  emailVerified: boolean;
  status: "Active" | "Suspended" | "Disabled";
  hasPassword: boolean;
  mFAEnabled: boolean;
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    picture: string | null;
    phone: string;
    address: string;
    zipCode: string;
    country: string;
    province: string;
    city: string;
    apartment: string;
  } | null;
  oauthProviders: { id: string; provider: string; providerId: string }[];
  createdAt: Date;
  updatedAt: Date;
};
