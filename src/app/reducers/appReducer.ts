import { ACTION_LOGOUT, ACTION_LOGIN } from './appActions';
interface AfetrloginData {
    pollnum: string;
    CandidateDetail: any;
}
export interface appReducerState {
    login: boolean;
    user: any;
}
const initialState: appReducerState =  {
    login: true,
    user: 'guest'
};
export function reducer(state = initialState, action) {
        switch (action.type) {
            case ACTION_LOGOUT:
                return {
                    ...state,
                    login: false,
                    user: null
                };
                case ACTION_LOGIN:
                        return {
                            ...state,
                            login: true,
                            user: action.user
                };
        }
        return state;
}
