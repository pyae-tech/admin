using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
namespace NPT_DC_App.Controllers
{
    public static class Controller_User_Access
    {
        public static bool CheckProgramAccess(string programCode, string requestID, string accessType)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_User the_user = (from c in dc.SYS_Users where c.UserID == requestID select c).FirstOrDefault();
                if (the_user == null) throw new Exception("System cannot find the user");

                SYS_UserRoleProgramView the_access = (from c in dc.SYS_UserRoleProgramViews where c.RoleID == the_user.RoleID && c.ProgramCode == programCode select c).FirstOrDefault();
                if (the_access == null) throw new Exception("System cannot find the access");
                           
                switch (accessType)
                {
                    case "all":
                        if (the_access.AllowCreate && the_access.AllowDelete && the_access.AllowUpdate && the_access.AllowView)
                           return true;                      
                        break;

                    case "read":
                        if (the_access.AllowView)
                            return true;
                        break;

                    case "delete":
                        if (the_access.AllowDelete)
                            return true;
                        break;

                    case "update":
                        if (the_access.AllowUpdate)
                            return true;
                        break;

                    case "create":
                        if (the_access.AllowCreate)
                            return true;
                        break;

                    case "decision":
                        if (the_access.AllowDecision)
                            return true;
                        break;
                    case "allDepartment":
                        if (the_access.AllowAllDepartment)
                            return true;
                        break;

                    default:
                        return false;
                        
                }

              
                return false;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}