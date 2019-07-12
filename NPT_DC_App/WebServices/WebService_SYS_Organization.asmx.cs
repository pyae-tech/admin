using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_SYS_Organization
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_SYS_Organization : System.Web.Services.WebService
    {

        [WebMethod]
        public List<Object> GetAllOrganizationWithPagination(string search_text, string search_org, string RequestID, string PageNoString)
        {
            return Controllers.Controller_SYS_Organization.GetAllOrganizationWithPagination(search_text, search_org, RequestID, PageNoString);
        }

        [WebMethod]
        public List<SYS_Organization> GetOrganizations()
        {
            return Controllers.Controller_SYS_Organization.GetOrganizations();
        }

        [WebMethod]
        public List<SYS_OrganizationView> GetAllOrganization(string search_text, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.GetAllOrganization(search_text, RequestID);
        }

        [WebMethod]
        public SYS_OrganizationView GetOrganization(string org_id, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.GetOrganization(org_id, RequestID);
        }

        [WebMethod]
        public string DeleteOrganization(string org_id, string user_id, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.DeleteOrganization(org_id, user_id, RequestID);
        }

        [WebMethod]
        public string SaveOrganization(string org_id, string user_id, string org_name, string org_code, string orgType,
            string joint_date, string expiry_date, string InvoiceAccountName, string InvoiceAccountNo, string user_count, string orgplan,
            string Website, string Facebook, string Email,string PhoneNo, string Address,string InvoiceType,
            string remark, string remark1, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.SaveOrganization(org_id, user_id, org_name, org_code, orgType,
             joint_date, expiry_date, InvoiceAccountName, InvoiceAccountNo, user_count, orgplan, Website,Facebook,Email, PhoneNo,Address, InvoiceType,
             remark, remark1, RequestID);

        }

        [WebMethod]
        public string do_saveorganization(string org_id, string org_name, string org_code)
        {
            var restul = Controllers.Controller_SYS_Organization.do_saveorganization(org_id, org_name, org_code);

            return restul;
        }

        [WebMethod]
        public List<SYS_GetOrganizationMenuGroupResult> GetOrganizationMenuGroup(string org_id, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.GetOrganizationMenuGroup(org_id, RequestID);
        }

        [WebMethod]
        public string SetOrganizationMenuGroup(string org_id, string menugp_id, string type, string data, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.SetOrganizationMenuGroup(org_id, menugp_id, type, data, RequestID);
        }

        [WebMethod]
        public List<SYS_OrganizationMenuGroupView> Check_OrgViewPermission(string org_id, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.Check_OrgViewPermission(org_id, RequestID);
        }

        [WebMethod]
        public List<SYS_OrganizationView> GetOrganizationByID(string org_id, string RequestID)
        {
            return Controllers.Controller_SYS_Organization.GetOrganizationByID(org_id, RequestID);
        }

        [WebMethod]
        public SYS_OrganizationView GetCompanyProfile(string org_id,string RequestID)
        {
            return Controllers.Controller_SYS_Organization.GetCompanyProfile(org_id,RequestID);
        }
    }
}
