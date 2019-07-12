using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace NPT_DC_App.Controllers
{
    public class Controller_TextEncryption
    {
        private const string cryptoKey = "mycyphertext";
        // The Initialization Vector for the DES encryption routine
        private static readonly byte[] IV = new byte[8] { 240, 3, 45, 29, 0, 76, 173, 59 };

        //Encryption string

        public static string Encrypt(string s, string key)
        {

            if (key == "") key = cryptoKey;
            if (s == null || s.Length == 0) return string.Empty;

            string result = string.Empty;
            try
            {
                // byte[] buffer = Encoding.ASCII.GetBytes(s);
                byte[] buffer = Encoding.Unicode.GetBytes(s);

                TripleDESCryptoServiceProvider des = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider MD5 = new MD5CryptoServiceProvider();
                // des.Key = MD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(key));
                des.Key = MD5.ComputeHash(Encoding.Unicode.GetBytes(cryptoKey));
                des.IV = IV;
                result = Convert.ToBase64String(des.CreateEncryptor().TransformFinalBlock(buffer, 0, buffer.Length));
            }
            catch
            {
                throw;
            }

            return result;
        }

        // Decryption string

        public static string Decrypt(string s, string key)
        {
            if (key == "") key = cryptoKey;
            if (s == null || s.Length == 0) return string.Empty;

            string result = string.Empty;

            try
            {
                byte[] buffer = Convert.FromBase64String(s);

                TripleDESCryptoServiceProvider des = new TripleDESCryptoServiceProvider();
                MD5CryptoServiceProvider MD5 = new MD5CryptoServiceProvider();
                //  des.Key = MD5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(key));
                des.Key = MD5.ComputeHash(Encoding.Unicode.GetBytes(key));
                des.IV = IV;
                //  result = Encoding.ASCII.GetString(des.CreateDecryptor().TransformFinalBlock(buffer, 0, buffer.Length));
                result = Encoding.Unicode.GetString(des.CreateDecryptor().TransformFinalBlock(buffer, 0, buffer.Length));
            }
            catch
            {
                throw;
            }

            return result;
        }
    }
}