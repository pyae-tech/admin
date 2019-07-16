using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class rpt_report_request_item : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_report_request_item()
        {
            InitializeComponent();
        }
        public void do_fill_data(string reqID)
        {
            parameter1.Value = reqID;
            sqlDataSource1.Fill();
        }
    }
}
