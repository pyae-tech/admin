using NPT_DC_App.LINQs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_Request
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_Request : System.Web.Services.WebService
    {

        [WebMethod]
        public string GetAllRequestJSON(string search_text,string RequestID)
        {
            return Controllers.Controller_Request.GetAllRequestJSON(search_text, RequestID);
        }

        [WebMethod]
        public string GetAllRequestItemsJson(string meeting_reqID, string org_id, string RequestID)
        {
            return Controllers.Controller_Request.GetAllRequestItemsJson(meeting_reqID, org_id, RequestID);
        }
        [WebMethod]
        public string GetAllRequestDecisionJson(string meeting_reqID, string org_id, string RequestID)
        {
            return Controllers.Controller_Request.GetAllRequestDecisionJson(meeting_reqID, org_id, RequestID);
        }
        

        [WebMethod]
        public string SaveRequest(
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
            return Controllers.Controller_Request.SaveRequest(
            RequestID,
            DepartmentID,
            RequestType,
            RequestNo,
            RequestBy,
            RequestTitle,
            RequestStatus,
            RequestOn,
            MeetingID,
            Remark,
            ApprovedBy,
            ApprovedOn,
            ApprovedRemark,
            Description,
            UserID,
            Requestitems,
            RequestDecisions);
        }

        [WebMethod]
        public MET_RequestView GetRequestByID(string meeting_reqID, string RequestID)
        {
            return Controllers.Controller_Request.GetRequestByID(meeting_reqID, RequestID);
        }

        [WebMethod]
        public string DeleteRequest(string meetingreq_id, string user_id, string RequestID)
        {
            return Controllers.Controller_Request.DeleteRequest(meetingreq_id, user_id,RequestID);
        }

        

    }
}
