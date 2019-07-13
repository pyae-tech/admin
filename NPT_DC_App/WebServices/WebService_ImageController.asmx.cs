using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_ImageController
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService_ImageController : System.Web.Services.WebService
    {

        [WebMethod] 
        public string SaveImage(string ImageURL, string ImagePath, string ImageName, string RefID, string RefType, string UserID)
        {
            return Controllers.Controller_Image.SaveImage(ImageURL, ImagePath, ImageName, RefID, RefType, UserID);
        }

    }
}
