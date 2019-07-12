using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_SystemMenuGroup
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_SystemMenuGroup : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Object> GetAllSysMenuGroupWithPagination(string search_text, string search_sysmenugp, string RequestID, string PageNoString)
        {
            return Controllers.Controller_SystemMenuGroup.GetAllSysMenuGroupWithPagination(search_text, search_sysmenugp, RequestID, PageNoString);
        }

        [WebMethod]
        public SYS_MenuGroupView GetSysMenuGroup(string menugp_id, string RequestID)
        {
            return Controllers.Controller_SystemMenuGroup.GetSysMenuGroup(menugp_id, RequestID);
        }

        [WebMethod]
        public string SaveSysMenuGroup(string menugp_id, string user_id, string menu_gpcode, string menu_gpname, string menu_gpseq, string RequestID)
        {
            return Controllers.Controller_SystemMenuGroup.SaveSysMenuGroup(menugp_id, user_id, menu_gpcode, menu_gpname, menu_gpseq, RequestID);
        }
        [WebMethod]
        public string DeleteSysMenuGroup(string menugp_id, string user_id, string RequestID)
        {
            return Controllers.Controller_SystemMenuGroup.DeleteSysMenuGroup(menugp_id, user_id, RequestID);
        }
    }
}
