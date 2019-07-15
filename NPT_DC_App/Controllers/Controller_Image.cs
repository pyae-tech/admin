using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace NPT_DC_App.Controllers
{
    public class Controller_Image
    {
        static string AccessProgramCode = "UserControl";
        public static string SaveImage(string ImageURL, string ImagePath, string ImageName, string RefID, string RefType, string UserID)
        {
            try
            {
                LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
                Mst_Image the_record = new Mst_Image();
                //Security Check
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, UserID, "create")) throw new Exception("No Access.");
                string delete_result = "";
                switch (RefType)
                {
                    case "user":
                        delete_result = DeleteImages(RefID, RefType, UserID);
                        break;
                    case "department":
                        delete_result = DeleteImages(RefID, RefType, UserID);
                        break;
                   
                    default:
                        delete_result = "Success~";
                        break;
                }
                if (delete_result == "Success~")
                {
                    the_record = new Mst_Image()
                    {
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        Active = true,
                        ImageID = Guid.NewGuid().ToString(),
                        ModifiedBy = UserID,
                        ModifiedOn = DateTime.Now,
                        LastAction = Guid.NewGuid().ToString(),
                        ImageName = ImageName,
                        ImageURL = ImageURL,
                        ImagePath = ImagePath,
                        RefID = RefID,
                        RefType = RefType
                    };
                    dc.Mst_Images.InsertOnSubmit(the_record);
                    dc.SubmitChanges();

                    if (RefType == "Logo")
                    {
                        the_record.ImageData = ImageToBinary(ImagePath);
                    }
                    dc.SubmitChanges();
                    return "Success~";
                }
                else
                {
                    return "Error~" + delete_result;
                }
            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static byte[] ImageToBinary(string imagePath)
        {
            FileStream fileStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read);
            byte[] buffer = new byte[fileStream.Length];
            fileStream.Read(buffer, 0, (int)fileStream.Length);
            fileStream.Close();
            return buffer;
        }

        public static void SaveImage(string imagePath, string savedName, int width = 0, int height = 0)
        {
            Image originalImage = Image.FromFile(imagePath);
            string filePath = AppDomain.CurrentDomain.BaseDirectory + savedName;

            if (width > 0 && height > 0)
            {
                Image.GetThumbnailImageAbort myCallback =
                new Image.GetThumbnailImageAbort(ThumbnailCallback);
                Image imageToSave = originalImage.GetThumbnailImage
                    (width, height, myCallback, IntPtr.Zero);
                imageToSave.Save(filePath, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            else
            {
                originalImage.Save(filePath, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
        }
        private static bool ThumbnailCallback() { return false; }
        public static List<Mst_Image> GetImage(string refID, string RequestID)
        {
            //List<Object> result = new List<object>();
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();

            List<Mst_Image> return_images = (from c in dc.Mst_Images
                                             where c.Active == true &&
                                                c.RefID == refID && c.ImageName.Contains(refID)
                                             orderby c.CreatedOn
                                             select c).ToList();

            return return_images;
        }

        public static Mst_Image GetImageSMTHLogo(string refID, string RequestID)
        {
            Mst_Image the_record = new Mst_Image();
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();

            var return_images = (from c in dc.Mst_Images
                                             where c.Active == true &&
                                                c.RefID == refID && c.RefType == "Logo"
                                             orderby c.CreatedOn
                                             select c).ToList().LastOrDefault();
            if(return_images != null)
            {
                the_record = return_images;
            }

            return the_record;

        }

        public static string DeleteImageWithImageURL(string imageURL, string RequestID)
        {
            //List<Object> result = new List<object>();
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            imageURL = imageURL.Replace("https://", "");
            try
            {
                Mst_Image the_record = (from c in dc.Mst_Images
                                        where c.Active == true &&
                                           c.ImageURL == imageURL
                                        select c).FirstOrDefault();
                if (the_record == null)
                    return "Error~We can't find";
                the_record.Active = false;
                the_record.ModifiedOn = DateTime.Now;
                the_record.ModifiedBy = RequestID;
                the_record.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                File.Delete(the_record.ImagePath);
                return "Success~";

            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }

        public static string DeleteImages(string RefID,string RefType, string RequestID)
        {
            //List<Object> result = new List<object>();
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            try
            {
                List<Mst_Image> the_record = (from c in dc.Mst_Images
                                              where c.Active == true &&
                                                 c.RefID == RefID && c.RefType==RefType
                                              select c).ToList();
                Mst_Image delete_image = new Mst_Image();
                if (the_record == null)
                    return "Error~We can't find";
                for (int i = 0; i < the_record.Count; i++)
                {
                    the_record[i].Active = false;
                    the_record[i].ModifiedOn = DateTime.Now;
                    the_record[i].ModifiedBy = RequestID;
                    the_record[i].LastAction = Guid.NewGuid().ToString();
                    try { File.Delete(the_record[i].ImagePath); }
                    catch(Exception ex)
                    {

                    }
                  

                }
                dc.SubmitChanges();
                return "Success~";

            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }
    }
}