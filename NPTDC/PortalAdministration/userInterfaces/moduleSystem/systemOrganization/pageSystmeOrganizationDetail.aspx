<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageSystmeOrganizationDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemOrganization.pageSystmeOrganizationDetail" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' />
    <%--<link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />--%>
   <link href='<%= ResolveUrl("styles.css")%>' rel="stylesheet" />
    <link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />
    <link rel="dx-theme" data-theme="android5.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.android5.light.css")%>' />
    <link rel="dx-theme" data-theme="ios7.default" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.ios7.default.css")%>' />
    <link rel="dx-theme" data-theme="win10.black" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.black.css")%>' />
    <link rel="dx-theme" data-theme="win10.white" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.white.css")%>' />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">System Organizations</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">Organizations</li>
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
                            <div class="panel-control" style="display: none;">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-briefcase"></i>&nbsp;<span data-translate="">System Organization - Detail Infromation</span></h3>

                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">
                                    <div class="modal-body">


                                        <div class="col-md-9">
                                            <form id="form" class="form-horizontal">
                                                <input type="hidden" id="tb_id" value="" />

                                                <div class="form-group">

                                                    <label for="tb_name" class="col-md-3 control-label">Organization Name</label>
                                                    <div class="col-md-9">
                                                           <div id="tb_org_name" style="min-height:3px;"></div>
                                                        <%--<input type="text" class="form-control" id="tb_org_name" placeholder="Enter Organization Name">--%>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_code" class="col-md-3 control-label">Code</label>
                                                    <div class="col-md-3">
                                                           <div id="tb_code"></div>
                                                        <%--<input type="text" class="form-control" id="tb_code" placeholder="Enter Organization Code">--%>
                                                    </div>
                                                    <label for="tb_code" class="col-md-3 control-label">Organization Type</label>
                                                    <div class="col-md-3">
                                                         <div id="tb_orgType"></div>
                                                        <%--<input type="text" class="form-control" id="tb_orgType" placeholder="Enter Organization Code">--%>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">Joint Date</label>
                                                    <div class="col-md-3">
                                                            <div id="tb_joint_date"></div>
                                                    </div>
                                                    <label for="tb_name" class="col-md-3 control-label">Expiry Date</label>
                                                    <div class="col-md-3">
                                                          <div id="tb_expiry_date"></div>
                                                        <%--<input type="text" class="form-control" id="tb_expiry_date" placeholder="">--%>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">Invoice Account Name</label>
                                                    <div class="col-md-3">
                                                         <div id="tb_InvoiceAccountName"></div>
                                                        <%--<input type="text" class="form-control" id="tb_InvoiceAccountName" placeholder="">--%>
                                                    </div>
                                                    <label for="tb_name" class="col-md-3 control-label">Invoice Account No</label>
                                                    <div class="col-md-3">
                                                         <div id="tb_InvoiceAccountNo"></div>
                                                        <%--<input type="text" class="form-control" id="tb_InvoiceAccountNo" placeholder="">--%>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">User Count</label>
                                                    <div class="col-md-3">
                                                         <div id="tb_user_count"></div>
                                                        <%--<input type="text" class="form-control" id="tb_user_count" placeholder="Enter User Count">--%>
                                                    </div>
                                                      <label for="tb_name" class="col-md-3 control-label">Organization Plan</label>
                                                    <div class="col-md-3">
                                                         <div id="tb_orgplan"></div>
                                                        <%--<input type="text" class="form-control" id="tb_orgplan" placeholder="Enter Organization Plan">--%>
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label for="tb_website" class="col-md-3 control-label">Website</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_website"></div>
                                                        <%--<input type="text" class="form-control" id="tb_website" placeholder="Enter Website">--%>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_facebook" class="col-md-3 control-label">Facebook</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_facebook"></div>
                                                        <%--<input type="text" class="form-control" id="tb_facebook" placeholder="Enter Facebook">--%>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Email</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_email"></div>
                                                        <%--<input type="text" class="form-control" id="tb_email" placeholder="Enter Email">--%>
                                                    </div>
                                                </div>
                                                  <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Phone No</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_phoneno"></div>
                                                        <%--<input type="text" class="form-control" id="tb_phoneno" placeholder="Enter Email">--%>
                                                    </div>
                                                </div>
                                                      <div class="form-group">
                                                    <label for="tb_address" class="col-md-3 control-label">Address</label>
                                                    <div class="col-md-9">   
                                                       <div id="tb_address"></div>
                                                        <%--<textarea class="form-control" rows="4" placeholder="Enter Remark" id="tb_address"></textarea>--%>
                                                    </div>
                                                   
                                                </div>
                                                      
                                                  <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Invoice Type</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_InvoiceType"></div>
                                                        <%--<input type="text" class="form-control" id="tb_InvoiceType" placeholder="Enter InvoiceType">--%>
                                                    </div>
                                                </div>
                                                 
                                                <div class="form-group">
                                                    <label for="tb_description" class="col-md-3 control-label">Remark</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_remark"></div>
                                                        <%--<textarea class="form-control" rows="4" placeholder="Enter Remark" id="tb_remark"></textarea>--%>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_contact_info" class="col-md-3 control-label">Remark 2</label>
                                                    <div class="col-md-9">
                                                         <div id="tb_remark1"></div>
                                                        <%--<textarea class="form-control" rows="4" placeholder="Enter Remark2" id="tb_remark1"></textarea>--%>
                                                    </div>
                                                </div>
                                                 <div class="form-group">
                                                       <label for="tb_contact_info" class="col-md-3 control-label">Upload Logo</label>
                                                     <div class="col-md-9">
                                                         <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                                                         </div>
                                                     </div>
                                              <div class="form-group">
                                                    <label for="tb_menulist" class="col-md-3 control-label">Menu Group List</label>
                                                    <div class="col-md-9 panel-body">
                                                        <table style="display: none">
                                                            <tbody id="template_item_row">
                                                                <tr style="cursor: pointer;">
                                                                    <td>[MenuGroupName]</td>
                                                                    <%--<td><input type="checkbox" class="form-control"  onchange="SetOrganizationMenuGroup('[MenuGroupID]','create',this);return false;" [is_create_checked]></td>--%>
                                                                    <td><input type="checkbox" class="form-control"  onchange="SetOrganizationMenuGroup('[MenuGroupID]','view',this);return false;" [is_view_checked]></td>
                                                                    <%-- <td><input type="checkbox" class="form-control"  onchange="SetOrganizationMenuGroup('[MenuGroupID]','update',this);return false;" [is_update_checked] ></td>
                                            <td><input type="checkbox" class="form-control"  onchange="SetOrganizationMenuGroup('[MenuGroupID]','delete',this);return false;" [is_delete_checked]></td>--%>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <div class="table-responsive">
                                                            <table class="table table-striped table-hover  table-bordered" id="panel_item_list">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Menu Group Name</th>
                                                                        <%--<th>Create</th>--%>
                                                                        <th>View</th>
                                                                        <%-- <th>Update</th>
                                                <th>Delete</th>--%>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="table_item_list">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                </div>



                                                <div class="form-group">
                                                    <label for="tb_note" class="col-md-3 control-label"></label>
                                                    <div class="col-md-9">
                                                        <small><span id="lbl_created"></span></small>
                                                        <br />
                                                        <small><span id="lbl_modified"></span></small>
                                                        <br />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="col-md-3 control-label"></label>
                                                     <div id="Savebutton" class="btn-primary btn-labeled" style="border-radius: 17px;overflow: hidden;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></div>
                                                    <%--<button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveOrganization();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>--%>
                                                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                                                        <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
                                                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                                                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                                                </div>
                                                
                                            </form>                                

                                        </div>
                                        <div class="col-md-4">
                                             

                                            <%--<div class="col-md-12 ImageContainer" id="item_image_zone" style="display: none;">
                                                <label class="col-md-12 control-label">Upload Company's Logo</label>

                                                <div id="image_item" style="display: block;">

                                                    <img id="bind_item_image_src" src='' style="width: 60%; height: 66%;" /><br />
                                                    <br>
                                                    <button id="btn_changeImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemImage();"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">Edit</span></button>
                                                    &nbsp &nbsp
                                                    <button id="btn_deleteImage" class="btn btn-dark btn-icon btn-sm btn-rounded " onclick="deleteImage();"><i class="ion-close-circled icon-lg"></i>&nbsp;<span class="bold" data-translate="_delete">Delete</span></button>
                                                </div>
                                                <div id="Image_drop_zone" style="display: block;">
                                                    <button id="btn_uploadImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemImage1();" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                                                </div>
                                            </div>--%>
                                            <br />


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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cph_slider_general_bar" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
       <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageSystmeOrganizationDetail.js")%>'></script>
</asp:Content>
