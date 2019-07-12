using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Program
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Program : System.Web.Services.WebService
    {
        [WebMethod]
        public List<SYS_ProgramView> GetAllProgram(string search_text, string RequestID)
        {
            return Controllers.Controller_Program.GetAllProgram(search_text, RequestID);
        }
        [WebMethod]
        public SYS_ProgramView GetProgram(string record_id, string RequestID)
        {
            return Controllers.Controller_Program.GetProgram(record_id, RequestID);
        }
        [WebMethod]
        public string SaveProgram(string record_id, string user_id, string program_name, string program_code, string RequestID)
        {
            return Controllers.Controller_Program.SaveProgram(record_id, user_id, program_name, program_code, RequestID);
        }

        [WebMethod]
        public string DeleteProgram(string record_id, string user_id, string RequestID)
        {
            return Controllers.Controller_Program.DeleteProgram(record_id, user_id, RequestID);
        }
    }
}
