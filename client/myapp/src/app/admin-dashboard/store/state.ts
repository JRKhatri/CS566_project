export interface IState {
    _id:string,
    department:string,
    name:string,
    position:string,
    email:string,
    phone:string,
    description:string,
    s3location:string
}

export interface InformationState {
    data:IState[];
}