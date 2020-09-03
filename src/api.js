import data from "../src/data.json"
const url = "https://crudcrud.com/api/9edaebeb483d4a8a88a2b40c17af61ec/unicorns"

export const fetchData = async () => {
    try {
        const response = await fetch(url)
        const dataApi = await response.json();
        return dataApi;
    }
    catch (e) {
        console.log("errror", e);
    }
}

export const deleteData = async (action) => {
    const mainUrl = url + "/" + action.payload._id;
    try {
        const response = await fetch(mainUrl)
        const data = await response.json();
    }
    catch (e) {
        console.log(e);
    }
}

export const createData = async (action) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
    };
    try {
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

export const editData = async (action) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action.payload)
    };

    try {
        const mainUrl = url + "/" + action.payload._id;
        const response = await fetch(mainUrl, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}
