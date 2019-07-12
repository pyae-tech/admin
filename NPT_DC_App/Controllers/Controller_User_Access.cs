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

                if (accessType == "all")
                {
                    if (the_access.AllowCreate && the_access.AllowDelete && the_access.AllowUpdate && the_access.AllowView)
                        return true;
                }
                else if (accessType == "read")
                {
                    if (the_access.AllowView)
                        return true;
                }
                else if (accessType == "delete")
                {
                    if (the_access.AllowDelete)
                        return true;
                }
                else if (accessType == "update")
                {
                    if (the_access.AllowUpdate)
                        return true;
                }
                else if (accessType == "create")
                {
                    if (the_access.AllowCreate)
                        return true;
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