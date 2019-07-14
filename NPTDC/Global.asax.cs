using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace SBSPortal3
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        { 
            RouteTable.Routes.MapPageRoute("portal/login", "portal/login", "~/PortalAdministration/userInterfaces/moduleSystem/login/pageLogin.aspx");
            RouteTable.Routes.MapPageRoute("portal/forget", "portal/forget", "~/PortalAdministration/userInterfaces/moduleSystem/login/pagePasswordForget.aspx");
            RouteTable.Routes.MapPageRoute("portal/changepassword", "portal/changepassword", "~/PortalAdministration/userInterfaces/moduleSystem/login/pagechangePassword.aspx");
            RouteTable.Routes.MapPageRoute("portal/modules", "portal/modules", "~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/pageModules.aspx");
            RouteTable.Routes.MapPageRoute("portal/companyprofile", "portal/companyprofile", "~/PortalAdministration/userInterfaces/moduleSystem/systemCompanyProfile/pageCompanyProfile.aspx");
            RouteTable.Routes.MapPageRoute("portal/userdetail", "portal/userdetail", "~/PortalAdministration/userInterfaces/moduleSystem/systemUsers/pageSystemUserDetail.aspx");
            RouteTable.Routes.MapPageRoute("portal/users", "portal/users", "~/PortalAdministration/userInterfaces/moduleSystem/systemUsers/pageSystemUsers.aspx");
            RouteTable.Routes.MapPageRoute("portal/roles", "portal/roles", "~/PortalAdministration/userInterfaces/moduleSystem/systemUserRoles/pageSystemUserRoles.aspx"); 
            RouteTable.Routes.MapPageRoute("portal/programs", "portal/programs", "~/PortalAdministration/userInterfaces/moduleSystem/systemProgram/pageSystemProgram.aspx");
            RouteTable.Routes.MapPageRoute("portal/organizations", "portal/organizations", "~/PortalAdministration/userInterfaces/moduleSystem/systemOrganization/pageSystemOrganization.aspx");
            RouteTable.Routes.MapPageRoute("portal/organization", "portal/organization", "~/PortalAdministration/userInterfaces/moduleSystem/systemOrganization/pageSystmeOrganizationDetail.aspx");
            RouteTable.Routes.MapPageRoute("portal/menus", "portal/menus", "~/PortalAdministration/userInterfaces/moduleSystem/systemMenu/pageSystemMenu.aspx");
            RouteTable.Routes.MapPageRoute("portal/menugroup", "portal/menugroup", "~/PortalAdministration/userInterfaces/moduleSystem/systemMenu/pageSystemMenu.aspx");
            RouteTable.Routes.MapPageRoute("portal/logs", "portal/logs", "~/PortalAdministration/userInterfaces/moduleSystem/systemLog/pageSystemLog.aspx");
            RouteTable.Routes.MapPageRoute("portal/Attachment", "portal/Attachment", "~/PortalAdministration/userInterfaces/moduleSystem/systemImage/pageAttachment.aspx");

            //meeting
            RouteTable.Routes.MapPageRoute("portal/request", "portal/request", "~/PortalAdministration/userInterfaces/moduleMeeting/pageMETReuest.aspx");
            RouteTable.Routes.MapPageRoute("portal/requests", "portal/requests", "~/PortalAdministration/userInterfaces/moduleMeeting/pageMETRequests.aspx");
            //Master
            RouteTable.Routes.MapPageRoute("portal/departments", "portal/departments", "~/PortalAdministration/userInterfaces/moduleMaster/masterDepartment/pageDepartment.aspx");
            RouteTable.Routes.MapPageRoute("portal/positions", "portal/positions", "~/PortalAdministration/userInterfaces/moduleMaster/masterPosition/pagePosition.aspx");
            DevExpress.XtraReports.Web.ASPxWebDocumentViewer.StaticInitialize();
            DevExpress.XtraReports.Web.ASPxReportDesigner.StaticInitialize();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
          
        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}