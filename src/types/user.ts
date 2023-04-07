export interface User {
    id: number;
    name: string;
    address: {
      street: string;
      suite: string;
      city: string;
    };
    phone: string;
    company: {
      name: string;
    };
  }