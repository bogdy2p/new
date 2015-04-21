// oldpageUrl = "/dash";
// $.app = $.app || {};
// $.app.loadContent = function () {
//     $('#main-content').animate({"opacity":".1", "zoom":".99"},300);
//     $('.loading_ico').animate({"opacity":"1"},300);
   
//         $.ajax({
//             url: pageUrl + '?type=ajax',
//             success: function (data) {
//                 $('.loading_ico').animate({"opacity":"0"},300);
//                 $('#main-content').animate({"opacity":"1", "zoom":"1"},400);
//                 $('#main-content').html(data);
//             }
//         });
//         if (pageUrl != window.location) {
//             window.history.pushState({ path: pageUrl }, '', pageUrl);
//             console.log(window.location);
//         }
//         console.log("different");
    
//     oldpageUrl = pageUrl;
//     console.log(pageUrl);
//     console.log(oldpageUrl);
// }
// $.app.backForwardButtons = function () {
//     $(window).on('popstate', function () {
//         $('.container').animate({"opacity":".1"},300);
//         $('.loading_ico').animate({"opacity":"1"},300);
//         $.ajax({
//             url: location.pathname + '?type=ajax',
//             success: function (data) {
//                 $('.loading_ico').animate({"opacity":"0"},300);
//                 $('.container').animate({"opacity":"1"},300);
//                 $('#main-content').html(data);
//             }
//         });
//     });
// }

// $.app.backForwardButtons();