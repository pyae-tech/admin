using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.login
{
    public partial class signup_facebook : System.Web.UI.Page
    {
        //TODO: paste your facebook-app key here!!
        public const string FaceBookAppKey = "9f00d6668f5340cf137fbfaeac5e1a9c";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(Request.QueryString["access_token"])) return; //ERROR! No token returned from Facebook!!

            //let's send an http-request to facebook using the token            
            string json = GetFacebookUserJSON(Request.QueryString["access_token"]);

            //and Deserialize the JSON response
            JavaScriptSerializer js = new JavaScriptSerializer();
            FacebookUser oUser = js.Deserialize<FacebookUser>(json);

            if (oUser != null)
            {
                Response.Write("Welcome, " + oUser.name);
                Response.Write("<br />id, " + oUser.id);
                Response.Write("<br />email, " + oUser.email);
                Response.Write("<br />first_name, " + oUser.first_name);
                Response.Write("<br />last_name, " + oUser.last_name);
                Response.Write("<br />gender, " + oUser.gender);
                Response.Write("<br />link, " + oUser.link);
                Response.Write("<br />updated_time, " + oUser.updated_time);
                Response.Write("<br />birthday, " + oUser.birthday);
                Response.Write("<br />locale, " + oUser.locale);
                Response.Write("<br />picture, " + oUser.picture);
                if (oUser.location != null)
                {
                    Response.Write("<br />locationid, " + oUser.location.id);
                    Response.Write("<br />location_name, " + oUser.location.name);
                }
            }
           
        }

        /// <summary>
        /// sends http-request to Facebook and returns the response string
        /// </summary>
        private static string GetFacebookUserJSON(string access_token)
        {
            string url = string.Format("https://graph.facebook.com/me?access_token={0}&fields=email,name,first_name,last_name,link,birthday,gender", access_token);

            WebClient wc = new WebClient();
            Stream data = wc.OpenRead(url);
            StreamReader reader = new StreamReader(data);
            string s = reader.ReadToEnd();
            data.Close();
            reader.Close();
            return s;
        }

        public class FacebookUser
        {
            public long id { get; set; }
            public string email { get; set; }

            public string name
            { get; set; }

            public string first_name
            { get; set; }

            public string last_name
            { get; set; }

            public string gender
            { get; set; }

            public string link
            { get; set; }

            public DateTime updated_time
            { get; set; }

            public DateTime birthday
            { get; set; }

            public string locale
            { get; set; }

            public string picture
            { get; set; }

            public FacebookLocation location
            { get; set; }
        }
        public class FacebookLocation
        {
            public string id
            { get; set; }

            public string name
            { get; set; }
        }
    }
}