console.log ("working")


$(function() {

    $('.selection').on("change", function() {
        // console.log ("test")

    let userInput= $("select").val()


    //Move footer back to bottom 
    if (userInput === 'sections') {
        $("footer").addClass("bottom-text")
    }

    // console.log (userInput)

        $.ajax({
            dataType: "json",
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`            
        })
        
        .done(function ({results}){
            $.each(results, function(index, value) {
                console.log (index,value)
                // console.log (value)

                //Variables
                let articleImage = value.multimedia[0].url
                let url = value.url
                let description = value.abstract

                //Max listing
                if (index === 12) return false;


                //Remove fixed footer text
                $("footer").removeClass("bottom-text")

                //Display articles
                
                $('.main-content').append(`
                <figure class="article-image">
                    <img src="${articleImage}">
                    <a href="${url}" target="new">
                    <p class="article-text">${description}<p></a>
                </figure>`);

                //Remove previous articles
                $('.selection').on("change", function() {
                    $('.main-content').empty()
                })

                //Move header to the top
                $("header").addClass("header-top")

                //Adjust tablet/desk logo size
                $(".logo").addClass("logo-size")

              

              

                //toggle
                $('.article-text').hide()

                $('.article-image').hover(function() {
                    $('.article-text').toggle()
                    console.log ("test2")
                })

                

             
                
                



             })
            })
    }) // close button function  

 
}) // close 