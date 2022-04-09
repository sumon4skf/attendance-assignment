import axios from "axios";



const instance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});


export default instance;