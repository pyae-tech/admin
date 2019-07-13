using DevExpress.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.Web.Demos; 

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemImage
{
    public partial class pageAttachment : System.Web.UI.Page
    {
        const string UploadUserDirectory = "~/PortalAdministration/img/User_Images/"; 
        protected void Page_Load(object sender, EventArgs e)
{
            string img_name = Request.QueryString["id"];
            string ref_type = Request.QueryString["refType"];
            string userID = Request.QueryString["UserId"];
           string tt= Request["id"];
            if (Page.Request.Files.Count != 0)
            {
                //for(int i=0;i< Page.Request.Files.Count)
              

                string filename = "";
                if (Request.Browser.Browser.Contains("InternetExplorer"))
                {
                    filename = System.IO.Path.GetFileName(Page.Request.Files[0].FileName);
                    UploadControl_FileUploadComplete(filename,Page.Request.Files[0]);
                }

                else
                {
                    filename = Page.Request.Files[0].FileName;
                    UploadControl_FileUploadComplete(filename,Page.Request.Files[0]);
                }

          


            }


        }
        
       // protected void UploadControl_FileUploadComplete(object sender, FileUploadCompleteEventArgs e)
        protected void UploadControl_FileUploadComplete(string filename,HttpPostedFile file) 
        {
            string sizeText = "";
            string img_name= Request.QueryString["id"];
            string ref_type = Request.QueryString["refType"];
            string userID= Request.QueryString["UserId"];
            string[] get_data = new string[4];

            string name = filename;// e.UploadedFile.FileName;           
            long sizeInKilobytes = file.ContentLength / 1024;// e.UploadedFile.ContentLength / 1024;
             sizeText = sizeInKilobytes.ToString() + " KB";

            switch (ref_type)
            {
                case "user":
                     get_data=SaveImageWithName(img_name, UploadUserDirectory, filename, file);
                    SR_ImageController.WebService_ImageControllerSoapClient the_image_controller = new SR_ImageController.WebService_ImageControllerSoapClient();
                    the_image_controller.SaveImage(get_data[0], get_data[3], get_data[1], img_name, "user", userID);
                    break; 
                default:
                    break;
            }

             
        }

        private string[] SaveImageWithName(string img_name,string UploadDirectory, string filename, HttpPostedFile file)
        {
            string[] data_return = new string[4];
            if (img_name == null || img_name == "")
            {
                img_name = "test";
            }

            string resultExtension =  Path.GetExtension(filename);
            string resultFileName = Path.ChangeExtension(img_name, resultExtension);
            string resultFileUrl = UploadDirectory + resultFileName;
            string resultFilePath = MapPath(resultFileUrl);

            int count = 1;

            string fileNameOnly = Path.GetFileNameWithoutExtension(resultFilePath);
            string path = Path.GetDirectoryName(resultFilePath);
            string newFullPath = resultFilePath;
            while (File.Exists(newFullPath))
            {
                string tempFileName = string.Format("{0}({1})", fileNameOnly, count++);
                resultFileName = tempFileName + resultExtension;
                newFullPath = Path.Combine(path, resultFileName);
            }
           
            string savePath = HttpContext.Current.Request.Url.Authority + UploadDirectory.Remove(0, 1)+ resultFileName;


            if (!Directory.Exists(MapPath(UploadDirectory)))
                Directory.CreateDirectory(MapPath(UploadDirectory));
            file.SaveAs(newFullPath);// e.UploadedFile.SaveAs(newFullPath);
            data_return[0] = savePath;
            data_return[1] = resultFileName;
            data_return[2] = resultFileUrl;
            data_return[3] = newFullPath;
            return data_return;
        }
    }
}