 import data from "../src/data.json"
import { act } from "react-dom/test-utils";
export const fetchData = async () => {
    console.log("call");
    try {
        // const response= await fetch("https://crudcrud.com/api/a93e2c9007f14826a988e3e31a662dec/unicorns")
        // const dataApi=await response.json();
        return data;
    }
    catch (e) {
        console.log(e);
    }
}

export const deleteData = async (action) => {
    console.log(action.payload);
    try {
        // const response= await fetch("https://crudcrud.com/api/a93e2c9007f14826a988e3e31a662dec/unicorns")
        // const data=await response.json();
        var remainingData = [];
        data.filter((item) => {
            if (item._id !== action.payload._id) {
                console.log(item);
                remainingData.push(item);
            }
        })
        console.log("rrem", remainingData);
        return remainingData;
        // return [action.payload];
    }
    catch (e) {
        console.log(e);
    }
}

export const createData = async (action) => {
    console.log("call");
    console.log(action.payload);

    try {
        // const response= await fetch("https://crudcrud.com/api/a93e2c9007f14826a988e3e31a662dec/unicorns")
        // const data=await response.json();
        // var remainingData=[];
        // data.filter((item)=>{
        //     if(item._id !==action.payload._id){
        //         console.log(item);
        //          remainingData.push(item);
        //     }
        // })
        data.push(action.payload);
        console.log("rrem", data);
        return data;
        // return [action.payload];
    }
    catch (e) {
        console.log(e);
    }
}

export const editData = async (action) => {
    console.log("call");
    console.log(action.payload);

    try {
        // const response= await fetch("https://crudcrud.com/api/a93e2c9007f14826a988e3e31a662dec/unicorns")
        // const data=await response.json();
        // var remainingData=[];
        // data.filter((item)=>{
        //     if(item._id !==action.payload._id){
        //         console.log(item);
        //          remainingData.push(item);
        //     }
        // })
        data.push(action.payload);
        console.log("rrem", data);
        return data;
        // return [action.payload];
    }
    catch (e) {
        console.log(e);
    }
}
