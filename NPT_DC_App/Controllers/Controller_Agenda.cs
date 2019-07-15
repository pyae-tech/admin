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

        public static string SaveAgenda(
          string AgendaID,
          string AgendaDate,
          string AgendaNo,
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

    }
}