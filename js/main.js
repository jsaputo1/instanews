console.log ("working")


$(function() {

    $('.drop-down').on("change", function() {
        // console.log ("test")

    let userInput= $("select").val()


    // console.log (userInput)

        $.ajax({
            dataType: "json",
            method: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${userInput}.json?api-key=qZeF0WlVIE49aaMuTGpSM5bAxYeDLSyT`            
        })

        

        .done(function ({results}){
            $.each(results, function(index, value) {
                // console.log (index,value)
                // console.log (value)

                //Variables
                let articleImage = value.multimedia[0].url
                let url = value.url
                let description = value.abstract

                //Max listing
                if (index === 12) return false;

                //Display articles

                // if (condition) {
                //     //  block of code to be executed if the condition is true
                //   } else {
                //     //  block of code to be executed if the condition is false
                //   }
     
                $('.main-content').append(`
                <figure class="article-image">
                    <img src="${articleImage}">
                    <a href="${url}" target="new">
                    <p class="article-text">${description}<p></a>
                </figure>`);

                //Remove previous articles
                $('.drop-drown').on("change", function() {
                    $('.main-content').empty()
                })
             })
            })
    }) // close button function  

 
}) // close 