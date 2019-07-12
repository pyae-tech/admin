<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageModules.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.masterFiles.pageModules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <hr class="new-section-sm bord-no">
    <div class="text-center">
        <h3>ဘ႑ာေရး.com မွ ၾကိဳဆုိပါသည္။ </h3>
        <p>လုပ္ငန္းလည္ပတ္မွဳတြင္ အေထာက္အကူျပဳေစရန္ အထူးရည္ရႊယ္ျပီး <a href="https://www.systematic-solution.com" class="btn-link">SYSTEMATIC </a>မွ တည္ေဆာက္ထားျခင္း ျဖစ္ပါသည္။</p>
    </div>
    <hr class="new-section-md bord-no">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

                <!--Page content-->
                <!--===================================================-->
                <div id="page-content">
                    
					
					    <div class="row">
					        <div class="col-md-3 col-md-offset-2">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ion-podium icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">Cash Flow System</p>
					                    <p class="text-muted">ေငြ စီးဆင္းမွဳ စာရင္း စနစ္</p> 
					                    <a href="monthlyCashFlow" id="CashFlow" class="btn btn-primary mar-ver">ဝင္မည္</a>
					                </div>
					            </div>
					        </div>
					        <div class="col-md-3">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ti-truck icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">Way Sale System</p>
					                    <p class="text-muted">ျဖန္႕ခ်ီေရာင္းဝယ္ေရး စနစ္</p> 
					                    <a href="cars" id="Distribution" class="btn btn-primary mar-ver"  >ဝင္မည္</a>
					                </div>
					            </div>
					        </div>
					        <div class="col-md-3">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ti-shopping-cart icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">Station Sale System</p>
					                    <p class="text-muted">ဆုိင္ အေရာင္း စနစ္</p> 
					                         <a href="invoices" id="SaleBook" class="btn btn-primary mar-ver"  >ဝင္မည္</a>
					                </div>
					            </div>
					        </div>
					    </div>
					 
									    <div class="row">
					        <div class="col-md-3 col-md-offset-2">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ion-location icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">Sacout - Marketing System</p>
					                    <p class="text-muted">ေစ်းကြက္ ရွာေဖြေရး စနစ္</p> 
					                    <a href="monthlyCashFlow" id="Marketing" class="btn btn-primary mar-ver">ဝင္မည္</a>
					                </div>
					            </div>
					        </div>
					           <div class="col-md-3  ">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ion-cube icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">Inventory System</p>
					                    <p class="text-muted">ကုန္ပစၥည္း ထိန္းသိမ္းျခင္း စနစ္</p> 
					                    <a href="monthlyCashFlow" id="Inventory" class="btn btn-primary mar-ver">ဝင္မည္</a>
					                </div>
					            </div>
					        </div> <div class="col-md-3  ">
					            <div class="panel">
					                <div class="panel-body text-center">
					                    <div class="pad-ver mar-top text-main"><i class="ion-person-stalker icon-4x"></i></div>
					                    <p class="text-lg text-semibold mar-no text-main">HR System</p>
					                    <p class="text-muted">ဝန္ထမ္းေရးရာ စနစ္</p>
					                   
					                    <a href="monthlyCashFlow" id="General" class="btn btn-primary mar-ver">ဝင္မည္</a>
					                </div>
					            </div>
					        </div>
					    </div>
					    
                </div>
                <!--===================================================-->
                <!--End page content-->
    <script src='<%= ResolveUrl("pageModules.js")%>'></script>
          
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script>
        $('#container').removeClass("mainnav-lg");
        $('#container').addClass("mainnav-out slide");

    </script>
    
</asp:Content>
