using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.service
{
    public partial class pageService : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var pwd = "CsKeeIwHWkSG1gi7SLXEkg==";
            Controllers.Controller_TextEncryption.Decrypt(pwd, "");
        }
    }
}