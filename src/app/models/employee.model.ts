export interface MaterialAssigned {
    id: number;
    ref: string;
    state: string;
    name: string;
    image: string;
  }
  
  export interface Employee {
    id: number;
    num: string;
    firstname: string;
    lastname: string;
    email: string;
    age: string;
    validated: boolean;
    profilImage: string;
    materialAssigned: MaterialAssigned[];
  }
  