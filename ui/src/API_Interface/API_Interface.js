 import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id, password) {
        return axiosAgent.get(`login/${user_id}/${password}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                 }));
    }
    async getAllTicketsForUser(user_id){
        return axiosAgent.get(`ticket/${user_id}/all-tickets`);
    }
    async getTicketByID(ticket_id){
        return axiosAgent.get(`ticket/${ticket_id}/ticketID`);
    }
    async getTheme(){
        return axiosAgent.get(`theme/theme`);
    }
    async getTemplateFieldsByID(templateID){
        return axiosAgent.get(`template/${templateID}/template-fields-byID`);
    }
    async getAllTemplatesFields(){
        return axiosAgent.get(`template/all-templates-fields`);
    }
    async getAllTemplates(){
        return axiosAgent.get(`template/all-templates`);
    }
    async getAllFieldTags(){
        return axiosAgent.get(`fieldTag/all-fieldTags-valid`);
    }
}