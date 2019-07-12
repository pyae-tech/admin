using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;


namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_UserRole
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_UserRole : System.Web.Services.WebService
    {

        [WebMethod]
        public List<SYS_UserRoleView> GetAllUserRole(string search_text, string RequestID)
        {
            return Controllers.Controller_UserRole.GetAllUserRole(search_text, RequestID);
        }
        [WebMethod]
        public SYS_UserRoleView GetUserRole(string record_id, string RequestID)
        {
            return Controllers.Controller_UserRole.GetUserRole(record_id, RequestID);
        }
        [WebMethod]
        public string SaveUserRole(string record_id, string user_id, string role_name, string role_code, string menulist, string RequestID)
        {
            return Controllers.Controller_UserRole.SaveUserRole(record_id, user_id, role_name, role_code, menulist, RequestID);
        }
        [WebMethod]
        public string DeleteUserRole(string record_id, string user_id, string RequestID)
        {
            return Controllers.Controller_UserRole.DeleteUserRole(record_id, user_id, RequestID);
        }
        [WebMethod]
        public List<SYS_GetProgramRoleResult> GetProgramUserRole(string roleid, string RequestID)
        {
            return Controllers.Controller_UserRole.GetProgramUserRole(roleid, RequestID);
        }
        [WebMethod]
        public List<SYS_UserRoleMenu> GetUserRoleMenu(string role_id, string RequestID)
        {
            return Controllers.Controller_UserRole.GetUserRoleMenu(role_id, RequestID);
        }

        [WebMethod]
        public string SetProgramRoles(string role_id, string program_id, string type, string data, string RequestID)
        {
            return Controllers.Controller_UserRole.SetProgramRoles(role_id, program_id, type, data, RequestID);
        }

        [WebMethod]
        public  NPT_DC_App.Controllers.Controller_UserRole.MenuResultList GetUserRoleMenuResult(string RoleID)
        {
            return Controllers.Controller_UserRole.GetUserRoleMenu(RoleID);
        }







    }
}
