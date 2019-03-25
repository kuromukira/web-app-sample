import { localStoreKeys } from '../../constants/config'

export default class TodoService {

    TOKEN = '';
    API_URL = 'https://localhost:5001/';

    constructor() {
        this.TOKEN = localStorage.getItem(localStoreKeys.token);
    }

    getAll = async () => {
        const result = await fetch(this.API_URL + 'api/Todo/getall', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        });
        return result.json();
    }

    get = async (id) => {
        const result = await fetch(this.API_URL + 'api/Todo/get?id=' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result.json();
    }

    /**
     * api/Todo/save
     * api/Todo/modify
     * api/Todo/remove?id=
     * api/Todo/complete?id=
     * 
     * api/SubTodo/getsubof
     * api/SubTodo/get
     * api/SubTodo/save
     * api/SubTodo/modify
     * api/SubTodo/remove?id
     * api/SubTodo/complete?id=
     */

}