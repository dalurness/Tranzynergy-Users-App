import axios from 'axios'

const BASE_URL = 'https://randomuser.me/api/'

function getTenUsers () {
    const response = axios.get(`${BASE_URL}?results=10`)
    return response
}

function getTwoUsers () {
    const response = axios.get(`${BASE_URL}?results=2`)
    return response
}

export { getTenUsers, getTwoUsers }