import { Type } from "../constant/index"
import axios from "axios";
import { API_URL } from "../util/util";

export const fetchSoftSkill = () => {
    var url = `${API_URL}/Skill/getSkills/1`
    return (dispatch) => {
        axios.get(
            url,
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
        ).then(res => {
            dispatch(fetchSoftSkillSucess(res.data.resultObj))
        })
    }
}

export const fetchSoftSkillSucess = (softSkillList) => {
    return {
        type: Type.FETCH_SOFT_SKILL_LIST,
        softSkillList
    };
}
