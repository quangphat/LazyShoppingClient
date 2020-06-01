using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LazyShoppingClient.Infrastructures;
using LazyShoppingClient.Models;
using my8ShareObject;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace LazyShoppingClient.Controllers
{
    [Route("account")]
    public class AccountController : BaseController
    {
        public AccountController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
            : base(httpClient, clientConfig, currentProcess)
        {
        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [Route("login")]
        public async Task<ResponseJsonModel<Account>> Login([FromBody]AccountLogin model)
        {
            var result = await LoginUser(model);
            Account account = null;
            if (result.data == null || result.error != null)
                return result;
            if (result.data != null)
                account = result.data;
            if (!isValidAccount(account)) return result;

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("PersonId", account.PersonId));
            claims.Add(new Claim("Email", account.Email));
            claims.Add(new Claim("ProjectId", account.ProjectId.ToString()));
            if (!string.IsNullOrWhiteSpace(account.DisplayName))
                claims.Add(new Claim("DisplayName", account.DisplayName));
            if (!string.IsNullOrWhiteSpace(account.Headline))
                claims.Add(new Claim("WorkAs", account.Headline));
            if (!string.IsNullOrWhiteSpace(account.Role))
                claims.Add(new Claim("Role", account.Role));
            if (!string.IsNullOrWhiteSpace(account.Avatar))
                claims.Add(new Claim("Avatar", account.Avatar));
            if (!string.IsNullOrWhiteSpace(account.ProfileName))
                claims.Add(new Claim("ProfileName", account.ProfileName));
            if (string.IsNullOrWhiteSpace(account.Token) || string.IsNullOrWhiteSpace(account.RefreshToken))
                return null;
            claims.Add(new Claim("access_token", account.Token));
            claims.Add(new Claim("refresh_token", account.RefreshToken));
            if (account.Scopes != null && account.Scopes.Any())
            {
                claims.Add(new Claim("Scopes", String.Join(",", account.Scopes)));
            }
            var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true
            };
            await HttpContext.SignInAsync(principal, authProperties);
            return result;
        }
        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody]AccountSignup model)
        {
            return await PostAsync($"/{ApiRouteRsx.Account}/signup", null, model);
        }
        private bool isValidAccount(Account account)
        {
            if (account == null
                || string.IsNullOrWhiteSpace(account.PersonId)
                || string.IsNullOrWhiteSpace(account.Email)
                || string.IsNullOrWhiteSpace(account.ProjectId))
                return false;
            return true;
        }
        [HttpPost]
        [Route("selecttag/{personId}")]
        public async Task<IActionResult> SelectTags([FromBody] StringModel model, string personId)
        {
            return await PostAsync($"/{ApiRouteRsx.Account}/selecttag/{personId}", null, model);
        }
        [HttpPost]
        [Route("security")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePassword model)
        {
            return await PostAsync($"/{ApiRouteRsx.Account}/security", null, model);
        }
        private async Task<ResponseJsonModel<Account>> LoginUser(AccountLogin model)
        {
            if (model == null)
            {
                return null;
            }
            if (string.IsNullOrWhiteSpace(model.Password) || string.IsNullOrWhiteSpace(model.Email))
            {
                return null;
            }
            //model.Password = Utils.GetSHA256Hash(model.Password);
            var result = await LoginPostAsync("/accounts/login", null, model);
            if (result.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return result.Data;
            }
            return null;
        }
    }
}