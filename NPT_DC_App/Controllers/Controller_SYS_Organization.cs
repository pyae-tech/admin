using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;



namespace NPT_DC_App.Controllers
{
    public class Controller_SYS_Organization
    {

        static string AccessProgramCode = "BaiscInfoAccess";
        static int RecordCountPerPage = 20;


        public static List<SYS_OrganizationView> GetAllOrganization(string search_text, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_Organizations
                    where c.Active == true &&
                    ((search_text == "") ||
                    (search_text != "" && (
                        c.OrgID.Contains(search_text) ||
                        c.OrgName.Contains(search_text)
                    )))
                    orderby c.OrgName
                    select new SYS_OrganizationView
                    {
                        OrgID = c.OrgID,
                        OrgName = c.OrgName
                    }).ToList();
        }

        public static List<SYS_Organization> GetOrganizations()
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            var the_organizations = (from c in dc.SYS_Organizations
                                     where c.Active == true
                                     select c).ToList();
            return the_organizations;
        }


        public static List<Object> GetAllOrganizationWithPagination(string search_text, string search_org, string RequestID, string PageNoString)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");


            //Check Agent Access
            LINQ_SystemDataContext dc_system = new LINQ_SystemDataContext();
            SYS_UserView the_user = (from c in dc_system.SYS_UserViews where c.UserID == RequestID select c).FirstOrDefault();
            if (the_user == null) throw new Exception("System cannot find the user");

            int pageNo = 0; int.TryParse(PageNoString, out pageNo);

            //Get Skip Count
            int skip_count = (pageNo - 1) * RecordCountPerPage;

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_Organization org = new SYS_Organization();
            //Add into Query Statment
            var Query = (from c in dc.SYS_OrganizationViews
                         where c.Active == true &&
                         ((search_text == "") ||
                         (search_text != "" && (

                       c.LastAction.Contains(search_text) ||
                        c.OrgName.Contains(search_text) ||
                        c.OrgCode.Contains(search_text) ||
                        c.UserCount.Contains(search_text) ||
                         c.OrgPlan.Contains(search_text)

                         ))) &&
                                   ((search_org == "") ||
                         (search_org != "" && (

                       c.LastAction.Contains(search_org) ||
                        c.OrgName.Contains(search_org) ||
                        c.OrgCode.Contains(search_org) ||
                        c.UserCount.Contains(search_org) ||
                         c.OrgPlan.Contains(search_org)

                         )))
                         select c).OrderByDescending(x => x.OrgName);

            //Get Total Record Count
            int TotalCount = Query.Count();
            //Get Total Number of Page
            int TotalPage = (TotalCount / RecordCountPerPage) + (TotalCount % RecordCountPerPage == 0 ? 0 : 1);

            List<Object> result = new List<object>();
            //Add overall pagination info on Index 0
            string previous_button = "y";
            if (pageNo == 1 || TotalPage == 1) previous_button = "n";
            string next_button = "y";
            if (pageNo == TotalPage) next_button = "n";
            if (TotalPage == 1)
            {
                previous_button = "n"; next_button = "n";
            }

            result.Add(TotalCount.ToString() + "~" + TotalPage.ToString() + "~" + pageNo.ToString() + "~" + previous_button + "~" + next_button);

            //Add Real Record Data from Index 1
            result.AddRange(new List<Object>(
                Query
                    .Skip(skip_count).Take(RecordCountPerPage) // Add Skip and Take Function
                    .ToList()));
            return result;
        }

        public static string SaveOrganization(string org_id, string user_id, string org_name, string org_code, string orgType,
            string joint_date, string expiry_date, string InvoiceAccountName, string InvoiceAccountNo, string user_count, string orgplan,
            string Website, string Facebook, string Email,string PhoneNo, string Address,string InvoiceType,
            string remark, string remark1, string RequestID)
        {
            try
            {

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();

                DateTime Joint_Date = DateTime.Today;
                DateTime.TryParseExact(joint_date, "yyyy/MM/dd", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out Joint_Date);

                DateTime Expiry_Date = DateTime.Today;
                DateTime.TryParseExact(expiry_date, "yyyy/MM/dd", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out Expiry_Date);


                SYS_Organization the_record = new SYS_Organization();
                if (org_id == "" || org_id == null)
                {
                    the_record = (from c in dc.SYS_Organizations where c.OrgID == org_id && c.Active == true select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new SYS_Organization()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            OrgID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.SYS_Organizations.InsertOnSubmit(the_record);
                    }
                    else return "Error~Duplicate Organization Name";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.SYS_Organizations where c.OrgID == org_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();
                the_record.OrgType = orgType;

                the_record.OrgName = org_name;
                the_record.OrgCode = org_code;

                the_record.JointDate = Joint_Date;
                the_record.ExpiryDate = Expiry_Date;
                the_record.UserCount = user_count;
                the_record.OrgPlan = org_code;

                the_record.Website = Website;
                the_record.Facebook = Facebook;
                the_record.Email = Email;
                the_record.PhoneNo = PhoneNo;
                the_record.Address = Address;
                the_record.InvoiceType = InvoiceType;

                the_record.Remark = remark;
                the_record.Remark1 = remark1;
                the_record.InvoiceAccountName = InvoiceAccountName;
                the_record.InvoiceAccountNo = InvoiceAccountNo;

                #region update the log

                SYS_Organization log_obj = dc.GetChangeSet().Updates.OfType<SYS_Organization>().FirstOrDefault();
                if (log_obj != null)
                {
                    if (Controller_SystemLog.WirteUpdateLog(dc.SYS_Organizations.GetModifiedMembers(log_obj).ToList(), org_id, RequestID) == false)
                    {
                        //Error fail to log.
                    }
                }
                #endregion


                dc.SubmitChanges();
                return "Success~" + the_record.OrgID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string do_saveorganization(string orgid, string org_name, string org_code)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_Organization the_record = new SYS_Organization();
                if (string.IsNullOrEmpty(orgid))
                {
                    the_record = new SYS_Organization
                    {
                        OrgID = Guid.NewGuid().ToString(),
                        OrgName = org_name,
                        OrgCode = org_code,
                        OrgPlan = string.Empty,
                        JointDate = DateTime.Now,
                        ExpiryDate = DateTime.Now,
                        Remark1 = string.Empty,
                        Active = true,
                        UserCount = "5",
                        Remark = string.Empty,
                        CreatedBy = "4",
                        CreatedOn = DateTime.Now,
                        ModifiedBy = "4",
                        ModifiedOn = DateTime.Now,
                        LastAction = Guid.NewGuid().ToString()
                    };

                    dc.SYS_Organizations.InsertOnSubmit(the_record);
                }
                else
                {
                    the_record = (from org in dc.SYS_Organizations where org.OrgID == orgid && org.Active == true select org).FirstOrDefault();
                    the_record.OrgName = org_name;
                    the_record.OrgCode = org_code;
                }
                dc.SubmitChanges();
                return "Success~" + the_record.OrgID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static SYS_OrganizationView GetOrganization(string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_OrganizationViews where c.OrgID == org_id && c.Active == true select c).FirstOrDefault();
        }

        public static string DeleteOrganization(string org_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            try
            {
                SYS_Organization the_record = (from c in dc.SYS_Organizations where c.OrgID == org_id && c.Active == true select c).FirstOrDefault();
                if (the_record == null)
                    return "Error~We can't find";
                the_record.Active = false;
                the_record.ModifiedOn = DateTime.Now;
                the_record.ModifiedBy = user_id;
                the_record.LastAction = Guid.NewGuid().ToString();
                dc.SubmitChanges();
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Success~";
            }
        }

        public static List<SYS_GetOrganizationMenuGroupResult> GetOrganizationMenuGroup(string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return dc.SYS_GetOrganizationMenuGroup(org_id).ToList();
        }


        public static string SetOrganizationMenuGroup(string org_id, string menugp_id, string type, string data, string RequestID)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_OrganizationMenuGroup the_record = (from c in dc.SYS_OrganizationMenuGroups where c.OrgID == org_id && c.MenuGroupID == menugp_id && c.Active == true select c).FirstOrDefault();
                if (the_record == null)
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = new SYS_OrganizationMenuGroup()
                    {
                        OrgMenuGroupID = Guid.NewGuid().ToString(),
                        OrgID = org_id,
                        MenuGroupID = menugp_id,
                        CreatedBy = RequestID,
                        CreatedOn = DateTime.Now,
                        Active = true,
                        LastAction = Guid.NewGuid().ToString()
                    };
                    dc.SYS_OrganizationMenuGroups.InsertOnSubmit(the_record);
                }

                if (type == "create")
                {
                    if (data == "true") the_record.AllowCreate = true;
                    else the_record.AllowCreate = false;
                }
                if (type == "view")
                {
                    if (data == "true") the_record.AllowView = true;
                    else the_record.AllowView = false;
                }
                if (type == "update")
                {
                    if (data == "true") the_record.AllowUpdate = true;
                    else the_record.AllowUpdate = false;
                }
                if (type == "delete")
                {
                    if (data == "true") the_record.AllowDelete = true;
                    else the_record.AllowDelete = false;
                }

                the_record.ModifiedBy = RequestID;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();

                dc.SubmitChanges(ConflictMode.ContinueOnConflict);
                return "Success~";
            }
            catch (ChangeConflictException ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static List<SYS_OrganizationMenuGroupView> Check_OrgViewPermission(string org_id, string RequestID)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_OrganizationMenuGroupViews where c.OrgID == org_id && c.Active == true select c).ToList();
        }

        public static List<SYS_OrganizationView> GetOrganizationByID(string org_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_Organizations
                    where c.Active == true &&
                    c.OrgID == org_id
                    orderby c.OrgName
                    select new SYS_OrganizationView
                    {
                        OrgID = c.OrgID,
                        OrgName = c.OrgName
                    }).ToList();
        }

        public static SYS_OrganizationView GetCompanyProfile(string org_id,string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_OrganizationViews where c.OrgID == org_id && c.Active == true select c).FirstOrDefault();
        }
    }
}