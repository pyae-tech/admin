using System;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
using System.Collections.Generic;
using static NPT_DC_App.Controllers.model;

namespace NPT_DC_App.Controllers
{
    public class Controller_SystemUser
    {     
        public static Return_login Do_Login(string usercode, string password)
        {            
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            Return_login return_login = new Return_login();
            string encryptpassword = Controller_TextEncryption.Encrypt(password, "");
            var the_userview =(from c in dc.SYS_UserViews
                               where (c.Email.ToLower() == usercode.ToLower() || c.UserCode.ToLower() == usercode.ToLower() || c.Email == usercode) && 
                               c.Active == true && c.Password == encryptpassword
                               select new SYS_UserView 
                               {
                                   UserID = c.UserID,
                                   UserCode = c.UserCode,
                                   UserName = c.UserName,
                                   Email = c.Email,
                                   Ref_Type = c.Ref_Type,
                                   Ref_ID = c.Ref_ID,
                                   RoleID = c.RoleID,
                                   RoleCode = c.RoleCode,
                                   DepartmentID = c.DepartmentID,
                                   DepartmentName = c.DepartmentName
                               }).FirstOrDefault();
            return_login.user_data = the_userview;

            if (the_userview != null)
            {
                SYS_UserRoleProgramView usercontrol= (from c in dc.SYS_UserRoleProgramViews
                                                      where c.RoleID == the_userview.RoleID && c.ProgramCode == "UserControl"
                                                     select c).FirstOrDefault();
                if (usercontrol != null)
                {
                    Access usercontrol_access = new Access
                    {
                        AllowView = usercontrol.AllowView,
                        AllowDelete = usercontrol.AllowDelete,
                        AllowUpdate=usercontrol.AllowUpdate,
                        AllowCreate = usercontrol.AllowCreate,
                        AllowDecision = usercontrol.AllowDecision,
                        AllowAllDepartment = usercontrol.AllowAllDepartment

                    };
                    return_login.UserControl = usercontrol_access;
                }

                SYS_UserRoleProgramView meetingrequst = (from c in dc.SYS_UserRoleProgramViews where c.RoleID == the_userview.RoleID && c.ProgramCode == "MeetingRequest" select c).FirstOrDefault();
                if (meetingrequst != null)
                {
                    Access meetingrequst_access = new Access
                    {
                        AllowView = meetingrequst.AllowView,
                        AllowDelete = meetingrequst.AllowDelete,
                        AllowCreate = meetingrequst.AllowCreate,
                        AllowUpdate = meetingrequst.AllowUpdate,
                        AllowDecision = meetingrequst.AllowDecision,
                        AllowAllDepartment = meetingrequst.AllowAllDepartment

                    };
                    return_login.MeetingRequest = meetingrequst_access;
                }

                SYS_UserRoleProgramView sysConfig = (from c in dc.SYS_UserRoleProgramViews where c.RoleID == the_userview.RoleID && c.ProgramCode == "SysConfig" select c).FirstOrDefault();
                if (sysConfig != null)
                {
                    Access sysConfig_access = new Access
                    {
                        AllowView = sysConfig.AllowView,
                        AllowDelete = sysConfig.AllowDelete,
                        AllowCreate = sysConfig.AllowCreate,
                        AllowUpdate = sysConfig.AllowUpdate,
                        AllowDecision = sysConfig.AllowDecision,
                        AllowAllDepartment = sysConfig.AllowAllDepartment

                    };
                    return_login.SysConfig = sysConfig_access;
                }

                SYS_UserRoleProgramView meetingAgenda = (from c in dc.SYS_UserRoleProgramViews where c.RoleID == the_userview.RoleID && c.ProgramCode == "MeetingAgenda" select c).FirstOrDefault();
                if (meetingAgenda != null)
                {
                    Access meetingAgenda_access = new Access
                    {
                        AllowView = meetingAgenda.AllowView,
                        AllowDelete = meetingAgenda.AllowDelete,
                        AllowCreate = meetingAgenda.AllowCreate,
                        AllowUpdate = meetingAgenda.AllowUpdate,
                        AllowDecision = meetingAgenda.AllowDecision,
                        AllowAllDepartment = meetingAgenda.AllowAllDepartment

                    };
                    return_login.MeetingAgenda = meetingAgenda_access;
                }

                SYS_UserRoleProgramView meetingMinute = (from c in dc.SYS_UserRoleProgramViews where c.RoleID == the_userview.RoleID && c.ProgramCode == "MeetingMinute" select c).FirstOrDefault();
                if (meetingMinute != null)
                {
                    Access meetingMinute_access = new Access
                    {
                        AllowView = meetingMinute.AllowView,
                        AllowDelete = meetingMinute.AllowDelete,
                        AllowCreate = meetingMinute.AllowCreate,
                        AllowUpdate = meetingMinute.AllowUpdate,
                        AllowDecision = meetingMinute.AllowDecision,
                        AllowAllDepartment = meetingMinute.AllowAllDepartment

                    };
                    return_login.MeetingMinute = meetingMinute_access;
                }
              
            }



            return return_login;          
           
        }        

        private static bool isAlreadyLoggedIn(SYS_User the_user)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            DateTime now = DateTime.Now;

            TimeSpan duration = now - the_user.LastLogin;

