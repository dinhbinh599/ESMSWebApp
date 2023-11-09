import { Type } from "../constant/index";

var initState = {}

const  dataStatisticsReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.AWAITING_STATISTICS:
            state = action.resultObj
            return state
        default:
            return state;
    
    }
}

export default dataStatisticsReducer;