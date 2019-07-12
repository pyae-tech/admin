using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.WebServices
{
    /// <summary>
    /// Summary description for WebService_System
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_System : System.Web.Services.WebService
    {

        [WebMethod]
        public SYS_UserView do_login(string usercode, string password)
        {
            return Controllers.Controller_SystemUser.Do_Login(usercode, password);
        }

        [WebMethod]
        public SYS_UserView do_agent_login(string usercode, string password)
        {
            return Controllers.Controller_SystemUser.Do_Agent_Login(usercode, password);
        }
        [WebMethod]
        public string Do_Change_Password(string userid, string oldpassword, string newpassword)
        {
            return Controllers.Controller_SystemUser.Do_Change_Password(userid, oldpassword, newpassword);
        }

        [WebMethod]
        public string do_getorganization(string email)
        {
            return Controllers.Controller_SystemUser.do_getorganization(email);
        }

        [WebMethod]
        public string do_signup(string fname, string lname, string orgid, string email, string password, string provider)
        {
            return Controllers.Controller_SystemUser.do_signup(fname, lname, orgid, email, password, provider);
        }

        [WebMethod]
        public string do_logout(bool isclicklogout, string userid)
        {
            return Controllers.Controller_SystemUser.do_logout(isclicklogout,userid);
        }
      
    }
}
