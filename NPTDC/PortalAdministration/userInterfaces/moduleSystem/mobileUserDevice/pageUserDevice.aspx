<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageUserDevice.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.mobileUserDevice.pageUserDevice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">User Devices</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">System</a></li>
        <li class="active">User Devices</li>
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
                                <ul class="nav nav-tabs" style="display: none">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-ribbon-b"></i>User Devices</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <form class="form-horizontal">

                                    <div class="form-group">

                                        <label for="tb_search_text" class="col-md-2 control-label">Search Text</label>
                                        <div class="col-md-3">
                                            <input type="text" class="form-control" id="tb_search_code" placeholder="">
                                        </div>
                                        <div class="col-md-3">
                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                <i class="btn-label ion-backspace"></i>
                                                <span class="bold">Show All</span></button>

                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="Load_List();return false;"><i class="btn-label ion-search"></i><span class="bold">Search</span></button>

                                        </div>
                                    </div>

                                </form>
                                <div class="tab-pane fade in " id="tab-list">

                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;">
                                                <td>[UserCode]</td>
                                                <td>[OTP]</td>
                                                <td>[ModifiedOn]</td>
                                                <td>[Imei]</td>
                                                <td>[OS]</td>
                                                <td>[Manufacturer]</td>
                                                <td>[OSVersion]</td>
                                                <td>[ModelNo]</td>
                                                <td>[CreatedOn]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th style="color: black;">User Code</th>
                                                    <th style="color: black;">OTP</th>
                                                    <th style="color: black;">ModifiedOn</th>
                                                    <th style="color: black">Imei</th>
                                                    <th style="color: black;">OS</th>
                                                    <th style="color: black;">Manufacturer</th>
                                                    <th style="color: black;">OS Version</th>
                                                    <th style="color: black;">ModelNo</th>
                                                    <th style="color: black;">CreatedOn</th>

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

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageUserDevice.js")%>'></script>
</asp:Content>
