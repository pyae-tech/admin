using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace NPT_DC_App.Controllers
{
    public class Controller_Request
    {
        static string AccessProgramCode = "UserControl";


        public static void do_populate_print_description(string RequestID)
        {
            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            MET_Request the_request=(from c in dc.MET_Requests where c.RequestID == RequestID && c.Active == true select c).FirstOrDefault();
            if (the_request == null) throw new Exception("No recrod found");

            string PrintDescription = "အကြောင်းအရာ။  <b>" + the_request.RequestTitle+ "</b><br/><br/>";


           List< MET_RequestItem> the_items=(from c in dc.MET_RequestItems where c.RequestID == RequestID && c.Active == true orderby c.Seq select c).ToList();

            int display_seq = 1;

            foreach (MET_RequestItem item in the_items)
            {
                PrintDescription = PrintDescription +
                    display_seq.ToString() + "။  " + item.RequestItem + "။<br/><br/>";

                display_seq = display_seq + 1;

            }

            the_request.PrintDescription = PrintDescription;

            List<MET_RequestDecision> the_decisions = (from c in dc.MET_RequestDecisions where c.RequestID == RequestID && c.Active == true orderby c.Seq select c).ToList();
            if (the_decisions == null) return;
            int decision_seq = display_seq;
            string PrintDecision = "";
            if (the_decisions.Count == 1)
            {
                foreach(MET_RequestDecision decision in the_decisions)
                {
                    PrintDecision = decision_seq + "။  " + "ဆုံးဖြတ်ရန် အချက်။ " +decision.Description +"။<br/><br/>";
                }
                
            }
            else
            {
                PrintDecision = decision_seq + "။  " + "ဆုံးဖြတ်ရန် အချက်။  " + "<br/><br/>";
                int dec_seq = 1;
                foreach (MET_RequestDecision decision in the_decisions)
                {
                    
                    PrintDecision = PrintDecision 
                              +"&nbsp;"+  dec_seq.ToString() + "။  " + decision.Description + "။<br/><br/>";
                    dec_seq = dec_seq + 1;
                }
            };

            the_request.PrintDecision = PrintDecision;
            dc.SubmitChanges();


        }
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
                request.DepartmentName = row.DepartmentName;
                lists.Add(request);
            }

            return lists.ToString();

        }

        public static string GetAllRequestItemsJson(string meeting_requsetID, string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            List<MET_RequestItemView> reqitems_list = (from c in dc.MET_RequestItemViews
                                                       where c.Active == true && c.OrgID == org_id && c.RequestID == meeting_requsetID
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
                                                              where c.Active == true && c.OrgID == org_id && c.RequestID == meeting_requsetID
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
                the_request.AgendaID = MeetingID;
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
                    string[] combine_decisions = new string[decisions.Count];
                    int count = 0;
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
                            combine_decisions[count] = decisionInfo[1];
                            count++;

                        }
                    }
                    
                    dc.MET_RequestDecisions.InsertAllOnSubmit(request_decisions);
                    the_request.CombineDecision = string.Join(",", combine_decisions); 
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

                do_populate_print_description(the_request.RequestID);

                //#region Conbine Decisions
                //the_request.CombineDecision = dc.MET_CombineDecisionsOfRequest(the_request.RequestID).ToString();
                //#endregion
                //dc.SubmitChanges();

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

        public static string DeleteRequest(string meetingreq_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            try
            {
                MET_Request request_record = new MET_Request();
                request_record = (from c in dc.MET_Requests where c.RequestID == meetingreq_id && c.Active == true select c).FirstOrDefault();
                if (request_record == null)
                    return "Error~We can't find";
                request_record.Active = false;
                request_record.ModifiedOn = DateTime.Now;
                request_record.ModifiedBy = user_id;
                request_record.LastAction = Guid.NewGuid().ToString();

                #region Request Item
                List<MET_RequestItem> item_list = new List<MET_RequestItem>();
                item_list = (from c in dc.MET_RequestItems where c.RequestID == meetingreq_id && c.Active == true select c).ToList();
                foreach (MET_RequestItem i in item_list)
                {
                    i.Active = false;
                    i.ModifiedBy = RequestID;
                    i.ModifiedOn = DateTime.Now;
                }
                #endregion

                #region Request Decision
                List<MET_RequestDecision> decision_list = new List<MET_RequestDecision>();
                decision_list = (from c in dc.MET_RequestDecisions where c.RequestID == meetingreq_id && c.Active == true select c).ToList();
                foreach (MET_RequestDecision i in decision_list)
                {
                    i.Active = false;
                    i.ModifiedBy = RequestID;
                    i.ModifiedOn = DateTime.Now;
                }
                #endregion

                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }


        public static string LoadRequestByAgendaID(string agendaID, string user_id)
        {
            ////Security Check
            //if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, user_id, "select")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            try
            {
                
                #region get all request
                List<MET_RequestView> reqs_list = (from c in dc.MET_RequestViews
                                                   where c.Active == true && c.AgendaID == agendaID
                                                   orderby c.Protocol ascending
                                                   select c).ToList();

                string return_str = new JavaScriptSerializer().Serialize(reqs_list);
                #endregion


                return "Success~" + return_str;
            }
            catch (Exception ex)
            {
                return "Success~";
            }
        }

        public static string ChangeCombineDecision(string agendaID,string meetingreq_id,string edited_decision, string user_id)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, user_id, "update")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            try
            {
                MET_Request request_record = new MET_Request();
                request_record = (from c in dc.MET_Requests where c.RequestID == meetingreq_id && c.Active == true select c).FirstOrDefault();
                if (request_record == null)
                    return "Error~We can't find";
                request_record.CombineDecision = edited_decision;
                request_record.ModifiedOn = DateTime.Now;
                request_record.ModifiedBy = user_id;
                request_record.LastAction = Guid.NewGuid().ToString();

                dc.SubmitChanges(ConflictMode.ContinueOnConflict);

                #region get all request
                List<MET_RequestView> reqs_list = (from c in dc.MET_RequestViews
                                                   where c.Active == true && c.AgendaID == agendaID
                                                   orderby c.Protocol ascending
                                                   select c).ToList();

                string return_str = new JavaScriptSerializer().Serialize(reqs_list);
                #endregion
                return "Success~"+ return_str;
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
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