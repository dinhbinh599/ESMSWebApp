import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";

export const fetchHardSkill = () => {
    var url = `${API_URL}/Skill/getSkills/0`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchHardSkillSuccess(res.data.resultObj))
        })
    }
}

export const fetchHardSkillSuccess = (hardSkillList) => {
    return {
        type: Type.FETCH_HARD_SKILL_LIST,
        hardSkillList
    };
}