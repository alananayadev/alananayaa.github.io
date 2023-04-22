// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  document.querySelector("#copyright").textContent = `\u00A9 ${moment().format("YYYY")} - Alan Anaya Araujo`
  AOS.init( {

  }); // initialize animate on scroll library

  let age = new Date().getFullYear() - 1995
  document.querySelector("#experience").innerHTML = age - 21
  document.querySelector("#age").innerHTML = age
  document.querySelector("#submitButton").addEventListener("click", event => {
    event.preventDefault()
    let data = new FormData()
    data.append("name", document.querySelector("input[name='name']").value)
    data.append("subject", document.querySelector("input[name='subject']").value)
    data.append("email", document.querySelector("input[name='email']").value)
    data.append("message", document.querySelector("textarea[name='message']").value)
    fetch("https://alananayadev.com/scripts/sendEmail.php", {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(result => {
      document.querySelector("#modalMessage").innerHTML = result.message
      $('#mailModal').modal()
    })
  })
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
