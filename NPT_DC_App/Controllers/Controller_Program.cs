using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
namespace NPT_DC_App.Controllers
{
    public static class Controller_Program
    {
        static string AccessProgramCode = "SysConfig";
        public static List<SYS_ProgramView> GetAllProgram(string search_text, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_ProgramViews
                    where c.Active == true &&

                    ((search_text == "") ||
                    (search_text != "" && (
                        c.ProgramID.Contains(search_text) ||
                        c.ProgramName.Contains(search_text) ||
                        c.ProgramCode.Contains(search_text)
                    )))

                    orderby c.ProgramName
                    select c).ToList();
        }
        public static SYS_ProgramView GetProgram(string record_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_ProgramViews where c.ProgramID == record_id && c.Active == true select c).FirstOrDefault();
        }
        public static string SaveProgram(string record_id, string user_id, string program_name, string program_code, string RequestID)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_Program the_record = new SYS_Program();
                if (record_id == "" || record_id == null)
                {
                    the_record = (from c in dc.SYS_Programs where c.ProgramCode == program_code && c.Active == true select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new SYS_Program()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            ProgramID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.SYS_Programs.InsertOnSubmit(the_record);
                    }
                    else return "Error~Duplicate Country Code";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.SYS_Programs where c.ProgramID == record_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();

                the_record.ProgramName = program_name;
                the_record.ProgramCode = program_code;
                dc.SubmitChanges();
                return "Success~" + the_record.ProgramID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }
        public static string DeleteProgram(string record_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_Program the_record = (from c in dc.SYS_Programs where c.ProgramID == record_id && c.Active == true select c).FirstOrDefault();
            if (the_record == null)
                return "Error~We can't find";
            the_record.Active = false;
            the_record.ModifiedOn = DateTime.Now;
            the_record.ModifiedBy = user_id;
            the_record.LastAction = Guid.NewGuid().ToString();
            dc.SubmitChanges();
            return "Success~";
        }
    }
}