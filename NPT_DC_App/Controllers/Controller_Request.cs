using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace NPT_DC_App.Controllers
{
    public class Controller_Request
    {
        static string AccessProgramCode = "UserControl";

        public static string GetAllRequestJSON(string search_text, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            //Get current user info
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();

            List<MET_RequestView> the_requestlist = (from c in dc.MET_RequestViews
                                                     where c.Active == true && c.OrgID == current_user.OrgID &&
                                                       ((search_text == "") ||
                                                       (search_text != "" && (

                                                     c.RequestNo.Contains(search_text) ||
                                                     c.RequestStatus.Contains(search_text) ||
                                                     c.RequestTitle.Contains(search_text) ||
                                                     c.RequestType.Contains(search_text) ||
                                                      c.Description.Contains(search_text) ||
                                                      c.Remark.Contains(search_text) ||
                                                      c.DepartmentName.Contains(search_text))))
                                                       orderby c.CreatedOn descending
                                                       select c
                                                       ).ToList();
            var lists = new Newtonsoft.Json.Linq.JArray() as dynamic;

            foreach (var row in the_requestlist)
            {             
                dynamic request = new Newtonsoft.Json.Linq.JObject();

                request.RequestID = row.RequestID;
                request.DepartmentID = row.DepartmentID;
                request.RequestType = row.RequestType;
                request.RequestNo = row.RequestNo;
                request.RequestUserName = row.RequestUserName;
                request.RequestTitle = row.RequestTitle;
                request.RequestStatus = row.RequestStatus;
                request.RequestOn = row.RequestOn;
                lists.Add(request);
            }

            return lists.ToString();
          
        }

        public static string GetAllRequestItemsJson(string meeting_requsetID,string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            List<MET_RequestItemView> reqitems_list = (from c in dc.MET_RequestItemViews
                                               where c.Active == true && c.OrgID == org_id && c.RequestID==meeting_requsetID
                                            orderby c.Seq
                                            select c).ToList();
            string return_str = new JavaScriptSerializer().Serialize(reqitems_list);
            return return_str;
        }

        public static string GetAllRequestDecisionJson(string meeting_requsetID, string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            List<MET_RequestDecisionView> reqdecision_list = (from c in dc.MET_RequestDecisionViews
                                                           where c.Active == true && c.OrgID == org_id && c.RequestID== meeting_requsetID
                                                           orderby c.Seq
                                                       select c).ToList();
            string return_str = new JavaScriptSerializer().Serialize(reqdecision_list);
            return return_str;
        }

        public static string SaveRequest(
           string RequestID,
           string DepartmentID,
           string RequestType,
           string RequestNo,
           string RequestBy,
           string RequestTitle,
           string RequestStatus,
           string RequestOn,
           string MeetingID,
           string Remark,
           string ApprovedBy,
           string ApprovedOn,
           string ApprovedRemark,
           string Description,
           string UserID,
           string Requestitems,
           string RequestDecisions)
        {
            try
            {
                //Security Check
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, UserID, "read")) throw new Exception("No Access.");

                LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
                MET_Request the_request = new MET_Request();
             
                if (RequestID == "")
                {
                    the_request = new MET_Request()
                    {
                        Active = true,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        RequestID = Guid.NewGuid().ToString(),
                        RequestNo = Controller_RunningNo.GetNewRunningCode("Request", UserID),


                        ApprovedBy = "",
                        ApprovedOn = DateTime.Now,
                        ApprovedRemark = "",
                        ApprovalStatus = ""
                    };
                    RequestID = the_request.RequestID;
                    dc.MET_Requests.InsertOnSubmit(the_request);
                }
                else
                {
                    the_request = (from c in dc.MET_Requests where c.RequestID == RequestID select c).FirstOrDefault();
                    if (the_request == null) throw new Exception("System cannot find the record.");
                }

                DateTime request_on = DateTime.Today;
                DateTime.TryParseExact(RequestOn, "yyyy/M/d", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out request_on);
                the_request.RequestType = RequestType;
                the_request.RequestBy = RequestBy;
                the_request.RequestTitle = RequestTitle;
                the_request.DepartmentID = DepartmentID;

                the_request.RequestStatus = RequestStatus;
                the_request.RequestOn = request_on;
                the_request.MeetingID = MeetingID;
                the_request.Remark = Remark.Replace("%27", ""); 
                the_request.Description = Description.Replace("%27", ""); 

                the_request.ModifiedBy = UserID;
                the_request.ModifiedOn = DateTime.Now;
                the_request.LastAction = Guid.NewGuid().ToString();               


                #region Clear previous items
                List<MET_RequestItem> req_old_items = (from c in dc.MET_RequestItems
                                                           where c.RequestID == the_request.RequestID
                                                           && c.Active == true
                                                           select c).ToList();
                if (req_old_items != null)
                {
                    dc.MET_RequestItems.DeleteAllOnSubmit(req_old_items);
                }
                #endregion
                

                #region Request Items

                if (Requestitems != "")
                {
                    List<MET_RequestItem> request_items = new List<MET_RequestItem>();
                    List<string> items = Requestitems.Split('~').ToList();
                    foreach (string item in items)
                    {
                        if (item != "")
                        {
                            List<string> itemInfo = item.Split('^').ToList();
                           
                            request_items.Add(new MET_RequestItem()
                            {
                                CreatedBy = UserID,
                                CreatedOn = DateTime.Now,
                                ModifiedBy = UserID,
                                ModifiedOn = DateTime.Now,
                                Active = true,
                                LastAction = Guid.NewGuid().ToString(),
                                RequestID = the_request.RequestID,
                                RequestItemID = itemInfo[0],
                                RequestItem = itemInfo[1],
                                Seq = convertToDecimal(itemInfo[2]),
                                });
                            
                        }
                    }
                    dc.MET_RequestItems.InsertAllOnSubmit(request_items);
                }

                #endregion

                #region Request Decision

                #region Clear previous items
                List<MET_RequestDecision> req_old_decisions = (from c in dc.MET_RequestDecisions
                                                               where c.RequestID == the_request.RequestID
                                                       && c.Active == true
                                                       select c).ToList();
                if (req_old_decisions != null)
                {
                    dc.MET_RequestDecisions.DeleteAllOnSubmit(req_old_decisions);
                }
                #endregion
                if (RequestDecisions != "")
                {
                    List<MET_RequestDecision> request_decisions = new List<MET_RequestDecision>();
                    List<string> decisions = RequestDecisions.Split('~').ToList();
                    foreach (string decision in decisions)
                    {
                        if (decision != "")
                        {
                            List<string> decisionInfo = decision.Split('^').ToList();

                            request_decisions.Add(new MET_RequestDecision()
                            {
                                CreatedBy = UserID,
                                CreatedOn = DateTime.Now,
                                ModifiedBy = UserID,
                                ModifiedOn = DateTime.Now,
                                Active = true,
                                LastAction = Guid.NewGuid().ToString(),
                                RequestID = the_request.RequestID,
                                RequestDecisionID = decisionInfo[0],
                                Description = decisionInfo[1],
                                Seq = convertToDecimal(decisionInfo[2]),
                            });

                        }
                    }
                    dc.MET_RequestDecisions.InsertAllOnSubmit(request_decisions);
                }

                #endregion

                #region update the log for POS_SellVouncher

                MET_Request log_obj = dc.GetChangeSet().Updates.OfType<MET_Request>().FirstOrDefault();
                if (log_obj != null)
                {
                    if (Controller_SystemLog.WirteUpdateLog(dc.MET_Requests.GetModifiedMembers(log_obj).ToList(), RequestID, UserID) == false)
                    {
                        //Error fail to log.
                    }
                }
                #endregion

                dc.SubmitChanges();          


                return "Success~" + the_request.RequestID + "~" + the_request.RequestNo;
            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static MET_RequestView GetRequestByID(string meeting_reqID, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            return (from c in dc.MET_RequestViews where c.RequestID == meeting_reqID && c.Active == true select c).FirstOrDefault();
        }


        static decimal convertToDecimal(string value)
        {
            decimal amount = 0;
            if (decimal.TryParse(value, out amount))
                return amount;
            else
                return 0;
        }
    }
}