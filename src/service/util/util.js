import axios from "axios";
import jwtDecode from "jwt-decode";

export const API_URL = "https://esms2020.azurewebsites.net/api"

export const callAPI = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body
    });
};


export const showBadge = status => {
    switch (status) {
        case 0:
            return "error"
        case 1:
            return "default"
        case 2:
            return "warning"
        case 3:
            return "processing"
        case 4:
            return "success"
        default:
            break;
    }
}

export const showStatus = status => {
    switch (status) {
        case 0:
            return "Pending"
        case 1:
            return "No Employee"
        case 2:
            return "Confirmed"
        case 3:
            return "On Going"
        case 4:
            return "Finished"
        default:
            break;
    }
}

export const showSpan = status => {
    switch (status) {
        case 0:
            return "badge-secondary"
        case 1:
            return "badge-dark"
        case 2:
            return "badge-warning"
        case 3:
            return "badge-primary"
        case 4:
            return "badge-success"
        default:
            break;
    }
}

export const showPositionStatus = status => {
    switch (status) {
        case true:
            return "Enable"
        case false:
            return "Disable"
        default:
            break;
    }
}

export const showPositionSpan = status => {
    switch (status) {
        case true:
            return "badge-success"
        case false:
            return "badge-secondary"
        default:
            break;
    }
}

export const showRole = role => {
    switch (role) {
        case 'admin':
            return "Human Resources"
        case 'PM':
            return "Project Manager"
        case 'Employee':
            return "Employee"
        default:
            break;
    }
}

export const showPositionLevel = level => {
    switch (level) {
        case 1:
            return "Intern"
        case 2:
            return "Fresher"
        case 3:
            return "Junior"
        case 4:
            return "Senior"
        case 5:
            return "Master"
        default:
            break;
    }
}

export const showHardSkillLevel = level => {
    switch (level) {
        case 1:
            return "Basic Knowledge"
        case 2:
            return "Limited Experience"
        case 3:
            return "Practical"
        case 4:
            return "Applied Theory"
        case 5:
            return "Recognized Authority"
        default:
            break;
    }
}


export const formatDate = date => {
    return date.split("/").reverse().join("-")
}

export const convertPositionList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.posID,
        })
    });
    return result;
}

export const convertProjectTypeList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.name,
            value: element.id,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertSkillList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.skillName,
            value: element.skillID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertCertificationList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.certificationName,
            value: element.certificationID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const convertLanguageList = (list) => {
    var result = []
    list.forEach(element => {
        result.push({
            label: element.langName,
            value: element.langID,
            isSelect: typeof element.isSelect === 'undefined' ? false : element.isSelect
        })
    });
    return result;
}

export const getSuggestAgainButton = (list) => {
    var i = 0
    list.forEach(element => {
        element.employees.forEach(emp => {
            if (emp.dateIn === null) {
                i++

            }
        });
    });
    return i === 0
}

export const sortSuggestListByOverallMatch = list => {
    list.sort((a, b) => { return b.overallMatch - a.overallMatch })
}

export const sortSuggestListByLanguageMatch = list => {
    list.sort((a, b) => { return b.languageMatch - a.languageMatch })
}

export const sortSuggestListBySoftSkillMatch = list => {
    list.sort((a, b) => { return b.softSkillMatch - a.softSkillMatch })
}

export const sortSuggestListByHardSkillMatch = list => {
    list.sort((a, b) => { return b.hardSkillMatch - a.hardSkillMatch })
}

export const convertSuggestList = list => {
    var result = []
    if (list.length > 0) {
        list.forEach(element => {
            var positionObj = { requiredPosID: element.requiredPosID, posID: element.posID, empIDs: [] }
            element.employees.forEach(e => {
                var note = ''
                if (!e.check) {
                    if (typeof e.note === 'undefined')
                        note = ''
                    else
                        note = e.note
                }
                var obj = { empID: e.empID, isAccept: typeof e.check === 'undefined' ? false : e.check, note: note }
                positionObj.empIDs.push(obj)
            });
            result.push(positionObj)
        });
    }
    return result
}

export const convertAddEmployeeList = list => {
    var result = []
    var require = JSON.parse(localStorage.getItem('positionRequire'))
    require = require[0]
    var obj = { requiredPosID: require.requiredPosID, posID: require.posID, empIDs: [] }
    list.forEach(element => {
        if (element.posId === obj.posID) {
            element.candidateSelect.forEach(e => {
                var temp = { empID: e.empID, isAccept: true, note: '' }
                obj.empIDs.push(temp)
            })
        }
    });
    result.push(obj)
    return result
}

export const getUserName = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'givenname') {
            result = decode[key]
        }
    })
    return result
}

export const getRole = () => {
    var result = ''
    var token = localStorage.getItem('token')
    var decode = jwtDecode(token)
    Object.keys(decode).forEach(key => {
        let res = key.split('/')
        if (res[res.length - 1] === 'role') {
            result = decode[key]
        }
    })
    return result
}

export const showRequestStatus = status => {
    switch (status) {
        case 0:
            return "New"
        case 1:
            return "Waiting"
        case 2:
            return "Finished"
        default:
            break;
    }
}

export const convertEmpInfo = info => {
    var result = { posID: 0, posLevel: 0, languages: [], softSkills: [], hardSkills: [] }
    result.posID = info.posID
    result.posLevel = info.posLevel
    result.languages = info.languages
    result.softSkills = info.softSkills
    var hardSkillList = []
    info.hardSkills.forEach(e => {
        var hardSkill = { skillID: e.skillID, skillLevel: e.skillLevel, empCertifications: [] }
        e.empCertifications.forEach(e1 => {
            var empCerti = { certiID: e1.certiID, dateTaken: e1.dateTaken, dateEnd: e1.dateEnd }
            hardSkill.empCertifications.push(empCerti)
        })
        hardSkillList.push(hardSkill)
    })
    result.hardSkills = hardSkillList
    // console.log(result)

    return result
}