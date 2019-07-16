using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Agenda
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Agenda : System.Web.Services.WebService
    {

        [WebMethod]
        public string SaveAgenda(
          string AgendaID,
          string AgendaDate,
          string AgendaNo,
          string AgendaNoLabel,
          string AgendaStatus,
          string AgendaHistory,
          string AgendaRemark,
          string UserID)
        {
            return Controllers.Controller_Agenda.SaveAgenda( AgendaID,
           AgendaDate,
           AgendaNo,
           AgendaNoLabel,
           AgendaStatus,
           AgendaHistory,
           AgendaRemark,
           UserID);
        }

        [WebMethod]
        public string GetAllAgendaJSON(string search_text, string RequestID)
        {
            return Controllers.Controller_Agenda.GetAllAgendaJSON(search_text, RequestID);
        }

        [WebMethod]
        public MET_AgendaView GetAgendaByID(string agendaID, string RequestID)
        {
            return Controllers.Controller_Agenda.GetAgendaByID(agendaID, RequestID);
        }
        [WebMethod]
        public string DeleteAgenda(string agendaID, string user_id, string RequestID)
        {
            return Controllers.Controller_Agenda.DeleteAgenda(agendaID, user_id, RequestID);
        }

        [WebMethod]
        public string AddRequestToAgenda(string agendaID, string user_id)
        {
            return Controllers.Controller_Agenda.AddRequestToAgenda(agendaID, user_id);
        }

    }
}
