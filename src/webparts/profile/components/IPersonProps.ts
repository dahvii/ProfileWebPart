
  export interface IPersonProps {
    person: IPerson,
    containerWidth?: Number

  }


  export interface IPerson {
    id: number,
    name: string,
    startDate: string, 
    imageUrl: string,
    companyPosition: string,
    profileText: string,

  }