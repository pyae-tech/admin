using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Image
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Image : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Mst_Image> GetImage(string refID, string RequestID)
        {
            return Controllers.Controller_Image.GetImage(refID, RequestID);
        }
        [WebMethod]
        public Mst_Image GetImageSMTHLogo(string refID, string RequestID)
        {
            return Controllers.Controller_Image.GetImageSMTHLogo(refID, RequestID);
        }
        [WebMethod]
        public string DeleteImage(string imageID, string RequestID)
        {
            string server_path = Server.MapPath("~/PortalAdministration/img/Item_Images/");
            return Controllers.Controller_Image.DeleteImages(imageID,"Item", RequestID);
        }

        [WebMethod]
        public string DeleteImageWithURL(string imageURL, string RequestID)
        {
            string server_path = Server.MapPath("~/PortalAdministration/img/Item_Images/");
            return Controllers.Controller_Image.DeleteImageWithImageURL(imageURL, RequestID);
        }


        [WebMethod]
        public string DeleteImages(string RefID,string RefType, string RequestID)
        {
              return Controllers.Controller_Image.DeleteImages(RefID, RefType, RequestID);
        }


    }
}
