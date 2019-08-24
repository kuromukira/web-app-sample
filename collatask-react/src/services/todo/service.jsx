import { localStoreKeys } from '../../constants/config'

export default class TodoService {

    TOKEN = '';
    API_URL = 'https://localhost:5001/';
    USER = '';

    constructor() {
        this.TOKEN = localStorage.getItem(localStoreKeys.token);
        this.USER = localStorage.getItem(localStoreKeys.email);
    }

    /**
     * ----------------------------------------------------------- TODO -----------------------------------------------------------
    */

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

    complete = async (id) => {
        const result = await fetch(this.API_URL + 'api/Todo/complete?id=' + id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result;
    }

    remove = async (id) => {
        const result = await fetch(this.API_URL + 'api/Todo/remove?id=' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result;
    }

    save = async (todo) => {
        const result = await fetch(this.API_URL + 'api/Todo/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            },
            body: JSON.stringify({
                "description": todo.description,
                "addedBy": this.USER,
                "todoDate": todo.todoDate,
                "currentUser": this.USER,
                "isCompleted": todo.isCompleted
            })
        })
        return result;
    }

    modify = async (todo) => {
        const result = await fetch(this.API_URL + 'api/Todo/modify', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            },
            body: JSON.stringify({
                "todoId": todo.todoId,
                "description": todo.description,
                "addedBy": todo.addedBy,
                "todoDate": todo.todoDate,
                "currentUser": this.USER,
                "isCompleted": todo.isCompleted
            })
        })
        return result;
    }

    /** 
     * --------------------------------------------------------- SUB TODO ---------------------------------------------------------
    */

    getSubOf = async (parentId) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/getsubof?parentId=' + parentId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result.json();
    }

    getSub = async (id) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/get?id=' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result.json();
    }

    saveSub = async (todo) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/save', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            },
            body: JSON.stringify({
                "parentTodoId": todo.parentTodoId,
                "description": todo.description,
                "addedBy": this.USER,
                "currentUser": this.USER,
                "isCompleted": todo.isCompleted
            })
        })
        return result;
    }

    modifySub = async (todo) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/modify', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            },
            body: JSON.stringify({
                "todoId": todo.todoId,
                "description": todo.description,
                "parentTodoId": todo.parentTodoId,
                "addedBy": todo.addedBy,
                "todoDate": todo.todoDate,
                "currentUser": this.USER,
                "isCompleted": todo.isCompleted
            })
        })
        return result;
    }

    completeSub = async (id) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/complete?id=' + id + "&currentUser=" + this.USER, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result;
    }

    removeSub = async (id) => {
        const result = await fetch(this.API_URL + 'api/SubTodo/remove?id=' + id + "&currentUser=" + this.USER, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.TOKEN
            }
        })
        return result;
    }

}