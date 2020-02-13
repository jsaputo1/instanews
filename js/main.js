console.log("working");

$(function() {
  $(".selection").on("change", function() {
    // console.log ("test")

    let userInput = $("select").val();

    //Change cursor to waiting
    $("body").addClass("cursor");
    $(".main-content").addClass("cursor");

    //Add loader image
    $("header").append(`<img src="./images/loader.gif" / class="loader">`);

    //Move footer back to bottom if the user chooses sections and hide loader gif
    if (userInput === "sections") {
      $("footer").addClass("bottom-text");
      $(".loader").hide();
      $("body").removeClass("cursor");
      $("main-content").removeClass("cursor");
    }

    // console.log (userInput)

    //API
    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`
    }).done(function({ results }) {
      $.each(results, function(index, value) {
        // console.log(index, value);
        // console.log(value);

        //Variables
        let articleImage = value.multimedia[0].url;
        let url = value.url;
        let description = value.abstract;

        //Max listing
        if (index === 12) return false;

        //Remove fixed footer text
        $("footer").removeClass("bottom-text");

        //Change back to default cursor
        $("body").removeClass("cursor");
        $(".main-content").removeClass("cursor");

        //Display articles
        $(".main-content").append(`
                <figure class="article-image">
                    <img src="${articleImage}">
                    <a href="${url}" target="new"><p class="article-text">${description}</p></a>
                </figure>`);
        //Backup text if the description is blank
        if (description === "") {
          $(".article-text").append(`${value.title}`);
          if (value.title === "") {
            $(".article-text").append("Click Here to view the article");
          }
        }
      }); //close for each loop

      //Hide Loader
      $(".loader").hide();

      //Remove previous articles when changing sections
      $(".selection").on("change", function() {
        $(".main-content").empty();
        $("footer").addClass("bottom-text");
      });

      //Move header to the top
      $("header").addClass("header-top");

      //Shrink header in tablet and desktop mode
      $(".logo").addClass("logo-size");

      //Animation to show/hide text on article images
      $(".article-text").hide();

      //   slide toggle
      $(".article-image").mouseenter(function() {
        $(this)
          .find("p")
          .slideToggle(500);
        console.log("test5");
      });

      $(".article-image").mouseleave(function() {
        $(this)
          .find("p")
          .slideToggle(1000);
        console.log("test6");
      });

      
    }); // close done function
  }); // close on change function
}); // close opening function
