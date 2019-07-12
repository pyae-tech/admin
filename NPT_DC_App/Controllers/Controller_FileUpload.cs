using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace NPT_DC_App.Controllers
{
    public class Controller_FileUpload
    {
        public static string FileUpload(string path, string RequestID, string PageNoString)
        {
            try
            {
                int count = 0;
                string names = "";
                //string path = Server.MapPath("~/PortalAdministionV2/pages/PortalNews/");
                string newsNo = HttpContext.Current.Request.Form["NewsNo"];
                string isUpdate = HttpContext.Current.Request.Form["IsUpdate"];
                if (isUpdate == "True")
                {
                    string[] files = Directory.GetFiles(path, "*.jpg");
                    for (int i = 0; i < files.Length; i++)
                    {
                        files[i] = Path.GetFileName(files[i]);
                        if (files[i].Contains(newsNo))
                        {
                            names += files[i] + ",";
                            count++;
                        }

                    }
                }

                //foreach (string fN in Request.Files)
                //{
                //    HttpPostedFile file = HttpContext.Current.Request.Files[fN];
                //    string extention = Path.GetExtension(file.FileName);
                //    string fileName = newsNo + "_" + count + extention;
                //    file.SaveAs(path+ fileName);
                //    count++;

                //}

               return "Success";
            }
            catch (Exception ex)
            {              
                return ex.Message;
            }
        }
    }
}