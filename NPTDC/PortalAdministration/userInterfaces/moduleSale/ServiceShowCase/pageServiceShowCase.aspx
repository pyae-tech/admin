<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Sale.master" AutoEventWireup="true" CodeBehind="pageServiceShowCase.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSale.ServiceShowCase.pageServiceShowCase" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">

    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_Services">Services</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="_Services">Service</li>
        <li class="active">

            <div class="btn-group">
                <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveService();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                    <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/service');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span data-translate="_log" class="bold">Log</span></button>
                <button data-dismiss="modal" class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/services');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


            </div>
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
                                <div class="col-md-2" style="width: 11%;">
                                    <label>
                                        <input value="" type="checkbox" id="btn_search_all_dates">
                                        ေန႔စြဲအားလုံးရွာမည္။</label>
                                </div>

                                <div class="col-md-2" style="width: 11%;">
                                    <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                </div>


                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_search_text" placeholder="Search Text">
                                </div>


                                <div class="col-md-2" style="width: ;">
                                    <input type="hidden" id="hf_customergroup" value="" />
                                   <select id="ddl_customergroup" class="form-control demo_select2"></select>
                                </div>

                                <div class="col-md-2" style="width: ;">
                                  <input type="hidden" id="hf_typeoftower" value="" />
                                                <select id="ddl_typeoftower" class="form-control chzn-select demo_select2"></select>

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
                            <div class="map" style="width: 100%; height: 700px; border: dashed;"></div>
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
   <script type="text/javascript" src='<%= ResolveUrl("https://maps.google.com/maps/api/js?key=AIzaSyBRph29gJJ_G4zVm-qtjLLpYt2GXv2ePLY&callback=initMap")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/map/gmap3.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageServiceShowCase.js")%>'></script>

</asp:Content>
