<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageCompanyProfile.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemCompanyProfile.pageCompanyProfile" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
     <style>
        .ImageContainer {
            min-height: 150px;
            border: 2px solid rgba(0,0,0,0.3);
            background: white;
            padding: 20px 20px;
            background: rgba(0,0,0,0.025);
            border-style: dashed;
            border-width: 1px;
            border-radius: 3px;
            text-align: center;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">Company Profile</li>
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
                            <h3><i class="ion-ionic"></i>&nbsp System Company Profile - Information</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">
                                    <div class="modal-body">

                                          <div class="col-md-3">
                                                  <div class="col-md-12 ImageContainer" id="item_image_zone" style="display: block;">
                                                   <div id="image_item" style="display: block;">

                                                    <img id="bind_item_image_src" src='' style="width: 100%; height: 100%;" /><br />
                                                </div>
                                                <div id="Image_drop_zone" style="display: block;">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-9">
                                            <form class="form-horizontal">
                                                <input type="hidden" id="tb_id" value="" />

                                                <div class="form-group">

                                                    <label for="tb_name" class="col-md-3 control-label">Organization Name</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_org_name" placeholder="Enter Organization Name">
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_code" class="col-md-3 control-label">Code</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_code" placeholder="Enter Organization Code">
                                                    </div>
                                                    <label for="tb_code" class="col-md-3 control-label">Organization Type</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_orgType" placeholder="Enter Organization Code">
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">Joint Date</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_joint_date" placeholder="">
                                                    </div>
                                                    <label for="tb_name" class="col-md-3 control-label">Expiry Date</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_expiry_date" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">Invoice Account Name</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_InvoiceAccountName" placeholder="">
                                                    </div>
                                                    <label for="tb_name" class="col-md-3 control-label">Invoice Account No</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_InvoiceAccountNo" placeholder="">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_name" class="col-md-3 control-label">User Count</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_user_count" placeholder="Enter User Count">
                                                    </div>
                                                      <label for="tb_name" class="col-md-3 control-label">Organization Plan</label>
                                                    <div class="col-md-3">
                                                        <input type="text" class="form-control" id="tb_orgplan" placeholder="Enter Organization Plan">
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label for="tb_website" class="col-md-3 control-label">Website</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_website" placeholder="Enter Website">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_facebook" class="col-md-3 control-label">Facebook</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_facebook" placeholder="Enter Facebook">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Email</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_email" placeholder="Enter Email">
                                                    </div>
                                                </div>
                                                  <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Phone No</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_phoneno" placeholder="Enter Email">
                                                    </div>
                                                </div>
                                                 <div class="form-group">
                                                    <label for="tb_address" class="col-md-3 control-label">Address</label>
                                                    <div class="col-md-9">
                                                        <textarea class="form-control" rows="4" placeholder="Enter Remark" id="tb_address"></textarea>
                                                    </div>
                                                </div>
                                                  <div class="form-group">
                                                    <label for="tb_Email" class="col-md-3 control-label">Invoice Type</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_InvoiceType" placeholder="Enter InvoiceType">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="tb_description" class="col-md-3 control-label">Remark</label>
                                                    <div class="col-md-9">
                                                        <textarea class="form-control" rows="4" placeholder="Enter Remark" id="tb_remark"></textarea>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label for="tb_contact_info" class="col-md-3 control-label">Remark 2</label>
                                                    <div class="col-md-9">
                                                        <textarea class="form-control" rows="4" placeholder="Enter Remark2" id="tb_remark1"></textarea>
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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cph_slider_general_bar" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("pageCompanyProfile.js")%>'></script>
</asp:Content>
