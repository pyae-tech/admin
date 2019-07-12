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
    /// Summary description for WebService_Position
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Position : System.Web.Services.WebService
    {
        [WebMethod]
        public List<Mst_PositionView> GetAllPosition(string RequestID)
        {
            return Controllers.Controller_Position.GetAllPosition(RequestID);
        }
        [WebMethod]
        public Mst_PositionView GetPosition(string pos_id, string RequestID)
        {
            return Controllers.Controller_Position.GetPosition(pos_id, RequestID);
        }
        [WebMethod]
        public string SavePosition(string pos_id, string user_id, string position_name, string position_code, string protocol, string description, string remark, string RequestID)
        {
            return Controllers.Controller_Position.SavePosition(pos_id, user_id, position_name, position_code, protocol, description, remark, RequestID);
        }
        [WebMethod]
        public string DeletePosition(string pos_id, string user_id, string RequestID)
        {
            return Controllers.Controller_Position.DeletePosition(pos_id, user_id, RequestID);
        }

        [WebMethod]
        public string GetAllPositionJSON(string RequestID)
        {
            return Controllers.Controller_Position.GetAllPositionJSON(RequestID);
        }

    }
}
