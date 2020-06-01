using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LazyShoppingClient.Infrastructures;

namespace LazyShoppingClient.Controllers
{
    [Route("JobFunctions")]
    public class JobFunctionController : BaseController
    {
        public JobFunctionController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
            : base(httpClient, clientConfig, currentProcess)
        {

        }
        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> Search(string freeText, int page, int limit)
        {
            return await GetAsync($"/{ApiRouteRsx.JobFunction}/search", new { freeText, page, limit });
        }
    }
}