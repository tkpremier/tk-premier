// @using PublicWebMvC.Helpers;
// @using WebApplication.Extensions;
// @using WebApplication.ViewModel;
// @using WebApplication.StaticSchema;
// @using PhillipsPublic.Domain.ViewModel;
// @model List<AuctionWebsiteView<LotSummaryView>>
//   @{
//     ViewBag.Title = "PHILLIPS : Buy Catalogues";


//     string _store_form = ViewBag.StoreForm;

//   }
//   @section pageBody
// {

    import React, {Component , createContext} from 'react';

    class BuyCataloguePage extends Component {
        constructor (props){
            super(props)
            this.state = {}
        }

        render(){
            return(
                <div>Hello BUY PAGE</div>
//     <div class="main-container">
//       <div class="container content-area has-left-aside" id="buy-catalogues-page">
//         <div class="row">
//           <aside class="left col-xs-12 col-md-3" id="primaryAside">
//             <h2 class="page-title col-xs-12 hidden-md">Catalogues</h2>
//             <section class="needs-js row">
//               <ul id="filter-backbone" class="filter short-list col-xs-6 col-md-12">
//                 <li class="header expandable closed">
//                   <a href="#" class="toggle">Filter</a>
//                   <a class="clearall" href="#">(clear all)</a>
//                   <ul class="filter-list hide">
//                     <li class="expandable closed">
//                       <a href="#" class="toggle category" data-dimension="Year">Year</a>
//                       <ul class="panel hide">
//                         <li class="loading"></li>
//                       </ul>
//                     </li>
//                     <li class="expandable closed">
//                       <a href="#" class="toggle category" data-dimension="Department">Department</a>
//                       <ul class="panel hide">
//                         <li class="loading"></li>
//                       </ul>
//                     </li>
//                     <li class="expandable closed">
//                       <a href="#" class="toggle category" data-dimension="Location">Location</a>
//                       <ul class="panel hide">
//                         <li class="loading"></li>
//                       </ul>
//                     </li>
//                   </ul>
//                 </li>
//               </ul>
//               <div id="sort-backbone-xs" class="col-xs-6 hidden-md text-right sort-backbone">Sort by: <select><option value="newest">Newest</option><option value="oldest">Oldest</option></select></div>
//             </section>
//             <section class="row">
//               <ul class="short-list col-xs-12">
//                 <li class="contact expandable info closed">
//                   <a href="#" class="toggle">CONTACT</a>
//                   <div class="panel hide">
//                     <p>Catalogues</p>
//                     <p><a href="mailto:catalogues@phillips.com">catalogues@phillips.com</a></p>
//                     <p>New York +1 212 940 1200</p>
//                     <p>London +44 20 7318 4010</p>
//                   </div>
//                 </li>
//               </ul>
//             </section>
//             <section class="row">
//               <a href="@ViewBag.StoreForm" target="_blank" class="button large cart col-xs-12" id="my-cart-modal">My Cart <i class="cart"></i></a>
//             </section>
//             <section class="back-to-top-section">
//               <a href="#" class="back-to-top" style="display: none;">Back to top</a>
//             </section>
//           </aside>
//           <div class="content-body col-xs-12 col-md-9">
//             <header class="page-header row space-btwn">
//               <nav class="sort-nav">
//                 <h2 class="page-title visible-md col-md-4">Catalogues</h2>
//                 <div id="info-backbone" class="col-xs-12 col-md-4 info">Showing <span class="start">@(ViewBag.CatalogPage + 1)</span>-<span class="end">@(ViewBag.CatalogPage + ViewBag.Catalogs)</span> of <span class="total">@Model.Count()</span> results</div>
//                 <div id="sort-backbone-md" class="col-xs-12 visible-md col-md-4 needs-js sort-backbone">Sort by: <select><option value="newest">Newest</option><option value="oldest">Oldest</option></select></div>
//               </nav>
//             </header>

//             <ul class="standard-list bordered row" id="main-list-backbone" data-tpl="buy">

//               @{int i = 0;}
//               @foreach (var item in Model)
//               {
//                 var cataloguePurchaseLink = _store_form + "+" + (item.CatalogueCode == null ? item.SaleNumber : item.CatalogueCode);

//                 var imageLink = !string.IsNullOrWhiteSpace(item.CatalogueCoverImage) && item.CatalogueCoverImage.ToUpper().Contains("ASSETS.PHILLIPS.COM") ?
//                   item.CatalogueCoverImage :
//                   CdnResolver.Instance.ResolveCatalogImagePath(item.CatalogueCoverImage.Substring(0, 35), item.CatalogueCoverImage.Substring(36, item.CatalogueCoverImage.Length - 36), item.SaleNumber, PhillipsImageTypes.AuctionCatalogBuy);

//                 if (i == @ViewBag.CatalogPage + @ViewBag.Catalogs)
//                 {
//                   break;
//                 }
//                 else if (i >= @ViewBag.CatalogPage)
//                 {
//                   <li class="has-image catalogue row pending" id="itemid@(item.AuctionPublicID)">
//                     <div class="image-container col-xs-12 col-sm-3">
//                       <a href="@Url.Action("auction/"+@item.SaleNumber, "auctions")" class="image-link" data-image="@imageLink"></a>
//                     </div>
//                     <div class="content-body col-xs-12 col-sm-9">
//                       <h2>@item.AuctionTitle</h2>
//                       @if (item.SaleTypeID == 1)
//                       {
//                         <h3>@Html.Raw(Html.StripHtml(@item.AuctionDetailsSmall))</h3>
//                       }
//                       @if (!string.IsNullOrEmpty(item.CatalogueSetText))
//                       {
//                         <div class="grey-box">
//                           @item.CatalogueSetText
//                         </div>
//                       }
//                       @if (item.CataloguePrice > 0 && item.ShowBuyButton)
//                       {
//                         <div class="grey-box">
//                           $ @item.CataloguePrice
//                           <a href="@(cataloguePurchaseLink)" target="_blank" class="button open-modal">Add to Cart</a>
//                         </div>
//                       }
//                       <p>
//                         @if (item.EnableOnlineCatalogue == true)
//                         {
//                           if (item.SaleTypeID == 1)
//                           {
//                             @Html.ActionLink("Browse sale", "auction/" + @item.SaleNumber, "auctions")
//                           }
//                         }
//                         else
//                         {
//                           if (item.SaleTypeID == 1)
//                           {
//                             @Html.ActionLink("Auction info", "auction/" + @item.SaleNumber, "auctions")
//                           }
//                           else
//                           {
//                             @Html.ActionLink("Exhibition info", "exhibition/" + @item.SaleNumber, "auctions")
//                           }
//                         }
//                       </p>
//                     </div>
//                   </li>
//                 }
//                 i++;
//               }

//             </ul>
//             <footer class="page-footer row"><ul class="pagination-backbone col-xs-12 col-sm-4 col-sm-push-4"></ul></footer>
//           </div>
//         </div>
//       </div>
//     </div>
//   }


//   @section json {
//     <script type="text/javascript">
//         @Html.Raw(ViewBag.JSON)
//     </script>
//   }

//   @section js
// {
//     <script type="text/javascript">
//       $(function () {
//         var catalogues = new phillips.ArchiveListView({
//           "itemsPerPage": 10,
//           "childTpl": $("#main-list-backbone").data('tpl'),
//           'hasShare': false
//         });

//         var catalogueRoutes = new phillips.Router({ view: catalogues });
//         catalogues.router = catalogueRoutes;
//         Backbone.history.start({ pushState: true, root: "/catalogues/buy/" });
//         var mql = window.matchMedia("(max-width: 768px)");
//         var isMobile = mql.matches;
//         function triggerEvent(mql) {
//           phillips.Events.trigger('isMobileTest', isMobile);
//         }
//         handleMql("max-width: 768px", triggerEvent);
//         $("#my-cart-modal").click(function (e) {
//           if (!isMobile) {
//             e.preventDefault();
//             var destination = $(e.currentTarget).attr("href");
//             var newModal = new phillips.ModalView({
//               "iframe": true,
//               "destination": destination,
//               "isMobile": isMobile
//             });
//           } else {
//             return true;
//           }
//         });
//       });
//     </script>
//     <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51279d260578a43a" defer></script>


            )
        }
    }

  
