import axios from 'axios'
import {GET_DATA} from "../constants";

export const API = axios.create({
    baseURL: GET_DATA
})
