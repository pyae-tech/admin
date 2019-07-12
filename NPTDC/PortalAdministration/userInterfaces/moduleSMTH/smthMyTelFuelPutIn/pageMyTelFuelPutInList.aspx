<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_CustomerGroupLogin.Master" AutoEventWireup="true" CodeBehind="pageMyTelFuelPutInList.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthMyTelFuelPutIn.pageMyTelFuelPutInList" %>

<%@ Register Assembly="DevExpress.Web.v17.2, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <%--<link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' rel="stylesheet" />--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Services</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="">Customer Group </a></li>
        <li class="active" data-translate="">Fueling PutIn </li>
        <%-- <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/customergroupservice');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">New</span></button>
        --%>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span><span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-archive"></i>&nbsp;<span data-translate="">Fueling Put In</span><span class="list_total_amount"></span></h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body" id="backdetect">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-3">
                                                <div class="btn-group">
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                        <i class="btn-label ion-chevron-left"></i>
                                                        <span data-translate="" class="bold">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">

                                                        <span data-translate="" class="bold">ေနာက္</span>&nbsp;
                                                        <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>

                                            </div>
                                            <div class="col-md-2  col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>

                                              <div class="col-md-4">
                                              <div id="lookup_groupname"></div>

                                            </div>
                                        </div>

                                    </form>
                                    <br />
                                    <br />
                                    <div class="dx-viewport demo-container">
                                        <div id="gridContainer"></div>
                                        <div class="options">
                                            <div class="option">
                                                <div id="autoExpand"></div>
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
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%=ResolveUrl("pageMyTelFuelPutInList.js")%>'></script>

</asp:Content>
