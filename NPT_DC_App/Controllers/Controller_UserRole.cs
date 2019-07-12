using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
namespace NPT_DC_App.Controllers
{
    public static class Controller_UserRole
    {

        static string AccessProgramCode = "UserControl";
        public static List<SYS_UserRoleView> GetAllUserRole(string search_text, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");


            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserRoleViews
                    where c.Active == true &&

                    ((search_text == "") ||
                    (search_text != "" && (
                        c.RoleID.Contains(search_text) ||
                        c.RoleName.Contains(search_text) ||
                        c.RoleCode.Contains(search_text)
                    )))

                    orderby c.RoleName
                    select c).ToList();
        }

        public static SYS_UserRoleView GetUserRole(string record_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserRoleViews where c.RoleID == record_id && c.Active == true select c).FirstOrDefault();
        }

        public static string SaveUserRole(string record_id, string user_id, string role_name, string role_code, string menulist, string RequestID)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_UserRole the_record = new SYS_UserRole();
                if (record_id == "" || record_id == null)
                {
                    the_record = (from c in dc.SYS_UserRoles where c.RoleCode == role_code && c.Active == true select c).FirstOrDefault();
                    if (the_record == null)
                    {
                        //Security Check
                        if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "create")) throw new Exception("No Access.");

                        the_record = new SYS_UserRole()
                        {
                            CreatedBy = user_id,
                            CreatedOn = DateTime.Now,
                            Active = true,
                            RoleID = Guid.NewGuid().ToString(),
                            RoleMenu = "",
                            LastAction = Guid.NewGuid().ToString()
                        };
                        dc.SYS_UserRoles.InsertOnSubmit(the_record);
                    }
                    else return "Error~Duplicate Country Code";
                }
                else
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = (from c in dc.SYS_UserRoles where c.RoleID == record_id select c).FirstOrDefault();
                    if (the_record == null) throw new Exception("System cannot find the record");
                }
                the_record.ModifiedBy = user_id;
                the_record.ModifiedOn = DateTime.Now;
                the_record.LastAction = Guid.NewGuid().ToString();

                the_record.RoleName = role_name;
                the_record.RoleCode = role_code;


                #region Clear old menu
                List<SYS_UserRoleMenu> old_menu = (from c in dc.SYS_UserRoleMenus
                                                   where c.RoleID == the_record.RoleID
                                                   select c).ToList();
                dc.SYS_UserRoleMenus.DeleteAllOnSubmit(old_menu);
                #endregion 


                if (menulist != "")
                {
                    List<SYS_UserRoleMenu> new_child_menu = new List<SYS_UserRoleMenu>();
                    List<SYS_UserRoleMenu> new_node_menu = new List<SYS_UserRoleMenu>();
                    List<string> node_menu = new List<string>();
                    List<string> menus = menulist.Split(',').ToList(); //ids
                    foreach (string menu in menus)
                    {
                        if (menu != "")
                        {
                            string node_id= (from c in dc.SYS_UserRoleMenuViews
                                             where c.MenuID == menu
                                             select c.NoteMenuID).FirstOrDefault();
                            if (!node_menu.Contains(node_id))
                            {
                                node_menu.Add(node_id);
                            }
                            #region childNode
                            bool is_node = (from c in dc.SYS_Menus
                                            where c.MenuID == menu
                                            select c.IsNode).FirstOrDefault();
                            if (!is_node)
                            {
                                new_child_menu.Add(new SYS_UserRoleMenu()
                                {
                                    RoleMenuID = Guid.NewGuid().ToString(),
                                    RoleID = the_record.RoleID,
                                    MenuID = menu,
                                });
                            }
                            #endregion

                        }
                    }
                    dc.SYS_UserRoleMenus.InsertAllOnSubmit(new_child_menu);
                    dc.SubmitChanges();
                    #region parentNode
                    foreach (string menu in node_menu)
                    {
                        if (menu != "" && menu!=null )
                        {
                            new_node_menu.Add(new SYS_UserRoleMenu()
                            {
                                RoleMenuID = Guid.NewGuid().ToString(),
                                RoleID = the_record.RoleID,
                                MenuID = menu,
                            });
                        }
                    }
                    dc.SYS_UserRoleMenus.InsertAllOnSubmit(new_node_menu);
                    #endregion
                }

                dc.SubmitChanges();
                return "Success~" + the_record.RoleID;

            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }
        public static string DeleteUserRole(string record_id, string user_id, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "delete")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            SYS_UserRole the_record = (from c in dc.SYS_UserRoles where c.RoleID == record_id && c.Active == true select c).FirstOrDefault();
            if (the_record == null)
                return "Error~We can't find";
            the_record.Active = false;
            the_record.ModifiedOn = DateTime.Now;
            the_record.ModifiedBy = user_id;
            the_record.LastAction = Guid.NewGuid().ToString();
            dc.SubmitChanges();
            return "Success~";
        }
        public static List<SYS_GetProgramRoleResult> GetProgramUserRole(string roleid, string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");

            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return dc.SYS_GetProgramRole(roleid).ToList();
        }
        //roleid,programid,type,data
        public static string SetProgramRoles(string role_id, string program_id, string type, string data, string RequestID)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_UserRoleProgram the_record = (from c in dc.SYS_UserRolePrograms where c.RoleID == role_id && c.ProgramID == program_id select c).FirstOrDefault();
                if (the_record == null)
                {
                    //Security Check
                    if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "update")) throw new Exception("No Access.");

                    the_record = new SYS_UserRoleProgram()
                    {
                        RoleProgramID = Guid.NewGuid().ToString(),
                        RoleID = role_id,
                        ProgramID = program_id,
                    };
                    dc.SYS_UserRolePrograms.InsertOnSubmit(the_record);
                }
                if (type == "create")
                {
                    if (data == "true") the_record.AllowCreate = true;
                    else the_record.AllowCreate = false;
                }
                else if (type == "view")
                {
                    if (data == "true") the_record.AllowView = true;
                    else the_record.AllowView = false;
                }
                else if (type == "update")
                {
                    if (data == "true") the_record.AllowUpdate = true;
                    else the_record.AllowUpdate = false;
                }
                else if (type == "delete")
                {
                    if (data == "true") the_record.AllowDelete = true;
                    else the_record.AllowDelete = false;
                }

                dc.SubmitChanges();
                return "Success~";
            }
            catch (Exception ex)
            {
                return "Error~" + ex.Message;
            }
        }

        public static List<SYS_UserRoleMenu> GetUserRoleMenu(string role_id,string RequestID)
        {
            //Security Check
            if (!Controller_User_Access.CheckProgramAccess(AccessProgramCode, RequestID, "read")) throw new Exception("No Access.");
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            return (from c in dc.SYS_UserRoleMenus where c.RoleID == role_id   select c).ToList();
        }

        public class MenuResult
        {
            public string Node { get; set; }
            public string childs { get; set; }
        }

        public class  MenuResultList
        {
            public List<MenuResult> ModuleMenu { get; set; }
            public List<MenuResult> MainMenu { get; set; }
        }

        public static MenuResultList GetUserRoleMenu(string role_id)
        {
          
            List<MenuResult> module_result_list = new List<MenuResult>();
            List<MenuResult> main_result_list = new List<MenuResult>();
            MenuResultList return_result = new MenuResultList();
            LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
            List<SYS_UserRoleMenuView> Menus = (from c in dc.SYS_UserRoleMenuViews where c.RoleID == role_id orderby c.MenuName descending select c).ToList();

            List<SYS_UserRoleMenuView> GroupMenus = (from c in Menus where c.IsNode == true orderby c.MenuSeq select c).ToList();

            foreach (SYS_UserRoleMenuView groupMenu in GroupMenus)
            {
                string menu_id = "";string first_main_node = "";
                switch (groupMenu.MenuName)
                {
                    case "Cash Flow":
                        menu_id = "menu_cashflow";
                        first_main_node= "<li class='badge badge-primary'><i class='ion-pie-graph  icon-lg icon-fw'></i>&nbsp;&nbsp;<span data-translate='_cashflow'>Cash Flow </span></li>";
                        break;
                    case "Van Sale":
                        menu_id = "menu_salevan";
                        first_main_node ="<li class='badge badge-primary'><i class='ion-map  icon-lg icon-fw'></i>&nbsp;<span data-translate='_vansale'>Van Sale</span></li>";
                        break;
                    case "Sale Book":
                        menu_id = "menu_sale";
                        first_main_node = "<li class='badge badge-primary'><i class='ion-printer  icon-lg icon-fw'></i>&nbsp;&nbsp;<span>Sale Book</span></li>";
                        break;
                    case "Marketing Scout":
                        menu_id = "menu_marketing";
                        first_main_node = "<li class='badge badge-primary'><i class='ion-location  icon-lg icon-fw'></i>&nbsp;&nbsp;<span>Marketing Scout</span></li>";
                        break;
                    case "Account Book":
                        menu_id = "menu_account";
                        first_main_node = "<li class='badge badge-primary'><i class='ion-location  icon-lg icon-fw'></i>&nbsp;&nbsp;<span>Account Book</span></li>";
                        break;
                    case "Master Book":
                        menu_id = "menu_master";
                        first_main_node = "<li class='badge badge-primary'><i class='ion-briefcase  icon-lg icon-fw'></i>&nbsp;<span data-translate='_mat'>Master Book</span></li>";
                        break;
                    case "Report Book":
                        menu_id = "menu_reporting";
                        first_main_node = "<li class='badge badge-primary'><i class='ion-printer  icon-lg icon-fw'></i>&nbsp;&nbsp;<span>Report Book</span></li>";
                        break;
                    default:
                        menu_id = "";
                        break;
                }
                MenuResult module_menu_data = new MenuResult();
                MenuResult main_menu_data = new MenuResult();
                string module_result = ""; string main_result = "";
                module_result += "<li id ='"+ menu_id + "'>"+ 
                         "<a href='#'><i class='"+ groupMenu.IconClass+ "'></i>"+
                         "<span class='menu-title' data-translate=''>"+
                         groupMenu.MenuLabel + "</span><i class='arrow'></i></a>";

                List<SYS_UserRoleMenuView> usermenus = (from c in Menus where c.NoteMenuID == groupMenu.MenuID orderby c.MenuSeq select c).ToList();
                if (usermenus.Count > 0)
                {
                    module_result += "<ul class='collapse' id='"+ menu_id + "_group'>";
                    main_result += "<ul class='list-unstyled'>";
                    main_result += first_main_node;
                    foreach (SYS_UserRoleMenuView menu in usermenus)
                    {
                        
                        //result += "<li data-jstree = '{\"type\":\"html\"}' id='" + childMenu.MenuID + "' seq='" +
                        //    childMenu.MenuSeq + "' > " + childMenu.MenuName + " </li>";
                        main_result += "<li id ='" + menu.RoleMenuID + "' class='pad-top'><a href = '" + menu.MenuLinkPage + "'>" +
                           "<i class='" + menu.IconClass + "'></i>&nbsp;&nbsp;<span data-translate=''>" +
                           menu.MenuLabel + "</span></a></li>";


                        module_result += "<li id='" + menu_id+'_'+ menu.MenuLabel.Replace(" ",string.Empty) + "'>" + "<a href='" + menu.MenuLinkPage + "'>" + menu.MenuLabel + "</a></li>";
                    }
                    module_result += "</ul>";
                    main_result += "</ul>";
                }
                module_result += "</li>";
                module_menu_data.Node = groupMenu.MenuName;
                module_menu_data.childs = module_result;

                main_menu_data.Node = groupMenu.MenuName;
                main_menu_data.childs = main_result;

                module_result_list.Add(module_menu_data);
                main_result_list.Add(main_menu_data);

            }
            return_result.MainMenu=main_result_list;
            return_result.ModuleMenu = module_result_list;
            return return_result;

        }

    }
}