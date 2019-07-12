<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.master" AutoEventWireup="true" CodeBehind="pageRouteCustomer.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.routePlan.pageRouteCustomer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-head">
    </div>


    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">

        <div class="panel">
            <div class="pad-all file-manager">
                <div class="fixed-fluid">
                    <div class="fixed-sm-200 pull-sm-left file-sidebar">


                        <p class="pad-hor mar-top text-main text-bold text-sm text-uppercase" data-translate="_vansaleroutes">Van Sale's Routes</p>
                        <div class="list-group bg-trans pad-ver bord-btm" id="div_way_list">
                           
                        </div>



                    </div>
                    <div class="fluid file-panel ">

                        <div class="row">
                            <div class="col-md-8 panel-bordered-primary" >
                                <div class="bord-btm pad-ver">
                                    <input type="hidden" id="tb_routeid" value="" />
                                    <input type="hidden" id="tb_orgid" value="" />                                    
                                    <ol class="breadcrumb">
                                        <li data-translate="_route"><a href="#">Routes</a></li>
                                        <li id="tb_wayname"><a href="#"></a></li>
                                        <li class="active" id="tb_waycustomers"></li>
                                    </ol>
                                </div>
                                <div class="file-toolbar bord-btm">
                                    <div class="btn-file-toolbar">

                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>
                                    <div class="btn-file-toolbar">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move up" data-toggle="tooltip" onclick="Move_Down_Customer();return false;"><i class="icon-2x  ion-arrow-up-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move down" data-toggle="tooltip" onclick="Move_Up_Customer();return false;"><i class="icon-2x ion-arrow-down-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" onclick="CheckAll();return false;" data-original-title="Check All" data-toggle="tooltip"><i class="icon-2x ion-checkmark"></i></a>
                                      <a class="btn btn-icon add-tooltip" href="#" data-original-title="Uncheck All" data-toggle="tooltip" onclick="UnCheckAll();return false;"><i class="icon-2x ion-close"></i></a>
                                       <a class="btn btn-icon add-tooltip" href="#" data-original-title="Remove from way" data-toggle="tooltip" onclick="Remove_Customer_From_Way();return false;"><i class="icon-2x ion-trash-a"></i></a>
                                     
                                        </div>
                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchroutecustomers" placeholder="Search here">
                                    </div>
                                </div>

                                <div id="div_customer_route_template" style="display: none;">
                                    <li>
                                        
                                        <div class="file-control">
                                            <input type="hidden" id="tb_cusseq" value="" />
                                            <span style="margin-left:-7px;"> <small><i>[no]</i></small></span>   &nbsp; &nbsp;
                                            <input id="[RouteCustomerID]" class="magic-checkbox route_customers" type="checkbox">
                                            <label for="[RouteCustomerID]"></label>
                                        </div>
                                        <div class="file-attach-icon"></div>
                                        <a href="#" class="file-details">
                                            <div class="media-block">
                                                   <div class="media-body">
                                                    <p class="file-name">[CustomerName]</p>
                                                    <small>[PhoneNo] / [CustomerAddress] / [CustomerRemark]</small>
                                                </div>
                                                 
                                            </div>
                                        </a>
                                          
                                    </li>
                                </div>

                                <ul id="customer_routes" class="file-list" style="height:700px; overflow-y:scroll;">
                                    <!--File list item-->
                                </ul>

                            </div>
                            <div class="col-md-4" >
                                <div class="bord-btm pad-ver">
                                    <ol class="breadcrumb">
                                        <li class="active" data-translate="_availablecustomer">Available Customers</li>
                                    </ol>
                                </div>
                                <div class="file-toolbar bord-btm">
                                    <div class="btn-file-toolbar">
                                        <a class="btn btn-icon add-tooltip" href="#" onclick="Add_Customer_To_Way();return false;" data-original-title="Add to way" data-toggle="tooltip"><i class="icon-2x ion-arrow-left-a"></i></a>
                                        
                                        <a class="btn btn-icon add-tooltip" href="#" onclick="CheckAllCustomer();return false;" data-original-title="Check All" data-toggle="tooltip"><i class="icon-2x ion-checkmark"></i></a>
                                      <a class="btn btn-icon add-tooltip" href="#" data-original-title="Uncheck All" data-toggle="tooltip" onclick="UnCheckAllCustomer();return false;"><i class="icon-2x ion-close"></i></a>
                                    </div>
                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchcustomers" placeholder="Search here">
                                    </div>
                                    <%--<div class="btn-file-toolbar pull-right">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>   --%>                                
                                </div>

                                <div id="div_available_customer_template" style="display: none;">

                                    <!--File list item-->
                                    <!--File list item-->
                                    <li>
                                        <div class="file-control">
                                            <input id="[CustomerID]" class="magic-checkbox available_customer" type="checkbox">
                                            <label for="[CustomerID]"></label>
                                        </div>
                                        <div class="file-settings"><a href="#"><i class="pci-ver-dots"></i></a></div>
                                        <div class="file-attach-icon"></div>
                                        <a href="#" class="file-details" onclick="Add_To_List('[CustomerID]')">
                                            <div class="media-block">
                                                <div class="media-left"> <i class="ion-person-stalker"></i></div>
                                                <div class="media-body">
                                                    <p class="file-name">[CustomerName]</p>
                                                    <small>[PhoneNo] [Address] </small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </div>

                                <ul class="file-list" id="div_available_customer" style="height:700px;overflow-y:scroll;">
                                </ul>
                                     <div class="row">
                                        <div id="div_pagination" style="padding: 10px;" class="row pull-right">
                                            <input type="hidden" id="hf_current_page" value="1" />
                                            <ul class="pager pager-rounded">
                                                <li><span id="lbl_record_count" class="lbl_record_count"></span></li>
                                                <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                                </li>
                                                <li>
                                                    <input type="number" id="tb_current_page" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                                <li><a href="#" class="btn_pagination_next" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                                <li><span id="lbl_page_count" class="lbl_page_count"></span></li>
                                                <li><a class=" btn_pagination_jump" href="#" onclick="pageJumpToThis();return false;"><i class="ion-refresh"></i></a></li>
                                            </ul>
                                        </div>

                                    </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageRouteCustomer.js")%>'></script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
