using System;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.Controllers
{
    public class Controller_SystemUser
    {
        public static SYS_UserView Do_Login(string usercode, string password)
        {            
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            string encryptpassword = Controller_TextEncryption.Encrypt(password, "");
            var the_userview =(from c in dc.SYS_UserViews where (c.Email.ToLower() == usercode.ToLower() || c.UserCode.ToLower() == usercode.ToLower() || c.Email == usercode) && c.Active == true && c.Password == encryptpassword select c).FirstOrDefault();
           
            return the_userview;          
           
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