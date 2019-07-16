<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageDepartmentDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterDepartment.pageDepartmentDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_TopLeftMenu" runat="server">
    <button class="btn btn-success  btn-rounded  btn-labeled" type="button" onclick="SaveDepartment();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်းရန်</span></button>
    <button class="btn  btn-dark   btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျက်ရန်</span></button>
    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button>
    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">Log</span></button>
    <button class="btn  btn-dark   btn-rounded  btn-labeled" type="button" onclick="RefreshItem();return false;();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">ပြန်ဖွင့်</span></button>
    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/departments');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><i class="ion-home"></i>ဌာနများ</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">စနစ် စီမံခြင်း </a></li>
        <li><a href="departments">ဌာနများ</a></li>

    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="panel">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-8">
                        <form id="form" class="form-horizontal">
                            <input type="hidden" id="tb_id" value="" />

                            <div class="form-group">
                                <label for="tb_name" class="col-md-2 control-label">ဌာန အမည်</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="tb_name" placeholder="ဌာန အမည်">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_address" class="col-md-2 control-label">အီးမေး(လ်)</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="tb_notifyemail" placeholder="အီးမေး(လ်)" />
                                </div>

                            </div>
                            <div class="form-group">
                                <label for="tb_remark" class="col-md-2 control-label">Protocol</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Protocol" id="tb_protocol" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_remark" class="col-md-2 control-label">အကြောင်းအရာ</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="အကြောင်းအရာ" id="tb_description" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_remark" class="col-md-2 control-label">မှတ်ချက်</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" rows="5" placeholder="မှတ်ချက်" id="tb_remark"></textarea>
                                </div>

                            </div>


                            <div class="form-group">
                                <label for="tb_note" class="col-md-2 control-label"></label>
                                <div class="col-md-10">
                                    <small><span id="lbl_created"></span></small>
                                    <br />
                                    <small><span id="lbl_modified"></span></small>
                                    <br />
                                </div>
                            </div>



                        </form>

                    </div>
                    <div class="col-md-4">
                        <div class="col-md-12 ImageContainer" id="item_image_zone">

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
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
    <script src='<%= ResolveUrl("pageDepartmentDetail.js")%>'></script>
</asp:Content>
