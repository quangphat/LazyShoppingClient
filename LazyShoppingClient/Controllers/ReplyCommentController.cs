using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LazyShoppingClient.Infrastructures;
using LazyShoppingClient.Models;

namespace LazyShoppingClient.Controllers
{
    [Route("reply")]
    public class ReplyCommentController : BaseController
    {
        public ReplyCommentController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
           : base(httpClient, clientConfig, currentProcess)
        {

        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ReplyComment model)
        {
            return await PostAsync($"/{ApiRouteRsx.ReplyComment}", null, model);
        }
        [HttpGet]
        [Route("{commentId}/{page}/{limit}")]
        public async Task<IActionResult> GetByFeedId(string commentId, int page, int limit)
        {
            return await GetAsync($"/{ApiRouteRsx.ReplyComment}/{commentId}/{page}/{limit}");
        }
    }
}