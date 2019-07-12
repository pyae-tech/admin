using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.masterFiles
{
    public partial class FullFrameMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //var userid = Session["userid"] != null ? Session["userid"].ToString() : string.Empty;
            //if (string.IsNullOrEmpty(userid))
            //{               
            //    Response.Redirect("login");                           
            //}
            //else
            //{
            //    if (!Controllers.Controller_SystemUser.isApplicationActive(userid))
            //        Response.Redirect("login");
            //    Controllers.Controller_SystemUser.do_update_lastlogin(userid);                
            //}
        }
    
    }
}