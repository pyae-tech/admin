<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.master" AutoEventWireup="true" CodeBehind="pageCarScheduleRoute.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.carScheduleRoute.pageCarScheduleRoute" %>

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
                <div class="row">
                    <div class="col-md-6">
                              <div class="fixed-fluid">
                    <div class="fixed-sm-200 pull-sm-left file-sidebar">


                        <p class="pad-hor mar-top text-main text-bold text-sm text-uppercase" data-translate="_carnolist">Car No List</p>
                        <div class="list-group bg-trans pad-ver bord-btm" id="div_car_list">
                        </div>
                         <input type="hidden" id="tb_carId" />


                    </div>
                    <div class="fluid file-panel ">

                        <div class="row">
                            <div class="col-md-12 panel panel-colorful   ">
                              
                                <div class="file-toolbar bord-btm">
                                    <div class="btn-file-toolbar">

                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>
                                    <%--<div class="btn-file-toolbar">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move up" data-toggle="tooltip"><i class="icon-2x  ion-arrow-up-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Move down" data-toggle="tooltip"><i class="icon-2x ion-arrow-down-a"></i></a>
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Remove from way" data-toggle="tooltip" onclick="Remove_Customer_From_Way();return false;"><i class="icon-2x ion-close"></i></a>
                                    </div>--%>
                                    <div class="btn-file-toolbar col-md-8">
                                        <h4 class="title" style="text-align: center;">
                                            <a class="btn btn-sm" href="#" onclick="monthJump('previous');return false;"><i class="ion-arrow-left-b"></i></a>
                                            <span id="date_title" style="max-width:40px;"></span>
                                            <input type="hidden" id="hf_date_month" value="" /><input type="hidden" id="hf_date_year" value="" />
                                            <a class="btn btn-sm" href="#" onclick="monthJump('next');return false;"><i class="ion-arrow-right-b"></i></a>
                                        </h4>
                                        <input type="hidden" id="hf_date_count" value="" />
                                    </div>
                                  <%--  <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchItemsList" placeholder="Search here">
                                    </div>
                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_ScheduleDate" placeholder="ေန႕စြဲ">
                                    </div>--%>
                                </div>

                                <table style="display: none">
                                    <tbody id="div_schedule_template">
                                        <tr style="cursor: pointer;">
                                            <td style="width:90px;text-align:center;"><b>[dayCount]</b> <br /><small> ( [dayName] )</small></td>
        
                                           <td style="text-align:center;">
                                                <input type="hidden" id="hf_car_sh_route_id_[count]" value="" />
                                               <select id="ddl_route_[count]" class="<%--demo-cs-multiselect--%> col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height:34px; font-weight:bold;" data-style="btn-primary" onchange="Select_Route('[count]','[ScheduleDate]')" tabindex="4"> </select>
                                           </td>
                                        
                                    </tbody>
                                </table>

                                <div class="table-responsive">
                                    <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                        <thead>
                                            <tr>                                                  
                                                <th ><div class="btn btn-danger btn-rounded"><i class='ti-calendar icon-1x icon-fw'></i> <span data-translate="_date">Days</span></div></th>
                                                <th style="text-align: center;"><div class="btn btn-danger btn-rounded"><i class='ti-location-pin icon-1x icon-fw'></i> <span data-translate="_route">Route</span></div> <div class='btn btn-danger btn-rounded'><i class='ti-truck icon-1x icon-fw'></i><span id="car_no"></span></div></th>
                                            </tr>
                                        </thead>
                                        <tbody id="schedule_list">
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row">
                                    <div id="div_pagination" style="padding: 10px;" class="row pull-right">
                                        <input type="hidden" id="hf_current_page" value="1" />
                                        <ul class="pager pager-rounded">
                                            <li><span id="lbl_record_count" class="lbl_record_count"></span></li>
                                            <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this,1);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                            </li>
                                            <li>
                                                <input type="number" id="tb_current_page" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                            <li><a href="#" class="btn_pagination_next" onclick="pageJump(this,1);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                            <li><span id="lbl_page_count" class="lbl_page_count"></span></li>
                                            <li><a class="btn_pagination_jump" href="#" onclick="pageJumpToThis(1);return false;"><i class="ion-refresh"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        <%--    <div class="col-md-4  ">
                                <div class="bord-btm pad-ver">
                                    <ol class="breadcrumb">
                                        <li class="active">Available Car Schedule Route </li>
                                    </ol>
                                </div>
                                <div class="file-toolbar bord-btm">

                                    <div class="btn-file-toolbar">
                                        <input type="text" class="form-control" id="tb_searchroute" placeholder="Search here">
                                    </div>
                                    <div class="btn-file-toolbar">
                                            <span><i class="icon-2x ion-search"></i></span>
                                    </div>
                                    <div class="btn-file-toolbar pull-right">
                                        <a class="btn btn-icon add-tooltip" href="#" data-original-title="Refresh" data-toggle="tooltip"><i class="icon-2x demo-pli-reload-3"></i></a>
                                    </div>
                                </div>

                                <div id="div_available_route_template" style="display: none;">

                                    <li>
                                        <div class="file-control">
                                            <input id="[RouteID]" name="rdo_route" class="magic-radio available_route" type="radio" onclick="Search_Route('[RouteID]')" />
                                            <label for="[RouteID]"></label>
                                        </div>

                                        <div class="file-settings"><a href="#"><i class="pci-ver-dots"></i></a></div>
                                        <div class="file-attach-icon"></div>
                                        <a href="#" class="file-details" onclick="Add_To_List('[RouteID]')">
                                            <div class="media-block">
                                                <div class="media-left"><i class="demo-pli-file-jpg"></i></div>
                                                <div class="media-body">
                                                    <p class="file-name">
                                                        [RouteNo] </br>
                                                    <small>( [RouteSeq] , [Status] )</small>
                                                    </p>

                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </div>

                                <ul class="file-list" id="div_available_customer">
                                </ul>
                                <div class="row">
                                    <div id="div_pagination2" style="padding: 10px;" class="row pull-right">
                                        <input type="hidden" id="hf_current_page2" value="1" />
                                        <ul class="pager pager-rounded">
                                            <li><span id="lbl_record_count2"></span></li>
                                            <li><a href="#" id="btn_pagination_previous2" onclick="pageJump(this,2);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                            </li>
                                            <li>
                                                <input type="number" id="tb_current_page2" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                            <li><a href="#" id="btn_pagination_next2" onclick="pageJump(this,2);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                            <li><span id="lbl_page_count2"></span></li>
                                            <li><a id="#btn_pagination_jump" href="#" onclick="pageJumpToThis(2);return false;"><i class="ion-refresh"></i></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>--%>
                        </div>

                    </div>
                </div>

                    </div>
                    <div class="col-md-6"></div>
                </div>
          
            </div>
        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("pageCarScheduleRoute.js")%>'></script>
</asp:Content>
