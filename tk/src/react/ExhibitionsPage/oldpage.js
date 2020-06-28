@model List<AuctionWebsiteView<LotSummaryView>>
@{
  ViewBag.Title = "PHILLIPS : Exhibitions";

}
@section head{
  <link rel="canonical" href="@Request.Url.AbsoluteUri" />
}


<div class="main-container">
      <div class="container content-area has-left-aside" id="exhibitions-page">
        <div class="row">
          <aside class="left col-xs-12 col-md-3" id="primaryAside">
            <h2 class="page-title col-xs-12 hidden-md">Exhibitions</h2>
            <section class="needs-js row">
              <ul id="filter-backbone" class="filter short-list col-xs-6 col-md-12">
                <li class="header expandable closed">
                  <a href="#" class="toggle">Filter</a>
                  <a class="clearall" href="#">(clear all)</a>
                  <ul class="filter-list hide">
                    <li class="expandable closed">
                      <a href="#" class="toggle category" data-dimension="Year">Year</a>
                      <ul class="panel hide">
                        <li class="loading"></li>
                      </ul>
                    </li>
                    <li class="expandable closed">
                      <a href="#" class="toggle category" data-dimension="Department">Department</a>
                      <ul class="panel hide">
                        <li class="loading"></li>
                      </ul>
                    </li>
                    <li class="expandable closed">
                      <a href="#" class="toggle category" data-dimension="Location">Location</a>
                      <ul class="panel hide">
                        <li class="loading"></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
              <div id="sort-backbone-xs" class="col-xs-6 hidden-md text-right sort-backbone">Sort by: <select><option value="newest">Newest</option><option value="oldest">Oldest</option></select></div>
            </section>
            <section class="back-to-top-section">
              <a href="#" class="back-to-top" style="display: none;">Back to top</a>
            </section>
          </aside>
          <div class="content-body col-xs-12 col-md-9">
            <header class="page-header row space-btwn">
              <nav class="sort-nav">
                <h2 class="page-title visible-md col-md-4">Exhibitions</h2>
                <div id="info-backbone" class="col-xs-12 col-md-4 info">Showing <span class="start">@(ViewBag.ExhibitionPage + 1)</span>-<span class="end">@(ViewBag.ExhibitionPage + ViewBag.Exhibitions)</span> of <span class="total">@Model.Count()</span> results</div>
                <div id="sort-backbone-md" class="needs-js col-xs-12 visible-md col-md-4 sort-backbone">Sort by: <select><option value="newest">Newest</option><option value="oldest">Oldest</option></select></div>
              </nav>
            </header>
            <ul class="standard-list bordered" id="main-list-backbone" data-tpl="exhibitions">

              @{int i = 0;}
              @foreach (var auction in Model)
              {
                if (i == @ViewBag.ExhibitionPage + @ViewBag.Exhibitions)
                {
                  break;
                }
                else if (i >= @ViewBag.ExhibitionPage)
                {
                  var bannerImg = auction.SaleNumber + ".jpg";
                  var itemYear = Int32.Parse(auction.EventDate.Value.ToString("yyyy"));
                  <li class="has-image auction" id="itemid@(auction.AuctionPublicID)">
                    <div class="image-container col-xs-12 col-sm-5">
                      <a href="@Html.BuildAuctionUrl(auction.SaleNumber, null, 2)">
                        @if (itemYear > 2014)
                        {
                          <img src="@CdnResolver.Instance.ResolveHighlightImagePath(ViewBag.ImageFolder, bannerImg, auction.SaleNumber, PhillipsImageTypes.AuctionPastBannerGallery, auction.UseCloudinary, auction.CloudinaryBannerVersion)" class="thumb" alt="@auction.AuctionTitle" title="@auction.AuctionTitle" />
                        }
                        else
                        {
                          <img src="@CdnResolver.Instance.ResolveHighlightImagePath(ViewBag.ImageFolder, Path.GetFileName(auction.Highlights[0].Image), auction.SaleNumber, PhillipsImageTypes.AuctionPastGallery, auction.UseCloudinary, auction.CloudinaryBannerVersion)" class="thumb" alt="@auction.AuctionTitle" title="@auction.AuctionTitle" />
                        }
                      </a>
                    </div>
                    <div class="content-body col-xs-12 col-sm-7">
                      <h2><a href="@Html.BuildAuctionUrl(auction.SaleNumber, null, 2)">@auction.AuctionTitle</a></h2>
                      <h3><a href="@Html.BuildAuctionUrl(auction.SaleNumber, null,2)">@Html.Raw(Html.StripHtml(auction.AuctionDetailsSmall))</a></h3>

                      <ul class="short-list">

                        @Html.Partial(
              "partial/sharetools",
              new NavigationLink()
              {
                  Url = Html.BuildAuctionUrl(auction.SaleNumber, null, 2),
                  Title = "expandable-menu-share",
                  IncludePinterest = true,
                  LegacyStyles = false
              })
                      </ul>
                    </div>
                  </li>
                }
                i++;
              }
            </ul>
            <footer class="page-footer row"><ul class="pagination-backbone col-xs-12 col-sm-4 col-sm-push-4"></ul></footer>
          </div>
        </div>
      </div>
    </div>
  }
  @section json {
    <script type="text/javascript">
        @{
            var items = new List<dynamic>();
            foreach(var auction in Model)
            {
              var plink = Html.BuildAuctionUrl(auction.SaleNumber, null, 2);
              var bannerImg = auction.SaleNumber + ".jpg";
              var itemyear = auction.EventDate.Value.ToString("yyyy");
              var desc = Html.StripHtml(auction.AuctionDetailsSmall);
              var imagePath = string.Empty;
              if (Int32.Parse(itemyear) > 2014)
              {
                imagePath = CdnResolver.Instance.ResolveHighlightImagePath(ViewBag.ImageFolder, bannerImg, auction.SaleNumber, PhillipsImageTypes.AuctionPastBannerGallery, auction.UseCloudinary, auction.CloudinaryBannerVersion);
              }
              else
              {
                imagePath = CdnResolver.Instance.ResolveHighlightImagePath(ViewBag.ImageFolder, Path.GetFileName(auction.Highlights[0].Image), auction.SaleNumber, PhillipsImageTypes.AuctionPastGallery, auction.UseCloudinary, auction.CloudinaryBannerVersion);
              }

              string protocol = Request.IsSecureConnection ? "https" : "http";
              string addThisUrlAttribute = string.IsNullOrEmpty(plink) ? string.Empty : string.Format("{0}://{1}{2}", protocol, Request.Url.Host, plink);
              var sortDate = auction.EventDate.Value.ToString("yyyyMMdd");

              items.Add(new
              {
                Id = auction.AuctionPublicID,
                Date = sortDate,
                Title = auction.AuctionTitle,
                Description = desc,
                Department = auction.Departments.Select(d => d.DepartmentName),
                Location = auction.LocationName,
                Permalink = plink,
                Year = itemyear,
                Image = imagePath,
                addThis = addThisUrlAttribute
              });
            }
            string json = Json.Encode(items);

        }
            var modelData = @Html.Raw(json);

    </script>

}
@section js
  {
  @Html.JavascriptFile("/js/dist/phillips.web.backbone.js")
  <script type="text/javascript">
    $(function () {

      var exhibitions = new phillips.ArchiveListView({
        "itemsPerPage": 10,
        "childTpl": $("#main-list-backbone").data('tpl'),
        "hasShare": true,
        "pintrest": true
      });

      var exhibitionRoutes = new phillips.Router({ view: exhibitions });
      exhibitions.router = exhibitionRoutes;
      Backbone.history.start({ pushState: true, root: "/auctions/exhibitions/" });
    });
  </script>
  <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51279d260578a43a" defer></script>
}
