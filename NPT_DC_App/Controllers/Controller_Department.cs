using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.Controllers
{
    public class Controller_Department
    {
        static string AccessProgramCode = "UserControl";
        public static List<Mst_DepartmentView> GetAllDepartment(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            return (from c in dc.Mst_DepartmentViews
                    where c.Active == true 
                    orderby c.DepartmentName descending
                    select c).ToList();
        }

        public static Mst_DepartmentView GetDepartment(string dep_id, string RequestID)
        {

            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            return (from c in dc.Mst_DepartmentViews where c.DepartmentID == dep_id && c.Active == true select c).FirstOrDefault();
        }

        public static string DeleteDepartment(string dep_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            try
            {
                Mst_Department dep = new Mst_Department();
                dep = (from c in dc.Mst_Departments where c.DepartmentID == dep_id && c.Active == true select c).FirstOrDefault();
                if (dep == null)
                    return "Error~We can't find";
                dep.Active = false;
                dep.ModifiedOn = DateTime.Now;
                dep.ModifiedBy = user_id;
                dep.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }

        public static string SaveDepartment(string dep_id, string user_id, string department_name, string notifyemail, string protocol,string description, string remark, string RequestID)
        {
            try
            {

                LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
                Mst_Department the_record = new Mst_Department();
                if (dep_id == "" || dep_id == null)
                {
                    the_record = (from c in dc.Mst_Departments where c.DepartmentName == department_name && c.Active == true && ((dep_id == "") || (dep_id != "" && c.DepartmentID != dep_id)) select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new Mst_Department()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            DepartmentID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.Mst_Departments.InsertOnSubmit(the_record);
                        dep_id = the_record.DepartmentID;
                    }
                    else return "Error~Duplicate Department Name";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.Mst_Departments where c.DepartmentID == dep_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();
                the_record.DepartmentName = department_name;
                the_record.NotifyEmail = notifyemail;
                the_record.Protocol = string.IsNullOrEmpty(protocol) ? 0:Convert.ToDecimal(protocol);
                the_record.Description = string.IsNullOrEmpty(description) ? "" : description.Replace("%27","");
                the_record.Remark = string.IsNullOrEmpty(remark) ? "" : remark.Replace("%27", "");
                dc.SubmitChanges();
                return "Success~" + the_record.DepartmentID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string GetAllDepartmentJSON(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            LINQ_MasterDataContext dc = new LINQ_MasterDataContext();
            //Get current user info
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            //Add into Query Statment
            var Query = (from c in dc.Mst_DepartmentViews
                         where c.Active == true
                         orderby c.DepartmentName 
                         select new Mst_DepartmentView
                         {
                             DepartmentID = c.DepartmentID,
                             DepartmentName = c.DepartmentName,
                             NotifyEmail = c.NotifyEmail,
                             Protocol = c.Protocol,
                             Description = c.Description,
                             Remark = c.Remark,
                         }).ToList();
            string return_str = new JavaScriptSerializer().Serialize(Query);
            return return_str;
        }
    }
}