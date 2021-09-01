import axios from 'axios';
import { SERVER_API, JWT } from '../config';
import { SAMPLE } from './types';
export const SampleActionAlert = (none) => (dispatch, getState) => {
    console.log(getState().sample.sample1);
    return new Promise((resolve, reject) => {
        // axios({
        //     url: `${SERVER_API}/sample/get`,
        //     method: 'GET',
        //     headers: {
        //         'content-type': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem(JWT)}`
        //     },
        //     params: {
        //         name: "ricky",
        //         age: 1
        //     }
        // })
        // .then((res) => {
        //     console.log(res.data);
        // })
        // .catch(err => {
        //     reject(err);
        // })

        axios({
            url: `${SERVER_API}/sample/post`,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem(JWT)}`
            },
            data: {
                name: "ricky",
                age: 1
            }
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch(err => {
            reject(err);
        })
    })

    // dispatch({
    //     type:SAMPLE,
    //     name:"Ricky",
    //     value:none
    // })
    // alert(none);
}