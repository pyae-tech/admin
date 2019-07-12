using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.Controllers
{
    public static class Controller_User
    {
        static string AccessProgramCode = "UserControl";
        public static List<SYS_UserView> GetAllUserByAgent(string search_text, string agent_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserViews
                    where c.Active == true &&
                    c.Ref_Type == "Agent" && c.Ref_ID == agent_id &&
                    ((search_text == "") ||
                    (search_text != "" && (
                        c.UserID.Contains(search_text) ||
                        c.UserCode.Contains(search_text) ||
                        c.UserName.Contains(search_text) ||
                        c.Email.Contains(search_text)
                    )))

                    orderby c.UserName
                    select c).ToList();
        }

        public static List<SYS_UserView> GetAllUserByOrganization(string orgId, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserViews
                    where c.Active == true && c.OrgID == orgId
                    orderby c.UserName
                    select c).ToList();
        }

        public static string GetAllUserByOrganizationJson(string orgId, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            List<SYS_UserView> return_userlist = (from c in dc.SYS_UserViews
                                                  where c.Active == true && c.OrgID == orgId
                                                  orderby c.UserName
                                                  select c).ToList();

            string return_str = new JavaScriptSerializer().Serialize(return_userlist);
            return return_str;
        }

        public static List<SYS_UserView> GetAllUser(string search_text, string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserViews
                    where c.Active == true && c.OrgID == org_id &&

                    ((search_text == "") ||
                    (search_text != "" && (
                        c.UserID.Contains(search_text) ||
                        c.UserCode.Contains(search_text) ||
                        c.UserName.Contains(search_text) ||
                        c.Email.Contains(search_text)
                    )))

                    orderby c.UserName
                    select c).ToList();
        }
        public static SYS_UserView GetUser(string record_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserViews where c.UserID == record_id && c.Active == true select c).FirstOrDefault();
        }
        public static string SaveUser(
            string record_id, string user_id, string user_code, string org_id, string user_name,
            string user_email, string password, string contactinfo, string note, string role_id,
            string user_type,
            string RequestID)
        {
            try
            {

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_User the_record = new SYS_User();
                SYS_UserView the_view = new SYS_UserView();
                if (record_id == "" || record_id == null)
                {
                    the_record = (from c in dc.SYS_Users where c.UserCode == user_code && c.Active == true select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        string encryptpassword = Controller_TextEncryption.Encrypt(password, "");

                        the_record = new SYS_User()
                        {
                            Password = encryptpassword,
                            LastLogin = DateTime.Now,
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            UserID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.SYS_Users.InsertOnSubmit(the_record);
                    }
                    else return "DuplicateCode~";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.SYS_Users where c.UserID == record_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }

                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();
                the_record.RoleID = role_id;
                the_record.UserName = user_name;
                the_record.UserCode = user_code;
                the_record.Email = user_email;
                the_record.ContactInfo = contactinfo;
                the_record.Note = note;
                the_record.Ref_Type = user_type;
                the_record.OrgID = org_id;
                the_record.Ref_ID = "";

                dc.SubmitChanges();
                return "Success~" + the_record.UserID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string DeleteUser(string record_id, string user_id, string RequestID)
        {
            try
            {
                //Security Check
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_User the_record = (from c in dc.SYS_Users where c.UserID == record_id && c.Active == true select c).FirstOrDefault();
                if (the_record == null)
                    return "Error~We can't find";
                the_record.Active = false;
                the_record.ModifiedOn = DateTime.Now;
                the_record.ModifiedBy = user_id;
                the_record.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }

        public static SYS_UserView GetProfileUser(string userID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, userID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserViews where c.UserID == userID && c.Active == true select c).FirstOrDefault();
        }
    }
}