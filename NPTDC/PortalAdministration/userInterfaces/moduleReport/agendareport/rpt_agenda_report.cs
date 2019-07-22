using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;
using System.Data;
using System.Data.Linq;
using System.Web.UI.WebControls;
using DevExpress.DataAccess.Sql.DataApi;
using System.Collections.Generic;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.agendareport
{
    public partial class rpt_agenda_report : DevExpress.XtraReports.UI.XtraReport
    {
        private IEnumerable<IRow> resultList;

        public object DetailReport { get; private set; }

        public rpt_agenda_report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string agendaID, string depID)
        {
            parameter1.Value = agendaID;
            parameter2.Value = depID;
            sqlDataSource1.Fill();
        }

        public static string WordstoNumber(string number)
        {
            switch (number)
            {
                case "2019": return "၂၀၁၉";
                
            }
            return "";


        }
        public static string WordstoMonth(string month)
        {
            switch (month)
            {
                case "01": return "၁";
                case "02": return "၂";
                case "03": return "၃";
                case "04": return "၄";
                case "05": return "၅";
                case "06": return "၆";
                case "07": return "၇";
                case "08": return "၈";
                case "09": return "၉";
                case "10": return "၁၀";
                case "11": return "၁၁";
                case "12": return "၁၂";
            }
            return "";
        }

        public static string WordstoDay (string Day)
        {
            switch(Day)
            {
                case "01": return "၁";
                case "02": return "၂";
                case "03": return "၃";
                case "04": return "၄";
                case "05": return "၅";
                case "06": return "၆";
                case "07": return "၇";
                case "08": return "၈";
                case "09": return "၉";
                case "10": return "၁၀";
                case "11": return "၁၁";
                case "12": return "၁၂";
                case "13": return "၁၃";
                case "14": return "၁၄";
                case "15": return "၁၅";
                case "16": return "၁၆";
                case "17": return "၁၇";
                case "18": return "၁၈";
                case "19": return "၁၉";
                case "20": return "၂၀";
                case "21": return "၂၁";
                case "22": return "၂၂";
                case "23": return "၂၃";
                case "24": return "၂၄";
                case "25": return "၂၅";
                case "26": return "၂၆";
                case "27": return "၂၇";
                case "28": return "၂၈";
                case "29": return "၂၉";
                case "30": return "၃၀";
                case "31": return "၃၁";
            }
            return "";
        }

        public static string GetMM_Number(int i)
        {
            switch (i)
            {
                case 1: return "၁";
                case 2: return "၂";
                case 3: return "၃";
                case 4: return "၄";
                case 5: return "၅";
                case 6: return "၆";
                case 7: return "၇";
                case 8: return "၈";
                case 9: return "၉";
                case 10: return "၁၀";
                case 11: return "၁၁";
                case 12: return "၁၂";
                case 13: return "၁၃";
                case 14: return "၁၄";
                case 15: return "၁၅";
                case 16: return "၁၆";
                case 17: return "၁၇";
                case 18: return "၁၈";
                case 19: return "၁၉";
                case 20: return "၂၀";
                case 21: return "၂၁";
                case 22: return "၂၂";
                case 23: return "၂၃";
                case 24: return "၂၄";
                case 25: return "၂၅";
                case 26: return "၂၆";
                case 27: return "၂၇";
                case 28: return "၂၈";
                case 29: return "၂၉";
                case 30: return "၃၀";
                case 31: return "၃၁";
                case 32: return "၃၂";
                case 33: return "၃၃";
                case 34: return "၃၄";
                case 35: return "၃၅";
                case 36: return "၃၆";
                case 37: return "၃၇";
                case 38: return "၃၈";
                case 39: return "၃၉";
                case 40: return "၄၀";
                case 41: return "၄၁";
                case 42: return "၄၂";
                case 43: return "၄၃";
                case 44: return "၄၄";
                case 45: return "၄၅";
                case 46: return "၄၆";
                case 47: return "၄၇";
                case 48: return "၄၈";
                case 49: return "၄၉";
                case 50: return "၅၀";

            }
            return "";
        }
        private void xrLabel8_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            DateTime date = Convert.ToDateTime(GetCurrentColumnValue("AgendaDate"));
            string get_year = date.ToString("yyyy");
            lbl_numbertotext.Text = WordstoNumber(get_year).ToString();
        }

        private void lbl_month_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            DateTime date = Convert.ToDateTime(GetCurrentColumnValue("AgendaDate"));
            string get_month = date.ToString("MM");
            lbl_month.Text = WordstoMonth(get_month).ToString();
        }

        private void lbl_day_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            DateTime date = Convert.ToDateTime(GetCurrentColumnValue("AgendaDate"));
            string get_day = date.ToString("dd");
            lbl_day.Text = "(" +WordstoDay(get_day).ToString()+ ")";
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //System.Data.Linq.ITable resultsList = GetCurrentColumnValue("DepartmentName") as System.Data.Linq.ITable;

            //foreach (IRow row in resultList)
            //{
            //    string columnValue = (string)row["DepartmentName"];

            //}


        }
    }
}
