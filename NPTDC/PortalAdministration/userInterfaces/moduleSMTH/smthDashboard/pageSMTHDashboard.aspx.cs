using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthDashboard
{
    public partial class pageSMTHDashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            try
            {
                string user_id = HttpContext.Current.Request.Form["UserID"];
                if (user_id != "")
                {
                    string path = Server.MapPath("~/PortalAdministration/img/ImportedSMTHDashboardExcel/");
                    if (!Directory.Exists(path))
                    {
                        try
                        {
                            Directory.CreateDirectory(path);
                        }
                        catch (Exception ex)
                        {
                            // handle them here
                        }
                    }

                    string[] files = Directory.GetFiles(path, "*.xlsx");


                    for (int i = 0; i < files.Length; i++)
                    {
                        files[i] = Path.GetFileName(files[i]);

                    }

                    foreach (string fN in Request.Files)
                    {
                        HttpPostedFile file = HttpContext.Current.Request.Files[fN];
                        string fileName = Path.GetFileName(file.FileName).Split('.')[0] + "_" + user_id + "." + Path.GetFileName(file.FileName).Split('.')[1];

                        file.SaveAs(Server.MapPath("~/PortalAdministration/img/ImportedSMTHDashboardExcel/" + fileName));

                    }
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}