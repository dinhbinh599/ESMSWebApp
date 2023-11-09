import { Type } from "../constant/index";

var initState = []

const certificationSelectBarReducer = (state = initState, action) => {
    switch (action.type) {
        case Type.FETCH_CERTIFICATION_LIST:
            state = [...action.certiList]
            return [...state];
        default:
            return [...state];
    }
}

export default certificationSelectBarReducer;