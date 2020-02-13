console.log("working");

$(function() {
  $(".selection").on("change", function() {
    // console.log ("test")

    let userInput = $("select").val();

    if (userInput === "sections") {
        $("header").removeClass("header-top");
        $("header").addClass("header-top");
      
      }

      
    //Move footer back to bottom
    if (userInput === "sections") {
      $("footer").addClass("bottom-text");
    }

    // console.log (userInput)

    $.ajax({
      dataType: "json",
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`
    })
    .done(function({ results }) {
      $.each(results, function(index, value) {
        // console.log(index, value);
        // console.log (value)

        //Variables
        let articleImage = value.multimedia[0].url;
        let url = value.url;
        let description = value.abstract;


        

        //Max listing
        if (index === 12) return false;

        //Remove fixed footer text
        $("footer").removeClass("bottom-text");

        //Display articles

        $(".main-content").append(`
                <figure class="article-image">
                    <img src="${articleImage}">
                    <a href="${url}" target="new">
                    <p class="article-text">${description}<p></a>
                </figure>`)

                if (description === "") {
                    $(".article-text").append(`${value.title}`)
                   }

        //Remove previous articles
        $(".selection").on("change", function() {
          $(".main-content").empty();
          $("footer").addClass("bottom-text")
        });

        //Move header to the top
        $("header").addClass("header-top");

        //Adjust tablet/desk logo size
        $(".logo").addClass("logo-size");

        //toggle

        $(".article-text").hide();

        // $("p").hide();

        // $(".article-image").on("click",function(){
        //     $(this).siblings().children("p").toggle()
        //     console.log("test5")
        // })

        //slide toggle
        // $(".article-image").mouseenter(function(){
        //     $(this).find('p').stop(true, true).slideToggle()
        //     console.log("test6")
        // });

        $(".article-image").mouseenter(function(){
            $(this).find('p').show()
            console.log("test6")
        });

        $(".article-image").mouseleave(function(){
            $(this).find('p').fadeOut()
            console.log("test7")
        });

   

  
      });
    });
  }); // close button function
}); // close
