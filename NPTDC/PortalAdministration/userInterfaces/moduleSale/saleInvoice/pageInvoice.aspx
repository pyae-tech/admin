<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.Master" AutoEventWireup="true" CodeBehind="pageInvoice.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleInvoice.pageInvoice" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
        .full-width {
     height:19px;
     width:70px;
     display:inline-block;
     padding-top:4px;
     padding-bottom:5px;
}
        .customClass {
       height: 300px !important;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_invoice">Invoices</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="_invoice">Invoice</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/invoice');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
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
                        <div class="panel-heading" style="display:none;">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span> <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_advancedsearch">Advanced search</a></li>
                                </ul>
                            </div>
                           
                        </div>
                         <h3><i class="ion-printer"></i>&nbsp;<span data-translate="_invoice">Invoices</span> <span class="list_total_amount"></span></h3>
                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content" >
                                <div class="tab-pane fade in " id="tab-list" style="min-height:650px;">

                                    <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>


                                            <div class="col-md-4 col-sm-4">
                                                <div class="btn-group">
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                        <i class="btn-label ion-chevron-left"></i>
                                                        <span class="bold" data-translate="_front">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">
                                                        <span class="bold" data-translate="_back">ေနာက္</span>    <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-md-3">                                               
                                               <%--  <select id="tb_customer_name" class="form-control" onchange="SelectChange();"></select>--%>
                                            </div>
                                            <div class="col-md-1">
                                                <div class="checkbox pad-btm text-left">
                                                    <input value="" type="checkbox" id="btn_search_all_dates" class="magic-checkbox" />
                                                    <label for="btn_search_all_dates">Range</label>
                                                </div>
                                            </div>
                                            <div class="col-md-2  col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>


                                        </div>





                                    </form>
                                 

                                         <div class="dx-viewport demo-container" id="panel_list_background" style="min-height:300px;">
                                        <div id="gridContainer" ></div>
                                        <div class="options">

                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                               <%-- <div class="tab-pane fade" id="tab-search">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">
                                                    <div class="form-group">
                                                        <label for="tb_search_text" class="col-md-2 control-label">Customer</label>
                                                        <div class="col-md-6">
                                                             <select id="tb_customer_name" class="form-control" onchange="SelectChange();"></select>
                                                        </div>

                                                    </div>
                                                    <div class="form-group">
                                                        <label for="tb_search_text" class="col-md-2 control-label">Search Text</label>
                                                        <div class="col-md-6">
                                                            <input type="text"  id ="tb_search_invoice_text" class="form-control"/>
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
                                </div>--%>
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
    <script src='<%= ResolveUrl("pageInvoice.js")%>'></script>
</asp:Content>
