<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageSystemUserDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemUsers.pageSystemUserDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
     <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
         .customClass {
       height: 300px !important;
}
       .dx-overlay-wrapper {
          z-index:17000!important;
        }
   
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
     <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">ဝန်ထမ်းများ</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">စနစ် စီမံခြင်း</a></li>
        <li class="active">ဝန်ထမ်းများ</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">အသစ်</span></button>
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
                            <h3><i class="ion-briefcase"></i>&nbsp;<span data-translate="">၀န်ထမ်း - အချက်အလက် အသေးစိတ်</span></h3>

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
                                                      <label for="tb_name" class="  col-md-2  control-label">အမည်</label>
                            <div class=" col-md-4">
                                <input type="text" class="form-control" id="tb_name" placeholder="အမည်">
                            </div>

                            <label for="tb_code" class="col-md-2 control-label">ကုဒ်နံပါတ်</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_code" placeholder="ကုဒ်နံပါတ်">
                            </div>
                                                   
                                                </div>
                                                <div class="form-group">
                            <label for="tb_role" class="col-md-2 control-label">သုံးစွဲခွင့်</label>
                            <div class="col-md-4">
                                 <input type="hidden" id="tb_role_id" value="" />
                                <div id="lookup_role"></div>
                            </div>


                            <label for="tb_user_email" class="col-md-2 control-label">အီးမေး(လ်)</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_user_email" placeholder="အီးမေး(လ်)">
                            </div>

                        </div>


                        <div class="form-group">
                            <label for="tb_user_type" class="col-md-2 control-label">အမျိုးအစား</label>
                            <div class="col-md-4">
                                <select class="form-control" id="tb_user_type">
                                    <option value="Admin">Admin</option>
                                    <option value="Agent">Agent</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_org_name" class="col-md-2 control-label">အဖွဲ့အစည်း</label>
                            <div class="col-md-4">
                                <input type="hidden" id="hf_org_id" />
                                <select class="form-control" id="tb_org_name"></select>
                                
                            </div>
                        </div>

                    <div id="pnl_password" class="form-group">
                            <label for="tb_password" class="col-md-2 control-label">လျှိုဝှက် နံပါတ်</label>
                            <div class="col-md-10">
                                <input type="password" class="form-control" id="tb_password" placeholder="လျှိုဝှက် နံပါတ်">
                            </div>
                        </div>

                        <div id="pnl_confirmpassword" class="form-group">
                            <label for="tb_confirm_password" class="col-md-2 control-label">Confirm Pasword</label>
                            <div class="col-md-10">
                                <input type="password" class="form-control" id="tb_confirm_password" placeholder="Enter Confirm Password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="lookup_position" class="col-md-2 control-label">ရာထူး</label>
                            <div class="col-md-4">
                                 <input type="hidden" id="tb_position_id" value="" />
                              <div id="lookup_position"></div>
                            </div>
                             <label for="lookup_department" class="col-md-2 control-label">ဌာန</label>
                            <div>
                                <div class="col-md-4">
                                     <input type="hidden" id="tb_department_id" value="" />
                                <div id="lookup_department"></div>
                                    </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label">ဆက်သွယ်ရန်</label>
                            <div class="col-md-10">
                                <textarea class="form-control" rows="3" placeholder="ဆက်သွယ်ရန်" id="tb_contact_info"></textarea>
                            </div>
                        </div>
                                              <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label">မှတ်ချက်</label>
                            <div class="col-md-6">
                                <textarea class="form-control" rows="7" placeholder="မှတ်ချက်" id="tb_note"></textarea>
                            </div>
                            <div class="col-md-4">
                           
                            
                                            <div class="col-md-12 ImageContainer" id="item_image_zone" >
                                             
                                                   <input type="hidden" id="tb_imageid" value="" />
                                                   <input type="hidden" id="Ref_type" value="" />
                                                <div id="image_item" style="display: none;">
                                                        <label class="col-md-12">လက်မှတ်တင်ရန်</label>
                                                    <img id="bind_item_image_src" src='' style="width: 100%; height: 100%;" /><br />
                                                    <br>
                                                    <button id="btn_changeImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemImage();return false;"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">ပြင်ရန်</span></button>
                                                    &nbsp &nbsp
                                                    <button id="btn_deleteImage" class="btn btn-dark btn-icon btn-sm btn-rounded " onclick="deleteImage();return false;"><i class="ion-close-circled icon-lg"></i>&nbsp;<span class="bold" data-translate="_delete">ဖျက်ရန်</span></button>
                                                </div>
                                                <div id="Image_drop_zone" style="display: none;">
                                                    <label class="col-md-12">လက်မှတ်တင်ရန်</label>
                                                    <button id="btn_uploadImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemImage1();return false;" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                                                </div>
                                          

                        </div>
                                </div>
                                                  </div>

                                                <div class="form-group">
                                                    <label for="tb_note" class="col-md-2 control-label"></label>
                                                    <div class="col-md-4">
                                                        <small><span id="lbl_created"></span></small>
                                                        <br />
                                                        <small><span id="lbl_modified"></span></small>
                                                        <br />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="col-md-2"></label>
                                                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveUser();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်းရန်</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/users');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>
                                                      <button class="btn btn-success btn-rounded  btn-labeled" type="button" onclick="RefreshItem();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">Reflesh</span></button>

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
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
  <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
        
    <script src='<%= ResolveUrl("pageSystemUserDetail.js")%>'></script>
</asp:Content>
