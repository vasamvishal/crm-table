import data from "../src/data.json"
const getUrl = "http://localhost:8080/getAll"
const url = "http://localhost:8080"
const saveUrl = "http://localhost:8080/users/save"
const deleteUrl = url + "/" + "users/delete";
const editUrl = url + "/" + "users/edit";
const message="Error Oops something went wrong"
export const fetchData = async () => {
    try {
        const response = await fetch(getUrl)
        const dataApi = await response.json();
        console.log("dataApi",dataApi);
        return dataApi;
    }
    catch (e) {
        console.log("errror", e);
        return message;
    }
}

export const deleteData = async (action) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
    };
    console.log(requestOptions);
    try {
        const response = await fetch(deleteUrl,requestOptions)
        const data = await response.json();
        console.log("data",data);
        return data;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}

export const createData = async (action) => {
    console.log(action.payload);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
    };
    console.log(requestOptions);
    try {
        const response = await fetch(saveUrl, requestOptions)
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}

export const editData = async (action) => {
    console.log(action.payload);
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
    };
    console.log(requestOptions);

    try {
        const response = await fetch(editUrl, requestOptions);
        const data = await response.json();
        console.log("data",data)
        return data;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
