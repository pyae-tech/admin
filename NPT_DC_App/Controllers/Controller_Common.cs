using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NPT_DC_App.LINQs;
using System.Net;
using System.IO;

namespace NPT_DC_App.Controllers
{
    public class Controller_Common
    {
        private const string ApiUrl = @"http://api.emailverifyapi.com/api/a/v1";
        private const string QueryFormatString = @"{0}?email={1}&key={2}";
        private const string YourAPIKey = @"<!-- ENTER A VALID KEY HERE-->";
        public static string GeneratePassword()
        {
            string possibles = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
            string keys = "0123456789";
            char[] passwords = new char[6];
            Random rd = new Random();

            for (int i = 0; i < 6; i++)
            {
                passwords[i] = keys[rd.Next(0, keys.Length)];
            }
            return new string(passwords);
        }

        public static string do_verifyemail(string email)
        {
            var readLine = "";
            Console.WriteLine(string.Empty);
            var requestUrl = string.Format(QueryFormatString, ApiUrl, readLine, YourAPIKey);
            var APIKey = "wTJ5CqARCsP3NGUxthkwAsXOJ";
            requestUrl = "https://api.hubuco.com/api/v3/?api=" + APIKey + "&email=" + email + "&timeout=10";
            var myRequest = (HttpWebRequest)WebRequest.Create(requestUrl);
            WebResponse webResponse = null;
            try
            {
                webResponse = myRequest.GetResponse();
                using (var reader = new StreamReader(webResponse.GetResponseStream()))
                {
                    var jsonString = reader.ReadToEnd();
                    //EmailVerifyResp json = JsonConvert.DeserializeObject<EmailVerifyResp>(jsonString);
                    var index_resultcode = jsonString.IndexOf("resultcode\":");
                    var index_result = jsonString.IndexOf("result\":");
                    var corma = jsonString.IndexOf(",", jsonString.IndexOf(",") + 1);
                    var result_substring = jsonString.Substring(index_result, (corma - index_result));
                    var result = result_substring.Substring(result_substring.IndexOf(":") + 3, result_substring.LastIndexOf("\"") - result_substring.IndexOf(":") - 3);

                    if (result != "ok")
                    {
                        result = "This email address is invalid.";
                    }

                    return result.ToString();
                }

            }
            catch (Exception ex)
            {
                return "ok";
            }

        }


    }
}