import { combineReducers } from "redux";
import authentication from "./AuthenticateReducer";
import ProjectFetchReducer from "./ProjectFetchReducer";
import ProjectFormReducer from "./ProjectFormReducer";
// import PositionFormReducer from "./PositionFormReducer";
import CertificationSelectBarReducer from "./CertificationSelectBarReducer";
import HardSkillSelectBarReducer from "./HardSkillSelectBarReducer";
import SoftSkillSelectBarReducer from "./SoftSkillSelectBarReducer";
import PositionSelectBarReducer from "./PositionSelectBarReducer";
import LanguageSelectBarReducer from "./LanguageSelectBarReducer";
import SuggestCandidateList from "./SuggestCandidateList";
import SuggestCandidateSelect from "./SuggestCandidateSelect";
import SuggestCandidateSelectedList from "./SuggestCandidateSelectedListReducer";
import SkillReducer from "./SkillReducer";
import CertificationReducer from "./CertificationReducer";
import ProfileFetchReducer from "./ProfileFetchReducer";
import PositionAssignReducer from "./PositionAssignReducer";
import ListEmployeeReducer from "./ListEmployeeReducer";
import PositionReducer from "./PositionReducer";
import PositionFormReducer from "./PositionFormReducer";
import DataStatisticsReducer from "./DataStatisticsReducer";
import PositionRequireReducer from "./PositionRequireReducer";
import ProjectFieldReducer from "./ProjectFieldReducer";
import ProjectTypeReducer from "./ProjectTypeReducer";
import PreviosRequrieReducer from "./PreviosRequrieReducer";
import SuggestCandidateAgainSelectedListReducer from "./SuggestCandidateAgainSelectedListReducer";
import ProjectDetailFetchReducer from "./ProjectDetailFetchReducer";
import SuggestCandidateAgainSelect from "./SuggestCandidateAgainSelect";
import SuggestCandidateAgainList from "./SuggestCandidateAgainList ";
import SuitableProjectReducer from "./SuitableProjectReducer";
import ErrorReducer from "./ErrorReducer";
import JoinedProjectReducer from "./JoinedProjectReducer";
import SkillInPosition from "./SkillInPositionReducer";
import CandidateResultReducer from "./CandidateResultReducer";
const MainReducer = combineReducers({
    authentication,//use
    ProjectFetchReducer,//use
    ProjectFormReducer,
    CertificationSelectBarReducer,//use
    HardSkillSelectBarReducer,//use
    SoftSkillSelectBarReducer,//use
    PositionSelectBarReducer,//use
    LanguageSelectBarReducer,//use
    SuggestCandidateList,
    SuggestCandidateSelect,
    SuggestCandidateSelectedList,
    SkillReducer,
    CertificationReducer,
    ProfileFetchReducer,
    PositionAssignReducer,
    ListEmployeeReducer,//use
    PositionReducer,//use
    PositionFormReducer,//use
    DataStatisticsReducer,
    PositionRequireReducer,
    ProjectFieldReducer,
    ProjectTypeReducer,
    PreviosRequrieReducer,
    SuggestCandidateAgainSelectedListReducer,
    ProjectDetailFetchReducer,
    SuggestCandidateAgainSelect,
    SuggestCandidateAgainList,
    SuitableProjectReducer,
    ErrorReducer,
    JoinedProjectReducer,
    SkillInPosition,
    CandidateResultReducer
})

export default MainReducer