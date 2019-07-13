<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.Master" AutoEventWireup="true" CodeBehind="pageSystemUsers.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemUsers.pageSystemUsers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
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
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">စာရင်းချုပ် <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">ရှာဖွေရန်</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-person-stalker"></i>&nbsp;ဝန်ထမ်းများ</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">

                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetUser('[UserID]');return false;">
                                                <td>[UserName]</td>
                                                <td>[UserCode]</td>
                                                <td>[RoleName]</td>
                                                <td>[Email]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th>အမည်</th>
                                                    <th>ကုဒ်နံပါတ်</th>
                                                    <th>သုံးစွဲခွင့် ကုဒ်</th>
                                                    <th>အီးမေး(လ်)</th>
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
                                                                <span class="bold">အားလုံး</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold">ရှာဖွေမည်</span></button>


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
                    <h4 class="modal-title">ဝန်ထမ်း  - အချက်အလက် အသေးစိတ်</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />
                        <div class="form-group">

                            <label for="tb_name" class="  col-md-2  control-label">အမည်</label>
                            <div class=" col-md-4">
                                <input type="text" class="form-control" id="tb_name" placeholder="Enter Name Of The User">
                            </div>

                            <label for="tb_code" class="col-md-2 control-label">ကုဒ်နံပါတ်</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="tb_code" placeholder="Enter User Code For The User">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_role" class="col-md-2 control-label">သုံးစွဲခွင့်</label>
                            <div class="col-md-4">
                                <select id="tb_role" class="form-control"></select>
                            </div>


                            <label for="tb_user_email" class="col-md-2 control-label">အီးမေး(လ်)</label>
                            <div class="col-md-3">
                                <input type="text" class="form-control" id="tb_user_email" placeholder="Email Address Of The User">
                            </div>

                        </div>


                        <div class="form-group">
                            <label for="tb_user_type" class="col-md-2 control-label">User Type</label>
                            <div class="col-md-4">
                                <select class="form-control" id="tb_user_type" placeholder="Is Admin or Agent ?">
                                    <option value="Admin">Admin</option>
                                    <option value="Agent">Agent</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_org_name" class="col-md-2 control-label">Org Name</label>
                            <div class="col-md-9">
                                <input type="hidden" id="hf_org_id" />
                                <select class="form-control" id="tb_org_name">
                                </select>
                            </div>
                        </div>

                        <div id="pnl_password" class="form-group">
                            <label for="tb_password" class="col-md-2 control-label">Password</label>
                            <div class="col-md-9">
                                <input type="password" class="form-control" id="tb_password" placeholder="Enter Password">
                            </div>
                        </div>

                        <div id="pnl_confirmpassword" class="form-group">
                            <label for="tb_confirm_password" class="col-md-2 control-label">Confirm</label>
                            <div class="col-md-9">
                                <input type="password" class="form-control" id="tb_confirm_password" placeholder="Enter Confirm Password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_contact_info" class="col-md-2 control-label">ဆက်သွယ်ရန်</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="3" placeholder="Enter Detail Contact Information Of User" id="tb_contact_info"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label">မှတ်ချက်</label>
                            <div class="col-md-4">
                                <textarea class="form-control" rows="7" placeholder="Enter Note For User" id="tb_note"></textarea>
                            </div>
                            <div class="col-md-6">
                           
                            
                                            <div class="col-md-12 ImageContainer" id="item_image_zone" >
                                                <label class="col-md-12">လက်မှတ်</label>

                                                <div id="image_item" style="display: block;">

                                                    <img id="bind_item_image_src" src='' style=" height: 200px;" /><br />
                                                    <br>
                                                    <button id="btn_changeImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemImage();"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">Edit</span></button>
                                                    &nbsp &nbsp
                                                    <button id="btn_deleteImage" class="btn btn-dark btn-icon btn-sm btn-rounded " onclick="deleteImage();"><i class="ion-close-circled icon-lg"></i>&nbsp;<span class="bold" data-translate="_delete">Delete</span></button>
                                                </div>
                                                <div id="Image_drop_zone" style="display: block;">
                                                    <button id="btn_uploadImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemImage1();" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                                                </div>
                                          

                        </div>
                                
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <small><span id="lbl_created" data-translate="_createdon"></span></small>
                                <br />
                                <small><span id="lbl_modified" data-translate="_modifiedon"></span></small>
                                <br />
                            </div>
                        </div>
                    </form>

                 

                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveUser();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">စာရင်းသိမ်း</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">ဖျတ်ရန်</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">အသစ်</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>


                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageSystemUsers.js")%>'></script>
</asp:Content>
