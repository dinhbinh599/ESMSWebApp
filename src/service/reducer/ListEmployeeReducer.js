import { Type } from "../constant";

const initState = []

const ListEmployeeReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_LIST_EMPLOYEE:
            state = action.list
            return [...state]
        default:
            return [...state];
    }
}

export default ListEmployeeReducer