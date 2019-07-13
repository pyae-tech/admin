using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_User
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_User : System.Web.Services.WebService
    {

        [WebMethod]
        public List<SYS_UserView> GetAllUserByAgent(string search_text, string agent_id, string RequestID)
        {
            return Controllers.Controller_User.GetAllUserByAgent(search_text, agent_id, RequestID);
        }

        [WebMethod]
        public List<SYS_UserView> GetAllUserByOrganization(string orgId, string RequestID)
        {
            return Controllers.Controller_User.GetAllUserByOrganization(orgId, RequestID);
        }

        [WebMethod]
        public string GetAllUserByOrganizationJson(string orgId, string RequestID)
        {
            return Controllers.Controller_User.GetAllUserByOrganizationJson(orgId, RequestID);
        }


        [WebMethod]
        public List<SYS_UserView> GetAllUser(string search_text, string org_id, string RequestID)
        {

            return Controllers.Controller_User.GetAllUser(search_text, org_id, RequestID);
        }
        [WebMethod]
        public SYS_UserView GetUser(string record_id, string RequestID)
        {
            return Controllers.Controller_User.GetUser(record_id, RequestID);
        }
        [WebMethod]
        public string SaveUser(string record_id, string user_id, string user_code, string org_id,
            string user_name, string user_email, string password,
            string contactinfo, string note, string role_id,
            string user_type,
            string RequestID)
        {
            return Controllers.Controller_User.SaveUser(record_id, user_id, user_code, org_id, user_name, user_email, password, contactinfo, note, role_id, user_type, RequestID);
        }
        [WebMethod]
        public string DeleteUser(string record_id, string user_id, string RequestID)
        {
            return Controllers.Controller_User.DeleteUser(record_id, user_id, RequestID);
        }

        [WebMethod]
        public SYS_UserView GetProfile(string userID)
        {
            return Controllers.Controller_User.GetProfileUser(userID);
        }

        [WebMethod]
        public string  GetAllUserJson(string org_id, string RequestID)
        {

            return Controllers.Controller_User.GetAllUserJson(org_id, RequestID);
        }

    }
}
