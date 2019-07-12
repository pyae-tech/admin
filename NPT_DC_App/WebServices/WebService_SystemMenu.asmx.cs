using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_SystemMenu
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_SystemMenu : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Object> GetAllSysMenuWithPagination(string search_text, string search_sysmenu, string RequestID, string PageNoString)
        {
            return Controllers.Controller_SystemMenu.GetAllSysMenuWithPagination(search_text, search_sysmenu, RequestID, PageNoString);
        }

        [WebMethod]
        public SYS_MenuView GetSysMenu(string menu_id, string RequestID)
        {
            return Controllers.Controller_SystemMenu.GetSysMenu(menu_id, RequestID);
        }

        [WebMethod]
        public string SaveSysMenu(string menu_id, string user_id, string menu_name, string menu_label, string menu_icon,
                                          string menu_linkpage, string menu_onclick, string menu_seq,string is_node,string noteMenuID, string RequestID)
        {
            string change_menu_label = Server.UrlDecode(menu_label);
            return Controllers.Controller_SystemMenu.SaveSysMenu(menu_id, user_id, menu_name, change_menu_label, menu_icon, menu_linkpage, menu_onclick, menu_seq,is_node, noteMenuID, RequestID);
        }
        [WebMethod]
        public string DeleteSysMenu(string menu_id, string user_id, string RequestID)
        {
            return Controllers.Controller_SystemMenu.DeleteSysMenu(menu_id, user_id, RequestID);
        }

        [WebMethod]
        public List<SYS_MenuView> GetAllMenu(string RequestID)
        {
            return Controllers.Controller_SystemMenu.GetAllMenu(RequestID);
        }

        [WebMethod]
        public string GetAllMenuTreeView(string RequestID)
        {
             return Controllers.Controller_SystemMenu.GetAllMenuTreeView(RequestID);
        }

        [WebMethod]
        public string GetAllMenuTreeViewByRole(string RoleID, string RequestID)
        {
            return Controllers.Controller_SystemMenu.GetAllMenuTreeViewByRole(RoleID,RequestID);
        }
        

        [WebMethod]
        public string ChangeSysMenu(string menu_ids, string oldnoteMenuID,string noteMenuID,string RequestID)
        {
            return Controllers.Controller_SystemMenu.ChangeSysMenu(menu_ids, oldnoteMenuID, noteMenuID,RequestID);
        }
    }
}
