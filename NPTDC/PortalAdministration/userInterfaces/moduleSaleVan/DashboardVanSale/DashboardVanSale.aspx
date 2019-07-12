<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.Master" AutoEventWireup="true" CodeBehind="DashboardVanSale.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.DashboardVanSale.DashboardVanSale" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <br />
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Dashboard Van Sale</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_vansale">Van Sale</a></li>
        <li class="active" data-translate="">Tracking Ways</li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="row">
            <div class="col-md-12">
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <%--<h3 class="panel-title" data-translate="_waysale">Way Sale</h3>--%>
                      &nbsp;  &nbsp;<h3 data-translate="" style="margin-left: 12px; margin-top: -1px;"><i class="ion-speedometer"></i>&nbsp; Tracking Ways </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">

                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                </div>

                                <div class="col-md-3">
                                    <div class="btn-group">
                                        <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                            <i class="btn-label ion-chevron-left"></i>
                                            <span data-translate="_front" class="bold">ေရွ႕</span></button>
                                        <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">

                                            <span data-translate="_back" class="bold">ေနာက္</span>
                                            <i class="btn-label ion-chevron-right"></i>
                                        </button>
                                    </div>

                                </div>
                                <div class="col-md-2" style="display:none">
                                    <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                </div>
                                
                            </div>
                        </form>
                        <br>
                        <br>
                        <div id="template_row" style="display: none">
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-2 row">                                  
                                    <a id="car_[count]" onclick="ViewRouteOnMap('[WayID]','[RouteID]','car_[count]','[CarNo]')" style="cursor: pointer;" onmouseover="this.style.color='red'" onmouseout="this.style.color=''" class="gomap">
                                        <i class="ion-arrow-graph-up-right icon-fw"></i><b>[WayNo]</b>
                                        <br />
                                        <span><b><i class="ion-man"></i>&nbsp;[CarSaleMan]</b></span>
                                    </a>
                                    <%-- </a>--%>


                                    <%--<div class="btn btn-rounded" onclick="Car_Click('[CarID]')">
                              </div>--%>
                                </div>
                                <%--<div class="col-md-1" style="text-align: left;">
                                   

                                </div>--%>
                                <div class="col-md-8" style="margin-top: 12px; margin-left: -15px;">
                                    <div class="progress progress-lg" onclick="GoToWaySale('[WayID]','[RouteID]')" style="cursor: pointer;">
                                        <div><span id="start_shop_[index]" class="tiptest btn-labeled"><i class="btn-label ion-location icon-fw"></i>[startShopName]</span></div>
                                        <div id="finished_[index]" style="width: 50%; max-width: 20%" class="progress-bar progress-barani progress-bar-success " role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">[finishedPercent]-Shop Finished </div>
                                        <%--<div><span id="finished_shop_icon_[index]" class="tooltip"><span class="tooltiptext"><i class="ion-model-s icon-2x icon-fw"></i></span></span></div>--%>
                                        <div><span id="finished_shop_[index]" class="tiptest btn-labeled"><i class="btn-label ion-model-s icon-1x icon-fw"></i>&nbsp;[currentShopName]</span></div>
                                        <div id="remain_[index]" style="width: 50%; background-color: #f06276;" class="progress-bar progress-barani ">[remainPercent] -Shop Remain</div>
                                        <div><span id="end_shop_[index]" style="margin-left: 97%" class="tiptest btn-labeled"><i class="btn-label ion-flag icon-fw"></i>[endShopName]</span></div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                          <img src='<%= ResolveUrl("../../../img/nodata.svg")%>' style="width: 100%;" id="img_no_data" />
                        <div id="progessbar_list" style="min-height:300px;border: 0px solid silver;">
                        </div>
                        <hr />
                        <div class="row" id="showMap" style="display: none;">
                            <div class="col-md-12">
                                <div class="panel  ">
                                    <div class="panel-heading">
                                        <div class="panel-control">
                                        </div>
                                        <div class="row">
                                            <h3 class="panel-title"><span data-translate="">Route Map </span>&nbsp;
                                              <b>[<span id="car_title">Car</span>]</b>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <!-- Map box -->
                                        <div class="map" style="width: 100%; height: 500px; border: dashed;"></div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <!--Map Example [ SAMPLE ]-->

    <script type="text/javascript" src='<%= ResolveUrl("https://maps.google.com/maps/api/js?key=AIzaSyBRph29gJJ_G4zVm-qtjLLpYt2GXv2ePLY&callback=initMap")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/map/gmap3.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/Progress-bar/jquery.stepProgressBar.js")%>'></script>
    <script src='<%= ResolveUrl("DashboardVanSale.js")%>'></script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <style>
        .barfiller1 {
            width: 100%;
            height: 12px;
            background: #fcfcfc;
            border: 1px solid #ccc;
            position: relative;
            margin-bottom: 20px;
            box-shadow: inset 1px 4px 9px -6px rgba(0,0,0,.5);
            -moz-box-shadow: inset 1px 4px 9px -6px rgba(0,0,0,.5);
        }

        .tiptest {
            border-radius: 7px;
            background-repeat: repeat;
            margin-top: -30px;
            padding: 2px 4px;
            font-size: 11px;
            color: #fff;
            left: 0px;
            position: absolute;
            z-index: 2;
            background: #355373;
            width: 100px;
            text-align: center;
        }

            .tiptest:after {
                border: solid;
                border-color: rgba(0,0,0,.8) transparent;
                border-width: 6px 6px 0 6px;
                content: "";
                display: block;
                position: absolute;
                left: 9px;
                top: 100%;
                z-index: 9
            }

        .progress-barani {
            width: 0;
            animation: progress 1.1s ease-in-out forwards;
            .title

        {
            opacity: 0;
            animation: show 0.25s forwards ease-in-out 0.5s;
        }

        }

        @keyframes progress {
            from {
                width: 0;
            }

            to {
                width: 100%;
            }
        }

        @keyframes show {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }
    </style>
    <link href='<%= ResolveUrl("../../../plugins/Progress-bar/jquery.stepProgressBar.css")%>' rel="stylesheet" />
    <link href='<%= ResolveUrl("../../../plugins/Progress-Bar-Barfiller/css/style_barfiller.css")%>' rel="stylesheet" />
</asp:Content>

