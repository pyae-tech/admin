﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="settings.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.masterFiles.settings" %>

        <!-- SETTINGS - DEMO PURPOSE ONLY -->
        <!--===================================================-->

        <div id="demo-set-alert"></div>
        <div class="pad-hor bord-btm clearfix">
            <div class="pull-right pad-top">
                <button id="demo-btn-close-settings" class="btn btn-trans">
                    <i class="pci-cross pci-circle icon-lg"></i>
                </button>
            </div>
            <div class="media">
                <div class="media-left">
                </div>
                <div class="media-body">
                    <span class="text-main text-semibold text-lg text-uppercase">Costomize</span>
                    <p class="text-muted text-xs">Customize Nifty's layout, sidebars, and color schemes.</p>
                </div>
            </div>
        </div>
        <div class="clearfix">
            <div class="col-xs-6 col-md-3">
                <div class="pad-all">
                    <p class="text-main text-bold text-uppercase">Layout</p>
                    <p class="text-semibold text-uppercase text-xs text-muted">Boxed Layout</p>
                    <hr class="new-section-xs">
                    <div class="mar-btm">
                        <div class="pull-right">
                            <input id="demo-box-lay" class="toggle-switch" type="checkbox">
                            <label for="demo-box-lay"></label>
                        </div>
                        Boxed Layout
                    </div>
                    <div class="mar-btm">
                        <div class="pull-right">
                            <input id="demo-box-img" class="toggle-switch" type="checkbox" disabled>
                            <label for="demo-box-img"></label>
                        </div>
                        Background Images <i id="demo-set-tooltip" class="demo-psi-information icon-lg" data-title="You must enable the BOXED LAYOUT to use this feature."></i>
                    </div>

                    <hr class="new-section-xs bord-no">
                    <p class="text-semibold text-uppercase text-xs text-muted">Animations</p>
                    <hr class="new-section-xs">
                    <div class="mar-btm">
                        <div class="pull-right">
                            <input id="demo-anim" class="toggle-switch" type="checkbox" checked>
                            <label for="demo-anim"></label>
                        </div>
                        Enable Animations
                    </div>
                    <div class="mar-btm clearfix">
                        <div class="select pull-right">
                            <select id="demo-ease">
                                <option value="effect" selected>ease (Default)</option>
                                <option value="easeInQuart">easeInQuart</option>
                                <option value="easeOutQuart">easeOutQuart</option>
                                <option value="easeInBack">easeInBack</option>
                                <option value="easeOutBack">easeOutBack</option>
                                <option value="easeInOutBack">easeInOutBack</option>
                                <option value="steps">Steps</option>
                                <option value="jumping">Jumping</option>
                                <option value="rubber">Rubber</option>
                            </select>
                        </div>
                        Transitions
                    </div>

                    <hr class="new-section-xs bord-no">

                    <p class="text-semibold text-uppercase text-xs text-muted">Header / Navbar</p>
                    <hr class="new-section-xs">
                    <div>
                        <div class="pull-right">
                            <input id="demo-navbar-fixed" class="toggle-switch" type="checkbox">
                            <label for="demo-navbar-fixed"></label>
                        </div>
                        Fixed Position
                    </div>

                    <hr class="new-section-xs bord-no">

                    <p class="text-semibold text-uppercase text-xs text-muted">Footer</p>
                    <hr class="new-section-xs">
                    <div class="pad-btm">
                        <div class="pull-right">
                            <input id="demo-footer-fixed" class="toggle-switch" type="checkbox">
                            <label for="demo-footer-fixed"></label>
                        </div>
                        Fixed Position
                    </div>
                </div>
            </div>
            <div class="col-lg-9 pos-rel">
                <div class="row">
                    <div class="col-lg-4 bg-gray-light">
                        <div class="pad-all">
                            <p class="text-bold text-uppercase text-main">Sidebars</p>
                            <p class="text-semibold text-uppercase text-xs text-muted">Navigation</p>
                            <hr class="new-section-xs">
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-nav-fixed" class="toggle-switch" type="checkbox">
                                    <label for="demo-nav-fixed"></label>
                                </div>
                                Fixed Position
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-nav-profile" class="toggle-switch" type="checkbox" checked>
                                    <label for="demo-nav-profile"></label>
                                </div>
                                Widget Profil
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-nav-shortcut" class="toggle-switch" type="checkbox" checked>
                                    <label for="demo-nav-shortcut"></label>
                                </div>
                                Shortcut Buttons
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-nav-coll" class="toggle-switch" type="checkbox">
                                    <label for="demo-nav-coll"></label>
                                </div>
                                Collapsed Mode
                            </div>

                            <div class="clearfix">
                                <div class="pad-btm pull-right">
                                    <div class="select">
                                        <select id="demo-nav-offcanvas">
                                            <option value="none" selected disabled="disabled">-- Select Mode --</option>
                                            <option value="push">Push</option>
                                            <option value="slide">Slide in on top</option>
                                            <option value="reveal">Reveal</option>
                                        </select>
                                    </div>
                                </div>
                                Off-Canvas
                            </div>
                            <hr class="new-section-xs bord-no">

                            <p class="text-semibold text-uppercase text-xs text-muted">Aside</p>
                            <hr class="new-section-xs">
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-asd-vis" class="toggle-switch" type="checkbox">
                                    <label for="demo-asd-vis"></label>
                                </div>
                                Visible
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-asd-fixed" class="toggle-switch" type="checkbox" checked>
                                    <label for="demo-asd-fixed"></label>
                                </div>
                                Fixed Position
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-asd-float" class="toggle-switch" type="checkbox" checked>
                                    <label for="demo-asd-float"></label>
                                </div>
                                Floating
                            </div>
                            <div class="mar-btm">
                                <div class="pull-right">
                                    <input id="demo-asd-align" class="toggle-switch" type="checkbox">
                                    <label for="demo-asd-align"></label>
                                </div>
                                Left Side
                            </div>
                            <div>
                                <div class="pull-right">
                                    <input id="demo-asd-themes" class="toggle-switch" type="checkbox">
                                    <label for="demo-asd-themes"></label>
                                </div>
                                Dark Version
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div id="demo-theme">
                            <p class="text-main text-bold text-uppercase text-left">Color Schemes</p>
                            <hr class="new-section-xs">
                            <div class="clearfix demo-full-theme">
                                <div class="col-md-6">
                                    <div class="media v-middle">
                                        <div class="media-left demo-single-theme">
                                            <a href="#" class="demo-theme demo-theme-light add-tooltip" data-theme="theme-light-full" data-type="full" data-title="Light"></a>
                                        </div>
                                        <div class="media-body">
                                            <p class="text-bold text-main mar-no text-uppercase text-sm">Light</p>
                                            <small class="text-muted text-xs">Completely Light theme</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media v-middle">
                                        <div class="media-left demo-single-theme">
                                            <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark-full" data-type="full" data-title="Dark"></a>
                                        </div>
                                        <div class="media-body">
                                            <p class="text-bold text-main mar-no text-uppercase text-sm">Dark <small class="label label-info">NEW</small></p>
                                            <small class="text-muted text-xs">Completely Dark theme</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="bord-no new-section-xs">
                            <div class="clearfix text-center demo-srow-scheme bg-gray-light pad-ver mar-top">
                                <div class="demo-theme-btn col-md-6">
                                    <p class="text-semibold text-uppercase text-xs text-muted">Modern</p>
                                    <div class="media">
                                        <div class="media-left">
                                            <img src='<%= ResolveUrl("../../../img/color-schemes-e.png")%>'>
                                        </div>
                                        <div class="media-body">
                                            <p class="text-main text-bold text-sm mar-no">NEW SCHEMES MODE</p>
                                            <small>Added in v2.9</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-6">
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="e" data-title="(E). Gray"></a>
                                        <a href="#" class="demo-theme demo-theme-navy add-tooltip active" data-theme="theme-navy" data-type="e" data-title="(E). Navy Blue"></a>
                                        <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="e" data-title="(E). Ocean"></a>

                                        <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="e" data-title="(E). Lime"></a>
                                        <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="e" data-title="(E). Purple"></a>
                                        <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="e" data-title="(E). Dust"></a>

                                        <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="e" data-title="(E). Mint"></a>
                                        <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="e" data-title="(E). Yellow"></a>
                                        <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="e" data-title="(E). Well Red"></a>

                                        <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="e" data-title="(E). Coffee"></a>
                                        <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="e" data-title="(E). Prickly pear"></a>
                                        <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark" data-type="e" data-title="(E). Dark"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix text-center">
                                <div class="demo-theme-btn col-md-3 pad-ver">
                                    <p class="text-semibold text-uppercase text-xs text-muted">Header</p>
                                    <div class="mar-btm">
                                        <img src='<%= ResolveUrl("../../../img/color-schemes-a.png")%>' class="img-responsive">
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="a" data-title="(A). Gray"></a>
                                        <a href="#" class="demo-theme demo-theme-navy add-tooltip" data-theme="theme-navy" data-type="a" data-title="(A). Navy Blue"></a>
                                        <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="a" data-title="(A). Ocean"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="a" data-title="(A). Lime"></a>
                                        <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="a" data-title="(A). Purple"></a>
                                        <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="a" data-title="(A). Dust"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="a" data-title="(A). Mint"></a>
                                        <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="a" data-title="(A). Yellow"></a>
                                        <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="a" data-title="(A). Well Red"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="a" data-title="(A). Coffee"></a>
                                        <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="a" data-title="(A). Prickly pear"></a>
                                        <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark" data-type="a" data-title="(A). Dark"></a>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-3 pad-ver">
                                    <p class="text-semibold text-uppercase text-xs text-muted">Brand</p>
                                    <div class="mar-btm">
                                        <img src='<%= ResolveUrl("../../../img/color-schemes-b.png")%>' class="img-responsive">
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="b" data-title="(B). Gray"></a>
                                        <a href="#" class="demo-theme demo-theme-navy add-tooltip" data-theme="theme-navy" data-type="b" data-title="(B). Navy Blue"></a>
                                        <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="b" data-title="(B). Ocean"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="b" data-title="(B). Lime"></a>
                                        <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="b" data-title="(B). Purple"></a>
                                        <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="b" data-title="(B). Dust"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="b" data-title="(B). Mint"></a>
                                        <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="b" data-title="(B). Yellow"></a>
                                        <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="b" data-title="(B). Well red"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="b" data-title="(B). Coofee"></a>
                                        <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="b" data-title="(B). Prickly pear"></a>
                                        <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark" data-type="b" data-title="(B). Dark"></a>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-3 pad-ver">
                                    <p class="text-semibold text-uppercase text-xs text-muted">Navigation</p>
                                    <div class="mar-btm">
                                        <img src='<%= ResolveUrl("../../../img/color-schemes-c.png")%>' class="img-responsive">
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="c" data-title="(C). Gray"></a>
                                        <a href="#" class="demo-theme demo-theme-navy add-tooltip" data-theme="theme-navy" data-type="c" data-title="(C). Navy Blue"></a>
                                        <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="c" data-title="(C). Ocean"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="c" data-title="(C). Lime"></a>
                                        <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="c" data-title="(C). Purple"></a>
                                        <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="c" data-title="(C). Dust"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="c" data-title="(C). Mint"></a>
                                        <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="c" data-title="(C). Yellow"></a>
                                        <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="c" data-title="(C). Well Red"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="c" data-title="(C). Coffee"></a>
                                        <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="c" data-title="(C). Prickly pear"></a>
                                        <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark" data-type="c" data-title="(C). Dark"></a>
                                    </div>
                                </div>
                                <div class="demo-theme-btn col-md-3 pad-ver">
                                    <p class="text-semibold text-uppercase text-xs text-muted">Full Top Bar</p>
                                    <div class="mar-btm">
                                        <img src='<%= ResolveUrl("../../../img/color-schemes-d.png")%>' class="img-responsive">
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-gray add-tooltip" data-theme="theme-gray" data-type="d" data-title="(D). Gray"></a>
                                        <a href="#" class="demo-theme demo-theme-navy add-tooltip" data-theme="theme-navy" data-type="d" data-title="(D). Navy Blue"></a>
                                        <a href="#" class="demo-theme demo-theme-ocean add-tooltip" data-theme="theme-ocean" data-type="d" data-title="(D). Ocean"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-lime add-tooltip" data-theme="theme-lime" data-type="d" data-title="(D). Lime"></a>
                                        <a href="#" class="demo-theme demo-theme-purple add-tooltip" data-theme="theme-purple" data-type="d" data-title="(D). Purple"></a>
                                        <a href="#" class="demo-theme demo-theme-dust add-tooltip" data-theme="theme-dust" data-type="d" data-title="(D). Dust"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-mint add-tooltip" data-theme="theme-mint" data-type="d" data-title="(D). Mint"></a>
                                        <a href="#" class="demo-theme demo-theme-yellow add-tooltip" data-theme="theme-yellow" data-type="d" data-title="(D). Yellow"></a>
                                        <a href="#" class="demo-theme demo-theme-well-red add-tooltip" data-theme="theme-well-red" data-type="d" data-title="(D). Well Red"></a>
                                    </div>
                                    <div class="demo-justify-theme">
                                        <a href="#" class="demo-theme demo-theme-coffee add-tooltip" data-theme="theme-coffee" data-type="d" data-title="(D). Coffee"></a>
                                        <a href="#" class="demo-theme demo-theme-prickly-pear add-tooltip" data-theme="theme-prickly-pear" data-type="d" data-title="(D). Prickly pear"></a>
                                        <a href="#" class="demo-theme demo-theme-dark add-tooltip" data-theme="theme-dark" data-type="d" data-title="(D). Dark"></a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div id="demo-bg-boxed" class="demo-bg-boxed">
                    <div class="demo-bg-boxed-content">
                        <p class="text-bold text-uppercase text-main text-lg mar-no">Background Images</p>
                        <p class="text-sm text-muted">Add an image to replace the solid background color</p>
                        <hr class="new-section-sm bord-no">
                        <div class="row">
                            <div class="col-lg-4 text-justify">
                                <p class="text-bold text-uppercase text-main">Blurred</p>
                                <div id="demo-blurred-bg" class="text-justify">
                                    <!--Blurred Backgrounds-->
                                </div>
                            </div>
                            <div class="col-lg-4 text-justify">
                                <p class="text-bold text-uppercase text-main">Polygon &amp; Geometric</p>
                                <div id="demo-polygon-bg" class="text-justify">
                                    <!--Polygon Backgrounds-->
                                </div>
                            </div>
                            <div class="col-lg-4 text-justify">
                                <p class="text-bold text-uppercase text-main">Abstract</p>
                                <div id="demo-abstract-bg" class="text-justify">
                                    <!--Abstract Backgrounds-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-bg-boxed-footer">
                        <button id="demo-close-boxed-img" class="btn btn-primary">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!--===================================================-->
        <!-- END SETTINGS -->


