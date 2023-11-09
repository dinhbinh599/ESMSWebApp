import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";
import { history } from "../helper/History";

export const addPositionRequire = (positionItem) => {
    return {
        type: Type.ADD_POSITION_REQUIRE,
        positionItem
    };
}

export const deletePositionRequire = positionFormIndex => {
    return {
        type: Type.DELETE_POSITION_REQUIRE,
        positionFormIndex
    }
}

export const updatePositionID = (positionID, positionFormIndex) => {
    return {
        type: Type.UPDATE_POSITION_ID,
        positionFormIndex,
        positionID
    }
}

export const onUpdatePositionLevel = (positionID, positionFormIndex) => {
    return {
        type: Type.UPDATE_POSITION_LEVEL,
        positionFormIndex,
        positionID
    }
}


export const updateNOC = (nOC, positionFormIndex) => {
    return {
        type: Type.UPDATE_POSITION_NOC,
        positionFormIndex,
        nOC
    }
}

export const addLanguageRequire = (positionFormIndex, languageItem) => {
    return {
        type: Type.ADD_LANGUAGE_REQUIRE,
        positionFormIndex, languageItem
    };
}

export const deleteLanguageRequire = (languageIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_LANGUAGE_REQUIRE,
        positionFormIndex,
        languageIndex
    }
}

export const updateLanguageID = (languageID, languageIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_LANGUAGE_ID,
        positionFormIndex,
        languageIndex,
        languageID
    }
}

export const updateLanguageLevel = (languageID, languageIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_LANGUAGE_LEVEL,
        positionFormIndex,
        languageIndex,
        languageID
    }
}

export const updateLanguagePriority = (value, languageIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_LANGUAGE_PRIORITY,
        positionFormIndex,
        languageIndex,
        value
    }
}

export const addSoftSkillRequire = (positionFormIndex) => {
    return {
        type: Type.ADD_SOFT_SKILL_REQUIRE,
        positionFormIndex
    };
}

export const deleteSoftSkillRequire = (softSkillIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_SOFT_SKILL_REQUIRE,
        positionFormIndex,
        softSkillIndex
    }
}

export const updateSoftSkillID = (softSkillID, softSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_SOFT_SKILL,
        positionFormIndex,
        softSkillIndex,
        softSkillID
    }
}

export const addHardSkillRequire = (positionFormIndex, hardSkillItem) => {
    return {
        type: Type.ADD_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillItem
    };
}

export const deleteHardSkillRequire = (hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.DELETE_HARD_SKILL_REQUIRE,
        positionFormIndex,
        hardSkillIndex
    }
}

export const updateHardSkillExp = (hardSkillIndex, positionFormIndex, value, name) => {
    return {
        type: Type.UPDATE_HARD_SKILL_EXP,
        positionFormIndex,
        hardSkillIndex,
        value, name
    }
}

export const updateHardSkillID = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_ID,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const updateHardSkillPriority = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_PRIORITY,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const UpdateHardSkillLevel = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_LEVEL,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}


export const updateHardSkillCerti = (value, hardSkillIndex, positionFormIndex) => {
    return {
        type: Type.UPDATE_HARD_SKILL_CERTI,
        positionFormIndex,
        hardSkillIndex,
        value
    }
}

export const fetchPostionList = () => {
    var url = `${API_URL}/Position/getPositions`
    return (dispatch) => {
        if (localStorage.getItem('token') !== null) {
            axios.get(
                url,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                dispatch(fetchPostionListSuccess(res.data.resultObj))
            }).catch(err => {
                // if (err.response.status === 401) {
                //     history.push('/login')
                // }
            })
        }
        else{
            history.push('/login')
        }
    }
}

export const fetchPostionListSuccess = (positionList) => {
    return {
        type: Type.FETCH_POSITION_LIST,
        positionList
    }
}

export const addMoreCandidate = () => {
    history.push("/project/create-position", { isUpdate: true })
    return { type: Type.ADD_MORE_CANDIDATE }
}

export const createPositionSuccess = (result) => {
    return {
        type: Type.CREATE_POSITION,
        result
    }
}

export const getPrevRequire = (projectId, posID) => {
    var url = `${API_URL}/Project/getRequiredPosByID/${projectId}&&${posID}`
    return (dispatch) => {
        return axios.get(
            url,
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}` } }
        ).then(res => {
            if (res.data.isSuccessed)
                dispatch(getPrevRequireSuccess(res.data.resultObj))
            else
                dispatch(getPrevRequireFailed())
        })
    }
}

export const getPrevRequireSuccess = prevRequire => {
    return { type: Type.GET_PREV_REQUIRE, prevRequire }
}

export const getPrevRequireFailed = () => {
    return { type: Type.GET_PREV_REQUIRE }
}