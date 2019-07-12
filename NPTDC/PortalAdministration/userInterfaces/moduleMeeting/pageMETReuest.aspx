<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageMETReuest.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMeeting.pageMETReuest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">Request</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook"><span data-translate="">Meeting Module</span></a></li>
        <li class="active"><span data-translate="">Requests</span></li>
        <li class="active">
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
            <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveRequest();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
            <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/request');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button></li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
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

                        <div class="form-group">
                            <h3 class="modal-title"><span data-translate="">Request - Detail Information</span></h3>


                        </div>
                    </div>

                    <!--Panel body-->
                    <div class="page-content">
                        <div class="tab-content">
                            <div class="tab-pane fade in " id="tab-list">
                                <div class="modal-body">

                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="panel  ">

                                                        <div class="panel-body">
                                                            <form class="form-horizontal">
                                                                <div class="form-group">

                                                                    <label for="tb_department_name" class="col-md-2 control-label" data-translate="">Department</label>
                                                                    <div class="col-md-6">
                                                                        <input type="text" class="form-control" id="tb_department_name">
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">

                                                                    <label for="ddl_meetingtype" class="col-md-2 control-label" data-translate="">Meeting Type</label>
                                                                    <div class="col-md-6">
                                                                        <select id="ddl_meetingtype" class="form-control">
                                                                            <option>EC</option>
                                                                            <option>Management</option>
                                                                            <option>Other Type</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">

                                                                    <label for="tb_meeting_title" class="col-md-2 control-label" data-translate="">Title</label>
                                                                    <div class="col-md-10">
                                                                        <input type="text" class="form-control" id="tb_meeting_title">
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="tb_Description" class="col-md-2 control-label" data-translate="">Description</label>
                                                                    <div class="col-md-10">
                                                                        <textarea id="tb_Description" rows="3" cols="50" class="form-control" placeholder="Enter tb_Description"></textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="tb_Remark" class="col-md-2 control-label" data-translate="">Remark</label>
                                                                    <div class="col-md-10">
                                                                        <textarea id="tb_Remark" rows="3" cols="50" class="form-control" placeholder="Enter Remark"></textarea>
                                                                    </div>
                                                                </div>

                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-md-4 ">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="panel  ">

                                                        <div class="panel-body">
                                                            <form class="form-horizontal">
                                                                <div class="form-group">
                                                                    <label for="tb_name" class="col-md-3 control-label" data-translate="">Req No</label>
                                                                    <div class="col-md-9">
                                                                        <input type="text" class="form-control" id="tb_service_no" placeholder="Enter Request No" readonly="true">
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">

                                                                    <label for="requeston" class="col-md-3 control-label" data-translate="">Req On</label>
                                                                    <div class="col-md-9">
                                                                        <div id="dt_requeston"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="form-group">

                                                                    <label for="ddl_requeststatus" class="col-md-3 control-label" data-translate="">Status</label>
                                                                    <div class="col-md-9">
                                                                        <select id="ddl_requeststatus" class="form-control">
                                                                            <option>New</option>
                                                                            <option>Pending</option>
                                                                            <option>Complete</option>
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="ddl_requestby" class="col-md-3 control-label" data-translate="">Requestby</label>
                                                                    <div class="col-md-9">
                                                                        <input type="text" class="form-control" id="ddl_requestby" placeholder="Enter Request No">
                                                                    </div>
                                                                </div>


                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="panel  ">

                                                <div class="panel-body">
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
    </div>

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageMETReuest.js")%>'></script>
</asp:Content>
