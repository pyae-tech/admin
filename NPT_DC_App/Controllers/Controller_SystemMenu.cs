using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.Controllers
{
    public class Controller_SystemMenu
    {
        static string AccessProgramCode = "UserControl";
        static int RecordCountPerPage = 20;

        public static List<Object> GetAllSysMenuWithPagination(string search_text, string search_sysmenu, string RequestID, string PageNoString)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            int pageNo = 0; int.TryParse(PageNoString, out pageNo);

            //Get Skip Count
            int skip_count = (pageNo - 1) * RecordCountPerPage;

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();

            //Add into Query Statment
            var Query = (from sysm in dc.SYS_MenuViews
                         where sysm.Active == true &&
                         ((search_text == "") ||
                         (search_text != "" && (
                             sysm.MenuName.Contains(search_text) ||
                             sysm.MenuLabel.ToString().Contains(search_text)
                         ))) &&
                         ((search_sysmenu == "") ||
                         (search_sysmenu != "" && (
                             sysm.MenuName.Contains(search_sysmenu) ||
                             sysm.MenuLabel.ToString().Contains(search_sysmenu)
                         )))
                         orderby sysm.MenuName
                         select sysm);

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

        public static SYS_MenuView GetSysMenu(string menu_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from sysm in dc.SYS_MenuViews where sysm.MenuID == menu_id && sysm.Active == true select sysm).FirstOrDefault();
        }

        public static string SaveSysMenu(string menu_id, string user_id, string menu_name, string menu_label, string menu_icon,
                                          string menu_linkpage, string menu_onclick, string menu_seq, string is_node,string noteMenuID, string RequestID)
        {
            try
            {

                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_Menu the_record = new SYS_Menu();
                if (menu_id == "" || menu_id == null)
                {
                    the_record = (from sysm in dc.SYS_Menus where sysm.MenuID == menu_id && sysm.Active == true select sysm).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new SYS_Menu()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            MenuID = Guid.NewGuid().ToString(),
                            LastAction = Guid.NewGuid().ToString(),
                            NoteMenuID = Guid.NewGuid().ToString()
                        };
                        dc.SYS_Menus.InsertOnSubmit(the_record);
                    }
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from sysm in dc.SYS_Menus where sysm.MenuID == menu_id && sysm.Active == true select sysm).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();

                the_record.MenuName = menu_name;
                the_record.MenuLabel = menu_label;
                the_record.IconClass = menu_icon;
                the_record.MenuLinkPage = menu_linkpage;
                the_record.MenuOnClick = menu_onclick;
                the_record.MenuSeq = Convert.ToDecimal(menu_seq.ToString());

                if (is_node == "true")
                {
                    the_record.IsNode = true;
                    the_record.NoteMenuID = "";
                    
                }
                else
                {
                    the_record.IsNode = false;
                    the_record.NoteMenuID = noteMenuID;
                }

                dc.SubmitChanges();
                return "Success~" + the_record.MenuName;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static string DeleteSysMenu(string menu_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_Menu the_record = (from sysm in dc.SYS_Menus where sysm.MenuID == menu_id && sysm.Active == true select sysm).FirstOrDefault();
            if (the_record == null)
                return "Error ~ We can't find";
            the_record.Active = false;
            the_record.ModifiedOn = DateTime.Now;
            the_record.ModifiedBy = user_id;
            the_record.LastAction = Guid.NewGuid().ToString();
            dc.SubmitChanges();
            return "Success~";
        }

        public static List<SYS_MenuView> GetAllMenu(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_MenuViews where c.Active == true orderby c.MenuName descending select c).ToList();

        }

        public static string GetAllMenuTreeView(string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            string result = "";
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            List<SYS_MenuView> Menus = (from c in dc.SYS_MenuViews where c.Active == true orderby c.MenuName descending select c).ToList();

            List<SYS_MenuView> GroupMenus = (from c in Menus where c.IsNode == true orderby c.MenuSeq select c).ToList();

            foreach (SYS_MenuView groupMenu in GroupMenus)
            {
                result += "<ul >  <li class='jstree-open'  id='" + groupMenu.MenuID + "' >" + groupMenu.MenuName  ;
                List<SYS_MenuView> childMenus = (from c in Menus where c.NoteMenuID == groupMenu.MenuID && c.IsNode==false orderby c.MenuSeq select c).ToList();
                if (childMenus.Count > 0)
                {
                    result += "<ul>";


                    foreach (SYS_MenuView childMenu in childMenus)
                    {
                        result += "<li data-jstree = '{\"type\":\"html\"}' id='"+childMenu.MenuID+"' seq='"+childMenu.MenuSeq+"' > " + childMenu.MenuName + " </li>";
                    }
                    result += "  </ul>";
                }
                result += "  </li>";
                result += "  </ul>";
            }
            return result;


        }

        
        public static string GetAllMenuTreeViewByRole(string RoleID,string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            string result = "";
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            List<SYS_MenuView> Menus = (from c in dc.SYS_MenuViews where c.Active == true orderby c.MenuName descending select c).ToList();
            List<string> roleMenus= (from c in dc.SYS_UserRoleMenus where c.RoleID == RoleID  select c.MenuID).ToList();

            List<SYS_MenuView> GroupMenus = (from c in Menus where c.IsNode == true orderby c.MenuSeq select c).ToList();

            foreach (SYS_MenuView groupMenu in GroupMenus)
            {
                string classes = "";
                if (roleMenus.Contains(groupMenu.MenuID))
                {
                    result += "<ul ><li aria-selected='true' class='jstree-open'  id='" + groupMenu.MenuID + "' >" + groupMenu.MenuName;
                }
                else
                {
                    result += "<ul >  <li aria-selected='false' class='jstree-open'  id='" + groupMenu.MenuID + "' >" + groupMenu.MenuName;
                }
                List<SYS_MenuView> childMenus = (from c in Menus where c.NoteMenuID == groupMenu.MenuID && c.IsNode == false orderby c.MenuSeq select c).ToList();
                if (childMenus.Count > 0)
                {
                    result += "<ul>";


                    foreach (SYS_MenuView childMenu in childMenus)
                    {
                        if (roleMenus.Contains(childMenu.MenuID))
                        {
                            result += "<li data-jstree ='{\"opened\":true,\"selected\":true}' selected='selected' id='" + childMenu.MenuID + "' seq='" + childMenu.MenuSeq + "' > " + childMenu.MenuName + " </li>";
                        }
                        else {
                            result += "<li data-jstree = '{\"type\":\"html\"}' id='" + childMenu.MenuID + "' seq='" + childMenu.MenuSeq + "' > " + childMenu.MenuName + " </li>";
                        }
                           
                    }
                    result += "  </ul>";
                }
                result += "  </li>";
                result += "  </ul>";
            }
            return result;


        }

        public static string ChangeSysMenu(string menu_ids,string oldnoteMenuID, string noteMenuID, string RequestID)
        {
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            //List<SYS_MenuView> childMenus = (from c in dc.SYS_MenuViews where c.NoteMenuID == noteMenuID && c.Active == true orderby c.MenuSeq select c).ToList();
            string[] menu_child_ids = menu_ids.Split(',');
            for (int i = 0; i < menu_child_ids.Length; i++)
            {
                SYS_Menu child_menu = (from c in dc.SYS_Menus where c.MenuID == menu_child_ids[i] && c.Active == true select c).FirstOrDefault();
                if (oldnoteMenuID != noteMenuID)
                {
                    if (noteMenuID == "#")
                    {
                        child_menu.IsNode = true;
                        child_menu.NoteMenuID = "";
                    }
                    else
                    {
                        child_menu.NoteMenuID = noteMenuID;
                        child_menu.IsNode = false;
                    }
                }                
                child_menu.ModifiedBy = RequestID;
                child_menu.ModifiedOn = DateTime.Now;
                child_menu.MenuSeq = i+2;
                child_menu.LastAction = Guid.NewGuid().ToString();
                try
                {
                    dc.SubmitChanges();

                }
                catch (Exception ex)
                {
                    return "Fail~";
                }
            }
           return "Success~";
           
           
        }

    }
}