export const ADD_DATA = "ADD_DATA";
export const DELETE_ITEM = "DELETE_ITEM"
export const UPDATE_ITEM = "UPDATE_ITEM"
import {InformationState} from './state'
export function addDataAction(data:InformationState){
    return{
        type:ADD_DATA,
        payload:data
    }
}
export function deleteItem(id:string){
    return{ 
        type:DELETE_ITEM,
        payload:id
    }
}

export function updateItem(data:any){
    const{department, name, position, email, phone, description} = data;
    return{
        type:UPDATE_ITEM,
        payload:data,
    }
    

}