            if (duration.TotalMinutes > 15) // after login 
                return false;
            else if (the_user.IsLoggedIn)
                return true;
            return false;
        }

        public static string do_logout(bool isclicklogout,string userid)
        {          
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_User the_user = new SYS_User();
                the_user = (from u in dc.SYS_Users where u.UserID == userid select u).FirstOrDefault();
                the_user.IsLoggedIn = false;
                dc.SubmitChanges();
                if(isclicklogout)
                {
                    HttpContext.Current.Session["userid"] = string.Empty;
                    HttpContext.Current.Session.Clear();
                }
                              
                return "Success~";


            } catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }           
        }

         
        public static string do_signup(string fname, string lname, string orgid,string email,string password,string provider)
        {
            var result = Controllers.Controller_Common.do_verifyemail(email);
            if (result != "ok")
                return "Error~ Your email address is invalid!";

            if (IsSystemUserAlreadyExistByEmail(email))
                return "Error~ This email address is already registered!";

            try
            {
                string encryptpassword = provider =="sbs"? Controller_TextEncryption.Encrypt(password, ""):string.Empty;
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_User the_record = new SYS_User
                {
                    UserID = Guid.NewGuid().ToString(),
                    UserName = fname.Trim() + " " + lname.Trim(),
                    UserCode = string.Empty,
                    Email = email,
                    OrgID = orgid,
                    Password = encryptpassword,
                    ContactInfo = string.Empty,
                    CreatedBy = "4",
                    CreatedOn = DateTime.Now,
                    ModifiedBy = "4",
                    ModifiedOn = DateTime.Now,
                    RoleID = "32232403-daa3-4a09-9615-a88285ba3735",
                    LastAction = Guid.NewGuid().ToString(),
                    LastLogin = DateTime.Now,
                    Active = true,
                    Note = string.Empty,
                    Ref_ID = string.Empty,
                    Ref_Type = string.Empty
                };

                dc.SYS_Users.InsertOnSubmit(the_record);
                dc.SubmitChanges();

                return "Success~" + the_record.UserID;

            } catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }
        public static SYS_UserView Do_Agent_Login(string usercode, string password)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            string encryptpassword = Controller_TextEncryption.Encrypt(password, "");
            return (from c in dc.SYS_UserViews where (c.Email.ToLower() == usercode.ToLower() || c.UserCode.ToLower() == usercode.ToLower()) && c.Active == true && c.Password == encryptpassword select c).FirstOrDefault();

        }
        public static string Do_Change_Password(string userid, string oldpassword, string newpassword)
        {

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_User currentuser = (from c in dc.SYS_Users where c.UserID == userid && c.Password == Controller_TextEncryption.Encrypt(oldpassword, "") && c.Active == true select c).FirstOrDefault();
            if (currentuser != null)
            {
                currentuser.Password = Controller_TextEncryption.Encrypt(newpassword, "");
                currentuser.ModifiedOn = DateTime.Now;
                currentuser.ModifiedBy = userid;
                currentuser.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges();

                return "Success~";
            }
            else
            {
                return "Error~Your Old Password Is Not Valid Please Chack Your Old Password And Try Again";
            }
        }

        private static bool IsSystemUserAlreadyExistByEmail(string email)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_User result = (from c in dc.SYS_Users where c.Active && c.Email == email select c).FirstOrDefault();
            if (result != null)
                return true;
            return false;
        }
        public static string ForgotPassword(string to_mail)
        {           

            string result = string.Empty;
            try
            {
                if (!IsSystemUserAlreadyExistByEmail(to_mail))
                {
                    result = "This email didn't register yet!";
                }
                else
                {
                    var password = Controllers.Controller_Common.GeneratePassword();
                    string encryptpassword = Controllers.Controller_TextEncryption.Encrypt(password, "");
                    SYS_User user = new SYS_User();
                    LINQ_SystemDataContext dc = new LINQ_SystemDataContext();

                    user = (from c in dc.SYS_Users
                            where c.Email == to_mail && c.Active
                            select c).FirstOrDefault();
                    user.Password = encryptpassword;
                    user.LastAction = Guid.NewGuid().ToString();
                    user.ModifiedBy = "4";
                    user.ModifiedOn = DateTime.Now;
                    dc.SubmitChanges();

                    string EmailSubject = "Password Recovery";
                    string email_body = "Hi <UserName>,<br/><br/>Thank you for using Systematic Business Solution System.<br/<br/>You can login your account by new password <b><Password><b>.<br/<br/> Thank you. <br/><br/> ";

                    email_body = email_body.Replace("<UserName>", user.UserName).Replace("<Password>", password);

                    var result1 = Controllers.Controller_EmailHelper.SendEmail(to_mail, EmailSubject, email_body, null, null);
                    if (result1 != "success")
                        throw new Exception(result1);

                    result = "success";
                }
               
            }
            catch (Exception ex)
            {
                //Controller_SysLog.CreateSysLog("System User Forgot Password", to_mail, ex.Message, ex.Message);
                result = "Please try again!";
            }

            return result;
        }

        public static string do_getorganization(string email)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
          var org =  (from c in dc.SYS_UserViews where c.Email == email select c).FirstOrDefault();
            if (org != null)
                return "Success~" + org.OrgID;
            return string.Empty;
        }
     
    }
}