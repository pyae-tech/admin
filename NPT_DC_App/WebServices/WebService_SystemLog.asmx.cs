using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_SystemLog
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_SystemLog : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Object> GetLog(string RecordID, string RequestID, string PageNoString)
        {
            return Controllers.Controller_SystemLog.GetLog(RecordID, RequestID, PageNoString);
        }

        [WebMethod]
        public List<Object> GetLogItem(string LogID, string RequestID, string PageNoString)
        {
            return Controllers.Controller_SystemLog.GetLogItem(LogID, RequestID, PageNoString);
        }
    }
}
