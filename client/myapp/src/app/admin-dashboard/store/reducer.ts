import { InformationState } from "./state";
import { ADD_DATA, DELETE_ITEM, updateItem, UPDATE_ITEM } from "./action";

export let initialState : InformationState = {
    data:[],   
}

function addNewInformation(state:InformationState, action:any): InformationState {
    return Object.assign({}, state,
        {data: [...state.data, action.payload]})
}
function deleteContact(state:InformationState, action:any): InformationState {
    return Object.assign({}, state,
        {data: state.data.filter(item => item._id !== action.payload)}) 
}

function updateContact(state:InformationState, action:any):InformationState{
    let filterData = state.data.filter(item => item._id !==action.payload._id);
    return Object.assign({}, state,
    {data:[...filterData, action.payload]}
    )
}

export function reducer(state:InformationState = initialState, action:any){
    switch(action.type){
        case ADD_DATA: return addNewInformation(state, action);
        case DELETE_ITEM : return deleteContact(state, action);
        case UPDATE_ITEM :return updateContact(state, action);
        default :return state;
    }
}

