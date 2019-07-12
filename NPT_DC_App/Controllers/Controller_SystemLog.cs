using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq;

using NPT_DC_App.LINQs;
namespace NPT_DC_App.Controllers
{
    public class Controller_SystemLog
    {
        static string AccessProgramCode = "BaiscInfoAccess";
        static int RecordCountPerPage = 50;
        public static bool WirteUpdateLog(List<ModifiedMemberInfo> updated_fields, string record_id, string action_by)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SysLog log = new SysLog()
                {
                    LogBy = action_by,
                    LogDateTime = DateTime.Now,
                    RecordID = record_id,
                    Remark = "",
                    SystemLogID = Guid.NewGuid().ToString()
                };
                dc.SysLogs.InsertOnSubmit(log);

                List<SysLogItem> log_items = new List<SysLogItem>();
                foreach (ModifiedMemberInfo memberInfo in updated_fields)
                {
                    SysLogItem new_item = new SysLogItem()
                    {
                        SystemLogID = log.SystemLogID,
                        SystemLogItemID = Guid.NewGuid().ToString(),
                        FieldName = memberInfo.Member.Name
                    };
                    try
                    {
                        new_item.NewValue = memberInfo.CurrentValue.ToString();
                    }
                    catch (Exception ex) { new_item.NewValue = ""; }

                    try
                    {
                        new_item.OldValue = memberInfo.OriginalValue.ToString();
                    }
                    catch (Exception ex) { new_item.OldValue = ""; }
                    log_items.Add(new_item);
                }

                dc.SysLogItems.InsertAllOnSubmit(log_items);
                dc.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public static List<Object> GetLog(string RecordID, string RequestID, string PageNoString)
        {

            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            int pageNo = 0;
            int.TryParse(PageNoString, out pageNo);

            //Get Skip Count
            int skip_count = (pageNo - 1) * RecordCountPerPage;

            var Query = (from c in dc.SysLogViews where c.RecordID == RecordID select c).OrderByDescending(x => x.LogDateTime);

            //Get Total Record Count
            int TotalCount = Query.Count();
            //GetTotal Number of Page
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


        public static List<Object> GetLogItem(string LogID, string RequestID, string PageNoString)
        {
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            int pageNo = 0;
            int.TryParse(PageNoString, out pageNo);

            //Get Skip Count
            int skip_count = (pageNo - 1) * RecordCountPerPage;
            var Query = (from c in dc.SysLogItemViews where c.SystemLogID == LogID select c).OrderByDescending(x => x.SystemLogID);
            //Get Total Record Count
            int TotalCount = Query.Count();
            //GetTotal Number of Page
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
    }
}