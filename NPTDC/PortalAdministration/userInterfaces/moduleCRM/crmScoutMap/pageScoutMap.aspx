<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.master" AutoEventWireup="true" CodeBehind="pageScoutMap.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmScoutMap.pageScoutMap" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
  <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Scout Map</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->

    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="">Marketing</a></li>
        <li class="active" data-translate="">Scout Map</li>

        <li>
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/scouttypes');return false;"><i class="btn-label ion-navicon-round"></i><span data-translate="" class="bold">Scout Types</span></button>
        </li>
    </ol>

    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">

        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel  ">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="">Search</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group row">
                                <div class="col-md-2">
                                      <div id="btn_search_all_dates"></div>
                                  <%--  <label>
                                        <input value="" type="checkbox" id="btn_search_all_dates">
                                        ေန႔စြဲအားလုံးရွာမည္။</label>--%>
                                </div>

                                <div class="col-md-2" style="text-align:center;" >
                                     <div id="tb_search_from_date"></div>
                                    <%--<input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">--%>
                                </div>
                                
                                <%--<div class="col-md-2">
                                    <div id="tb_search_text"></div>
                                </div>--%>


                                <div class="col-md-2">
                                   <div id="tb_TownshipName"></div>
                                    <%--<select id="tb_TownshipName" class="form-control"></select>--%>
                                </div>

                                <div class="col-md-2">
                                   <div id="tb_search_uploadedId"></div>  
                                    <%--<select id="tb_search_uploadedId" class="form-control"></select>--%>

                                </div>
                                <div class="col-md-1">
                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                        <i class="ion-search"></i>
                                    </button>
                                </div>

                            </div>



                        </div>

                    </div>
                </form>
            </div>

        </div>

        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="_purchase_order_rec">Purchase Order's Received</span></h3>
                        </div>
                        <div class="panel-body" style="/*background: whitesmoke; border: 1px solid #d1c4b9;*/ min-height: 500px;">
                            <!-- Map box -->
                            <div class="map" style="width: 100%; height: 500px; border: dashed;"></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2" style="display:none;">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_po_received_id" value="" />
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="">Scout Information</span></h3>
                        </div>
                        <div class="panel-body">
                            <table style="display: none">
                                <tbody id="template_row">
                                    <tr style="cursor: pointer;" onclick="GetDetailScoutInfoById('[ScoutID]');return false;">
                                           <td>[CompanyName]</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="table-responsive">
                                <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                    <thead>
                                        <tr>
                                            <th style="text-align: center">Company</th>
                                        </tr>
                                    </thead>
                                    <tbody id="table_list">
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
     <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>    
      <script type="text/javascript" src='<%= ResolveUrl("https://maps.google.com/maps/api/js?key=AIzaSyBRph29gJJ_G4zVm-qtjLLpYt2GXv2ePLY&callback=initMap")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/map/gmap3.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageScoutMap.js")%>'></script>
</asp:Content>
