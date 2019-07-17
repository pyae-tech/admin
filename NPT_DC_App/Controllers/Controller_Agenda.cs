using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace NPT_DC_App.Controllers
{
    public class Controller_Agenda
    {
        static string AccessProgramCode = "UserControl";
        public static string GetAllAgendaJSON(string search_text, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            //Get current user info
            SYS_UserView current_user = Controller_User.GetUser(RequestID, RequestID);
            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();

            //Security Check For AllDepartment
            string departmentID = "";
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "allDepartment"))
            {
                departmentID = current_user.DepartmentID;
            }
             List<MET_AgendaView> the_agendalist = (from c in dc.MET_AgendaViews
                                                   where c.Active == true &&    (departmentID==""|| (departmentID!="" && c.DepartmentID== departmentID)) &&
                                                       ((search_text == "") ||
                                                       (search_text != "" && (

                                                     c.AgendaNo.Contains(search_text) ||
                                                     c.AgendaRemark.Contains(search_text) ||
                                                     c.AgendaStatus.Contains(search_text) ||
                                                     c.CUserCode.Contains(search_text) ||
                                                     c.MUserCode.Contains(search_text)
                                                      )))
                                                   orderby c.CreatedOn descending
                                                   select c
                                                       ).ToList();
            var lists = new Newtonsoft.Json.Linq.JArray() as dynamic;

            foreach (var row in the_agendalist)
            {
                dynamic agenda = new Newtonsoft.Json.Linq.JObject();

                agenda.AgendaID = row.AgendaID;
                agenda.AgendaNo = row.AgendaNo;
                agenda.AgendaDate = row.AgendaDate.ToString();
                agenda.AgendaRemark = row.AgendaRemark;
                agenda.AgendaStatus = row.AgendaStatus;
                lists.Add(agenda);
            }

            return lists.ToString();

        }


        public static string SaveAgenda(
          string AgendaID,
          string AgendaDate,
          string AgendaNo,
          string AgendaNoLabel,
          string AgendaStatus,
          string AgendaHistory,
          string AgendaRemark,
          string UserID)
        {
            try
            {
                //Security Check
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, UserID, "read")) throw new Exception("No Access.");

                LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
                MET_Agenda the_agenda = new MET_Agenda();

                if (AgendaID == "")
                {
                    the_agenda = new MET_Agenda()
                    {
                        Active = true,
                        CreatedBy = UserID,
                        CreatedOn = DateTime.Now,
                        AgendaID = Guid.NewGuid().ToString(),
                        AgendaNo = Controller_RunningNo.GetNewRunningCode("Agenda", UserID),

                    };
                    AgendaID = the_agenda.AgendaID;
                    dc.MET_Agendas.InsertOnSubmit(the_agenda);
                }
                else
                {
                    the_agenda = (from c in dc.MET_Agendas where c.AgendaID == AgendaID select c).FirstOrDefault();
                    if (the_agenda == null) throw new Exception("System cannot find the record.");
                }

                DateTime agenda_date = DateTime.Today;
                DateTime.TryParseExact(AgendaDate, "yyyy/M/d", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out agenda_date);
                the_agenda.AgendaStatus = AgendaStatus;
                the_agenda.AgendaHistory = AgendaHistory;
                the_agenda.AgendaRemark = AgendaRemark;
                the_agenda.AgendaDate = agenda_date;
                the_agenda.AgendaNoLable = AgendaNoLabel;

                the_agenda.ModifiedBy = UserID;
                the_agenda.ModifiedOn = DateTime.Now;
                the_agenda.LastAction = Guid.NewGuid().ToString();


                #region update the log for Met_Agenda


                MET_Agenda log_obj = dc.GetChangeSet().Updates.OfType<MET_Agenda>().FirstOrDefault();
                if (log_obj != null)
                {
                    if (Controller_SystemLog.WirteUpdateLog(dc.MET_Agendas.GetModifiedMembers(log_obj).ToList(), AgendaID, UserID) == false)
                    {
                        //Error fail to log.
                    }
                }
                #endregion

                dc.SubmitChanges();


                return "Success~" + the_agenda.AgendaID + "~" + the_agenda.AgendaNo;
            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static MET_AgendaView GetAgendaByID(string agendaID, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            return (from c in dc.MET_AgendaViews where c.AgendaID == agendaID && c.Active == true select c).FirstOrDefault();
        }

        public static string DeleteAgenda(string agendaID, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            try
            {
                MET_Agenda agenda_record = new MET_Agenda();
                agenda_record = (from c in dc.MET_Agendas where c.AgendaID == agendaID && c.Active == true select c).FirstOrDefault();
                if (agenda_record == null)
                    return "Error~We can't find";
                agenda_record.Active = false;
                agenda_record.ModifiedOn = DateTime.Now;
                agenda_record.ModifiedBy = user_id;
                agenda_record.LastAction = Guid.NewGuid().ToString();

                #region Request in agenda
                List<MET_Request> req_list = new List<MET_Request>();
                req_list = (from c in dc.MET_Requests where c.AgendaID == agendaID && c.Active == true select c).ToList();
                foreach (MET_Request i in req_list)
                {
                    i.AgendaID = "";
                    i.RequestStatus = "Approved";
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

        public static string AddRequestToAgenda(string agendaID, string user_id)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, user_id, "update")) throw new Exception("No Access.");
            SYS_UserView current_user = Controller_User.GetUser(user_id, user_id);
            LINQ_MeetingDataContext dc = new LINQ_MeetingDataContext();
            try
            {
                MET_Agenda agenda_record = new MET_Agenda();
                string return_str = "";
                agenda_record = (from c in dc.MET_Agendas where c.AgendaID == agendaID && c.Active == true select c).FirstOrDefault();
                if (agenda_record == null)
                    return "Error~We can't find";


                #region Request in agenda
                //Security Check For AllDepartment
                string departmentID = "";
                if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, user_id, "allDepartment"))
                {
                    departmentID = current_user.DepartmentID;
                }

                List<MET_Request> req_list = new List<MET_Request>();
                req_list = (from c in dc.MET_Requests where c.RequestStatus == "Approved" &&
                            (departmentID == "" || (departmentID != "" && c.DepartmentID == departmentID)) &&
                            c.Active == true select c).ToList();

                if (req_list.Count > 0)
                {
                    foreach (MET_Request i in req_list)
                    {
                        i.AgendaID = agenda_record.AgendaID;
                        i.RequestStatus = "Agenda";
                        i.ModifiedBy = user_id;
                        i.ModifiedOn = DateTime.Now;
                    }

                    dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                    #region get all request
                    List<MET_RequestView> reqs_list = (from c in dc.MET_RequestViews
                                                       where c.Active == true && c.AgendaID == agendaID &&
                                                       (departmentID == "" || (departmentID != "" && c.DepartmentID == departmentID))
                                                       orderby c.Protocol ascending
                                                       select c).ToList();

                     return_str = new JavaScriptSerializer().Serialize(reqs_list);
                    #endregion
                    return "Success~" + return_str;
                }
                else
                {
                    return "Error~" + "There is no approved requests!";
                }
                #endregion


              
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }
    }
}