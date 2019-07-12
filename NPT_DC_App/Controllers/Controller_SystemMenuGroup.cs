using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
using System.Data.Linq;

namespace NPT_DC_App.Controllers
{
    public class Controller_SystemMenuGroup
    {
        static string AccessProgramCode = "UserControl";
        static int RecordCountPerPage = 20;

        public static List<Object> GetAllSysMenuGroupWithPagination(string search_text, string search_sysmenugp, string RequestID, string PageNoString)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            int pageNo = 0; int.TryParse(PageNoString, out pageNo);

            //Get Skip Count
            int skip_count = (pageNo - 1) * RecordCountPerPage;

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();

            //Add into Query Statment
            var Query = (from sysm in dc.SYS_MenuGroupViews
                         where sysm.Active == true &&
                         ((search_text == "") ||
                         (search_text != "" && (
                             sysm.MenuGroupCode.Contains(search_text) ||
                             sysm.MenuGroupName.ToString().Contains(search_text)
                         ))) &&
                         ((search_sysmenugp == "") ||
                         (search_sysmenugp != "" && (
                             sysm.MenuGroupCode.Contains(search_sysmenugp) ||
                             sysm.MenuGroupName.ToString().Contains(search_sysmenugp)
                         )))
                         orderby sysm.MenuGroupSeq ascending
                         select sysm);

            //Get Total Record Count
            int TotalCount = Query.Count();
            //Get Total Number of Page
            int TotalPage = (TotalCount / RecordCountPerPage) + (TotalCount % RecordCountPerPage == 0 ? 0 : 1);

            List<Object> result = new List<object>();
            //Add overall pagination info on Index 0
            string previous_button = "y";
            if (pageNo == 1 || TotalPage == 1) previous_button = "n";
            string next_button = "y";
            if (pageNo == TotalPage) next_button = "n";
            if (TotalPage == 1)
            {
                previous_button = "n"; next_button = "n";
            }

            result.Add(TotalCount.ToString() + "~" + TotalPage.ToString() + "~" + pageNo.ToString() + "~" + previous_button + "~" + next_button);

            //Add Real Record Data from Index 1
            result.AddRange(new List<Object>(
                Query
                    .Skip(skip_count).Take(RecordCountPerPage) // Add Skip and Take Function
                    .ToList()));
            return result;
        }

        public static SYS_MenuGroupView GetSysMenuGroup(string menugp_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from sysmgp in dc.SYS_MenuGroupViews where sysmgp.MenuGroupID == menugp_id && sysmgp.Active == true select sysmgp).FirstOrDefault();
        }

        public static string SaveSysMenuGroup(string menugp_id, string user_id, string menu_gpcode, string menu_gpname, string menu_gpseq, string RequestID)
        {
            try
            {

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_MenuGroup the_record = new SYS_MenuGroup();
                if (menugp_id == "" || menugp_id == null)
                {
                    the_record = (from sysmgp in dc.SYS_MenuGroups where sysmgp.MenuGroupID == menugp_id && sysmgp.Active == true select sysmgp).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new SYS_MenuGroup()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            MenuGroupID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.SYS_MenuGroups.InsertOnSubmit(the_record);
                    }
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from sysmgp in dc.SYS_MenuGroups where sysmgp.MenuGroupID == menugp_id && sysmgp.Active == true select sysmgp).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");                                      
                }

                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();

                the_record.MenuGroupCode = menu_gpcode;
                the_record.MenuGroupName = menu_gpname;
                the_record.MenuGroupSeq = Convert.ToInt32(menu_gpseq.ToString());

                #region update the log

                SYS_MenuGroup log_obj = dc.GetChangeSet().Updates.OfType<SYS_MenuGroup>().FirstOrDefault();
                if (log_obj != null)
                {
                    if (Controller_SystemLog.WirteUpdateLog(dc.SYS_MenuGroups.GetModifiedMembers(log_obj).ToList(), the_record.MenuGroupID, RequestID) == false)
                    {
                        //Error fail to log.
                    }
                }
                #endregion


                dc.SubmitChanges();
                return "Success~" + the_record.MenuGroupName;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string DeleteSysMenuGroup(string menugp_id, string user_id, string RequestID)
        {
            try
            {
                //Security Check
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_MenuGroup the_record = (from sysmgp in dc.SYS_MenuGroups where sysmgp.MenuGroupID == menugp_id && sysmgp.Active == true select sysmgp).FirstOrDefault();
                if (the_record == null)
                    return "Error ~ We can't find";
                the_record.Active = false;
                the_record.ModifiedOn = DateTime.Now;
                the_record.ModifiedBy = user_id;
                the_record.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges();
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Error~"+ex.Message;
            }
        }
    }
}