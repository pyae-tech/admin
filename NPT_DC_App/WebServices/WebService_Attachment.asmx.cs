using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Attachment
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Attachment : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Object> getAllAttachment(string record_type, string record_id)
        {
            return Controllers.Controller_Attachment.getAllAttachment(record_type, record_id);
        }
    }
}
