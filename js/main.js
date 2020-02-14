$(function() {
  //Disables fixed footer positioning if the window height is smaller than the main logo
  if ($(window).height() < 400) {
    $("footer").removeClass("bottom-text");
  }

  $(".selection").on("change", function() {
    let userInput = $("select").val();

    $("body").addClass("cursor"); //Changes cursor to waiting
    $(".main-content").addClass("cursor");

    $("header").append(`<img src="./images/loader.gif" / class="loader">`); //Loader image

    if (userInput === "sections") {
      $("footer").addClass("bottom-text");
      $(".loader").hide();
      $("body").removeClass("cursor");
      $("main-content").removeClass("cursor");
    } //Moves footer back to bottom and changes the cursor back to default if the user chooses Sections

    //API
    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`
    }).done(function({ results }) {
      $.each(results, function(index, value) {
        if (index === 12) return false; //Max listing

        $("footer").removeClass("bottom-text"); //Remove fixed footer text

        $("body").removeClass("cursor");
        $(".main-content").removeClass("cursor");
        //Changes back to default cursor

        //Display articles
        let articleImage = value.multimedia[0].url;
        let url = value.url;
        let description = value.abstract;

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

      $(".loader").hide(); // Hides loader gif
      $("header").addClass("header-top"); //Moves header to the top
      $(".logo").addClass("logo-size"); //Shrinks header in tablet and desktop mode

      $(".selection").on("change", function() {
        $(".main-content").empty();
        $("footer").addClass("bottom-text");
      }); //Removes previous articles

      // Article text box animations
      $(".article-text").hide(); //Hides article text/link by default

      $(".article-image").mouseenter(function() {
        $(this)
          .find("p")
          .slideToggle(500);
      });

      $(".article-image").mouseleave(function() {
        $(this)
          .find("p")
          .slideToggle(1000);
      });
    }); // close done function
  }); // close on change function
}); // close opening function
