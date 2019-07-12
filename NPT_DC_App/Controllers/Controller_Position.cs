using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using NPT_DC_App.LINQs;


namespace NPT_DC_App.Controllers
{
    public class Controller_Position
    {
        static string AccessProgramCode = "UserControl";
        public static List<Mst_PositionView> GetAllPosition(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            return (from c in dc.Mst_PositionViews
                    where c.Active == true
                    orderby c.PositionName 
                    select c).ToList();
        }

        public static Mst_PositionView GetPosition(string pos_id, string RequestID)
        {

            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            return (from c in dc.Mst_PositionViews where c.PositionID == pos_id && c.Active == true select c).FirstOrDefault();
        }

        public static string DeletePosition(string pos_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            try
            {
                Mst_Position pos = new Mst_Position();
                pos = (from c in dc.Mst_Positions where c.PositionID == pos_id && c.Active == true select c).FirstOrDefault();
                if (pos == null)
                    return "Error~We can't find";
                pos.Active = false;
                pos.ModifiedOn = DateTime.Now;
                pos.ModifiedBy = user_id;
                pos.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }

        public static string SavePosition(string pos_id, string user_id, string position_name, string position_code, string protocol, string description, string remark, string RequestID)
        {
            try
            {

                LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
                Mst_Position the_record = new Mst_Position();
                if (pos_id == "" || pos_id == null)
                {
                    the_record = (from c in dc.Mst_Positions where c.PositionName == position_name && c.Active == true && ((pos_id == "") || (pos_id != "" && c.PositionID != pos_id)) select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new Mst_Position()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            PositionID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.Mst_Positions.InsertOnSubmit(the_record);
                        pos_id = the_record.PositionID;
                    }
                    else return "Error~Duplicate Position Name";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.Mst_Positions where c.PositionID == pos_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();
                the_record.PositionName = position_name;
                the_record.PositionCode = string.IsNullOrEmpty(position_code) ? "": position_code;
                the_record.Protocol = string.IsNullOrEmpty(protocol) ? 0 : Convert.ToDecimal(protocol);
                the_record.Description = string.IsNullOrEmpty(description) ? "" : description.Replace("%27", "");
                the_record.Remark = string.IsNullOrEmpty(remark) ? "" : remark.Replace("%27", "");
                dc.SubmitChanges();
                return "Success~" + the_record.PositionID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string GetAllPositionJSON(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            //Get current user info
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            //Add into Query Statment
            var Query = (from c in dc.Mst_PositionViews
                         where c.Active == true
                         orderby c.PositionName 
                         select new Mst_PositionView
                         {
                            PositionID = c.PositionID,
                            PositionName = c.PositionName,
                            PositionCode = c.PositionCode,
                             Protocol = c.Protocol,
                             Description = c.Description,
                             Remark = c.Remark,
                         }).ToList();
            string return_str = new JavaScriptSerializer().Serialize(Query);
            return return_str;
        }
    }
}