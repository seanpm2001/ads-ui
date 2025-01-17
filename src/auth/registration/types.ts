export type RegistrationForm = {
  email: string;
  fullName: string;
  advertiser: {
    name: string;
    url: string;
    phone?: string;
  };
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
};

export const initialValues: RegistrationForm = {
  email: "",
  fullName: "",
  advertiser: {
    name: "",
    url: "",
  },
  address: {
    street1: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  },
};
