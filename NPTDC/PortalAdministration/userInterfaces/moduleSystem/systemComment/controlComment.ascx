<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="controlComment.ascx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemComment.controlComment" %>

<div id="Comment_Template" style="display: none" >


    <div class="timeline-entry" onclick="[CommentID]">
        <div class="timeline-stat">
            <div class="timeline-icon">
                <img src="../PortalAdministration/img/profile-photos/9.png" alt="Image">
            </div>
            <div class="timeline-time">[CommentOn]</div>
        </div>
        <div class="timeline-label">
            <p class="mar-no pad-btm"><a href="#" class="btn-link">[CommentByName]</a></p>
            <blockquote class="bq-sm bq-open mar-no">[Comment]</blockquote>
        </div>
    </div>
    
</div>

<div  id="comment_box">


    <div class="timeline" id="comment_box_header" style="padding: 10px;">

        <div class="timeline-header">
            <div class="timeline-header-title bg-success">Now</div>
        </div>
        <div id="tbl_comments"></div>

    </div>


    <input type="hidden" id="Hidden1" value="" />

    <div class="input-group mar-btm">

        <input type="text" class="form-control" id="tb_comment_new" placeholder="Enter your comment here.">
        <span class="input-group-btn">
            <button class="btn btn-info" type="button" onclick="Add_Comment(); return false;" id="btn_save_comment">Keep my comment <i class="btn-label ion-checkmark"></i></button>
        </span>
    </div>
</div>