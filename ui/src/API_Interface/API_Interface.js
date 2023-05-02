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
        return axiosAgent.get(`theme/getTheme`);
    }
    async getTemplateFieldsByID(template_id){
        return axiosAgent.get(`template/${template_id}/template-fields-byID`);
    }
    async setTheme(primaryColor,secondaryColor,textColor){
        console.log("in apiinterface for setTheme");
        return axiosAgent.post(`theme/setTheme/${primaryColor}/${secondaryColor}/${textColor}`);
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
    //functions below this are not tested, and may have issues regarding how they work
    //should take two json objects <denotes type>
    // object 1 format - {userID:<int>, title:<string>, info:<string>}
    // object 2 format - [{ticketID:<int>, fieldTagID:<int>},{ticketID:<int>, fieldTagID:<int>},...]
    async createTicketInstance(ticket, ticket_field_array){
        return axiosAgent.put('ticket/addTicket', ticket).then(axiosAgent.put('fieldTag/addTicketFieldTags', ticket_field_array));
    }
    //should take two json objects <denotes type>
    // object 1 format - {title:<string>, info:<string>}
    // object 2 format - [{templateID:<int>, fieldTagID:<int>}, {templateID:<int>, fieldTagID:<int>},...]
    async createTicketTemplate(template, template_field_array){
        return axiosAgent.put('template/addTemplate', template).then(axiosAgent.put('fieldTag/addTemplateFieldTag', template_field_array));
    }
    //ticketID is an id of a ticket instance
    async completeTicket(ticket_id){
        return axiosAgent.put(`ticket/${ticket_id}/completeTicket`);
    }
    //should take in a json object <denotes type>
    //object format - {field:<string>, tag:<string>}
    async addFieldTag(field_tag){
        return axiosAgent.put(`fieldTag/addFieldTag`, field_tag);
    }
    //should take in a json object of a user
    //object format - {fName:<string>, lName:<string>, role:<enum: "employee", "user">, username:<string>, password:<string>}
    async addUser(user){
        return axiosAgent.put(`user/addUser`, user);
    }
    //should take a json object of the users username password
    //object format - {username:<string>, password:<string>}
    async editUserNamePassword(username_password){
        return axiosAgent.put(`user/editUsernamePassword`, username_password)
    }
    async viewUsers(){
        return axiosAgent.get(`user/allActiveUsers`);
    }
    async deleteUser(user_id){
        return axiosAgent.delete(`user/${user_id}/deleteUser`);
    }
}