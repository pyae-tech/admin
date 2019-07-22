<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageSystemUserRoleDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemUserRoles.pageSystemUserRoleDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
     <link href='<%= ResolveUrl("../../../plugins/jstree/themes/default/style.css")%>' rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
    <ol class="menucrumb">
        <li>
            <button style="display: none;" class="btn btn-success  btn-rounded  btn-labeled usercontrol_create" type="button" onclick="SaveUserRole();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်းရန်</span></button></li>
        <li>
            <button style="display: none;" class="btn  btn-dark   btn-rounded btn-labeled usercontrol_delete" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button></li>
        <li>
            <button style="display: none;" class="btn btn-dark  btn-rounded  btn-labeled usercontrol_create" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button></li>
        <li>
            <button style="display: block;" class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="RefreshItem();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">ပြန်ဖွင့်</span></button></li>
        <li>
            <button style="display: block;" data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/roles');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button></li>

    </ol>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
     <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">၀န်ထမ်း သုံးစွဲခွင့်</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li>စနစ် စီမံခြင်</li>
        <li><a href="roles">၀န်ထမ်း သုံးစွဲခွင့်</a></li>


    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
     <div id="page-content">
        <div class="panel">
            <div class="panel-body">

                <div class="modal-body">


                    <div class="col-md-12">
                        <form id="form" class="form-horizontal">
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





                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
     <script src='<%= ResolveUrl("../../../plugins/jstree/jstree.js")%>'></script>
     <script src='<%= ResolveUrl("pageSystemUserRoleDetail.js")%>'></script>
</asp:Content>
