using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class rpt_request_report : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_request_report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string depID,string reqID)
        {
            par_depID.Value = depID;
            par_REQID.Value = reqID;
            parameter1.Value = reqID;
            sqlDataSource1.Fill();
        }

    }
}
