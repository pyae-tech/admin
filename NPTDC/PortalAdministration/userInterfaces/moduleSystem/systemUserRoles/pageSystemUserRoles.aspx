<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.Master" AutoEventWireup="true" CodeBehind="pageSystemUserRoles.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemUserRoles.pageSystemUserRoles" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">    
    <link href='<%= ResolveUrl("../../../plugins/jstree/themes/default/style.css")%>' rel="stylesheet" />
  
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">User Roles</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">User Roles</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="panel">
            <div class="panel-body">



                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-wand"></i>User Roles</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">

                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetUserRole('[RoleID]');return false;">
                                                <td>[RoleName]</td>
                                                <td>[RoleCode]</td>

                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th>Role Name</th>
                                                    <th>Role Code</th>

                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>

                                </div>



                                <div class="tab-pane fade" id="tab-search">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">

                                                    <div class="form-group">

                                                        <label for="tb_search_text" class="col-md-2 control-label">Name / Code</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search_text" placeholder="">
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <div class="col-md-6">


                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                                <i class="btn-label ion-backspace"></i>
                                                                <span class="bold">Show All</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold">Search</span></button>


                                                        </div>

                                                    </div>

                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>




    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title">User Roles - Detail Infromation</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />
                        <div class="form-group">
                            <label for="tb_name" class="col-md-2 control-label">Role Name</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_name" placeholder="Enter   Role Name">
                            </div>

                            <label for="tb_code" class="col-md-2 control-label">Role Code</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_code" placeholder="Enter   Role Code">
                            </div>
                        </div>
                       
                        <div class="form-group" style="display:none;">

                            <div id='menu-template' style="display: none;">
                                <div class="col-md-3">
                                    <div class="checkbox pad-btm text-left">
                                        <input id="ch_menu_[MenuID]" class="magic-checkbox" value="[MenuID]" type="checkbox">
                                        <label for="ch_menu_[MenuID]">[MenuName]</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label for="tb_name" class="col-md-2 control-label">Menu List</label></div>
                            <div>
                                <%--//10--%>
                                <div id='menu-list' style="height: 200px; border: 1px solid silver; overflow-y: scroll;">
                                </div>

                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_code" class="col-md-2 control-label">Menu List</label>
                            <div class="col-md-10 panel-body" style="height: 500px; overflow-y: scroll;" id="treeview_room">
                                
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="tb_code" class="col-md-2 control-label">Program List</label>
                            <div class="col-md-10 panel-body">
                                <table style="display: none">
                                    <tbody id="template_item_row">
                                        <tr style="cursor: pointer;">
                                            <td>[ProgramName]</td>
                                             <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','create',this);return false;" [is_create_checked]/></td>
                                             <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','view',this);return false;" [is_view_checked]/></td>
                                             <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','update',this);return false;" [is_update_checked] /></td>
                                            <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','delete',this);return false;" [is_delete_checked]/></td>
                                              <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','decision',this);return false;" [is_allowdecision_checked] /></td>
                                            <td><input type="checkbox" class="form-control"  onchange="SetProgramRoles('[ProgramID]','alldepartment',this);return false;" [is_allowalldepartment_checked]/></td>
                                                 
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover  table-bordered" id="panel_item_list">
                                        <thead>
                                            <tr>
                                                <th>Program Name</th>
                                                <th>Create</th>
                                                <th>View</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                                <th>Decision</th>
                                                <th>AllDepartment</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table_item_list">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <small><span id="lbl_created"></span></small>
                                <br />
                                <small><span id="lbl_modified"></span></small>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveUserRole();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold">Close</span></button>


                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/jstree/jstree.js")%>'></script>
    <script src='<%= ResolveUrl("pageSystemUserRoles.js")%>'></script>
</asp:Content>
