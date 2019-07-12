using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using SBSPortal3.LINQs;
using System.Web.Services;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleOrderByDate
{
    public partial class SaleOrderByDate : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string orgid = tb_orgid.Value;
            string selecteddate = tb_selecteddate.Value;
            string routeid = tb_routeid.Value;
            string customerid = tb_customerid.Value;
        }
        protected void BtnExportToExcel_Click(object sender, EventArgs e)
        {
            List<string> search_parameters = hf_selected_value.Value.Split('~').ToList();
            string orgid = search_parameters[0];
            string selecteddate = search_parameters[1];
            string routeid = search_parameters[3];
            string customerid = search_parameters[2];

            if (orgid != "" && selecteddate != "")
            {
                string CS = ConfigurationManager.ConnectionStrings["SS_FriendChildConnectionString"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {

                    DataTable myTable = new DataTable();
                    DataSet data = new DataSet();
                    SqlCommand cmd = new SqlCommand("SVN_Get_All_Order_By_Date", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@selected_date", Convert.ToDateTime(selecteddate));
                    cmd.Parameters.AddWithValue("@orgid", orgid);
                    cmd.Parameters.AddWithValue("@routeid", routeid);
                    cmd.Parameters.AddWithValue("@customer_id", customerid);
                    con.Open();
                    SqlDataAdapter dsCommand = new SqlDataAdapter(cmd);
                    dsCommand.Fill(data);
                    con.Close();

                    myTable = data.Tables[1];

                    ExportExcel(myTable);
                }

            }

        }

        public void ExportExcel(DataTable dt)
        {
            string attachment = "attachment; filename=OrderItem List.xls";
            Response.ClearContent();
            Response.AddHeader("content-disposition", attachment);
            Response.ContentType = "application/vnd.ms-excel";
            string tab = "";
            foreach (DataColumn dc in dt.Columns)
            {
                Response.Write(tab + dc.ColumnName);
                tab = "\t";
            }
            Response.Write("\n");
            int i;
            foreach (DataRow dr in dt.Rows)
            {
                tab = "";
                for (i = 0; i < dt.Columns.Count; i++)
                {
                    Response.Write(tab + dr[i].ToString());
                    tab = "\t";
                }
                Response.Write("\n");
            }
            Response.End();
        }

        [WebMethod]
        public static string GetUserMessage(string message)
        {
            return "Welcome " + message + Environment.NewLine + System.DateTime.Now;
        }
    }
}