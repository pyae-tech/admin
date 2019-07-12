using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;
using NPT_DC_App.Controllers;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Department
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService_Department : System.Web.Services.WebService
    {
        [WebMethod]
        public List<Mst_DepartmentView> GetAllDepartment(string RequestID)
        {
            return Controllers.Controller_Department.GetAllDepartment(RequestID);
        }
        [WebMethod]
        public Mst_DepartmentView GetDepartment(string dep_id, string RequestID)
        {
            return Controllers.Controller_Department.GetDepartment(dep_id, RequestID);
        }
        [WebMethod]
        public string SaveDepartment(string dep_id, string user_id, string department_name, string notifyemail, string protocol, string description, string remark, string RequestID)
        {
            return Controllers.Controller_Department.SaveDepartment(dep_id, user_id, department_name, notifyemail, protocol, description, remark, RequestID);
        }
        [WebMethod]
        public string DeleteDepartment(string dep_id, string user_id, string RequestID)
        {
            return Controllers.Controller_Department.DeleteDepartment(dep_id, user_id, RequestID);
        }

        [WebMethod]
        public string GetAllDepartmentJSON(string RequestID)
        {
            return Controllers.Controller_Department.GetAllDepartmentJSON(RequestID);
        }
    }
}
