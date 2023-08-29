import ActionType from "./ActionType"
import axios from 'axios'

const fetchStarted = () => {
    return {
        type: ActionType.FETCHING_STARTED
    }
}

const loading = () => {
    return {
        type: ActionType.LOADING
    }
}

const error = (errorMessage) => {
    return {
        type: ActionType.ERROR,
        payload: errorMessage
    }
}

const addUserObjects = (userObjectList) => {
    return {
        type: ActionType.ADD_USER_OBJECT_LIST,
        payload: userObjectList
    }
}

const fetchAllUsers = (userList) => {
    console.log("InAdduser"+userList)
    return async (dispatch) => {
        dispatch(fetchStarted())
        try {
            axios.post("http://localhost:8080/users/getUsersByIds",
                {
                    userIdList: [...userList]
                })
                .then((response) => {
                    console.log(JSON.stringify(response))
                    dispatch(addUserObjects(response.data))
                })
                .catch((error) => {
                    console.log(JSON.stringify(error))
                })
        } catch (error) {
            dispatch(error(error))
        }
    }
}
export default fetchAllUsers