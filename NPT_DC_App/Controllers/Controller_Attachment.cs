using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NPT_DC_App.Controllers
{
    public class Controller_Attachment
    {
        public class Attachment
        {
            public string ID { get; set; }
            public string Path { get; set; }
            public string ImageName { get; set; }
        }
        public static List<Object> getAllAttachment(string record_type, string record_id)
        {
            List<Object> result = new List<object>();
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            List<Attachment> return_attachment = new List<Attachment>();
            List<Mst_Image> Query = (from c in dc.Mst_Images
                                     where c.Active == true &&
                                        c.RefID == record_id && c.RefType == record_type
                                     orderby c.CreatedOn
                                     select c).ToList();
            foreach (Mst_Image c in Query)
            {
                Attachment ot = new Attachment()
                {
                    ID=c.ImageID,
                    Path = c.ImageURL,
                    ImageName = c.ImageName

                };
                return_attachment.Add(ot);
            }

            result.AddRange(return_attachment);

            return result;
        }
    }
}