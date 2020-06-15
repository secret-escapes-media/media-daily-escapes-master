// general js for the project that wouldn't be a reuseable component


////////////////////////////////////////////////////////////////////////////////
//      Sticky microsite nav
////////////////////////////////////////////////////////////////////////////////

// elements and classes
var stickyNavClass     = '.js-sticky-nav';
var stickyNavContainer = '.hero';
var stickyNavModifier  = 'is-stuck';


function stickyNav(){

  var scrollTop = $(document).scrollTop();
  var nav       = $(stickyNavClass);
  var navHeight = nav.outerHeight();
  var distance  = $(stickyNavContainer).outerHeight() - navHeight;

  if( scrollTop > distance ){
    nav.addClass(stickyNavModifier);
  }else{
    nav.removeClass(stickyNavModifier);
  }
}

// runs on page load and scroll
stickyNav();
$(document).scroll(function(){ stickyNav(); });



////////////////////////////////////////////////////////////////////////////////
//    Current section nav highlight
////////////////////////////////////////////////////////////////////////////////

$('.js-nav-section').waypoint(function(direction) {

  // classes
  var navClass       = 'site-nav__link';
  var activeNavClass = 'is-current';

  // swaps the active class between nav elements
  function swapClasses(sectionId) {
    $('.' + navClass + '.' + activeNavClass).removeClass(activeNavClass);
    $('.' + navClass + '--' + sectionId).addClass(activeNavClass);
  }

  if (direction === 'up') {
    // highlight previous region
    var previousSectionId = $('#' + this.element.id).prev().attr('id');
    swapClasses(previousSectionId);
  } else if (direction === 'down') {
    // highlight current section
    var currentSectionId = this.element.id;
    swapClasses(currentSectionId);
  }

})



////////////////////////////////////////////////////////////////////////////////
//    Accordion
////////////////////////////////////////////////////////////////////////////////

  var j;
  var i;
  var coll = document.getElementsByClassName("bv-collapsible");
  var cssWidthHL = window.innerWidth;

	var itemNumber = document.getElementsByClassName("site-nav__bv-item");
  var itemLinks = document.getElementsByClassName("site-nav__bv-link");
	var itemNavTabs = itemNumber.length;

// find height of all items and add them

  var itemSingle =itemNumber[0].offsetHeight;
	var itemsAll = itemNavTabs * itemSingle;




for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("bv-active");
    var content = this.nextElementSibling;
    //alert(content);
    if (content.style.height){
      content.style.height = null;

    } else if (window.innerWidth <= 650){
      content.style.height = itemsAll+'px';
    }
  });
}


  var itemTest = itemNumber[0].addClass("site-nav__bv-item");

for (j = 0; j < itemLinks.length; j++) {
  console.log(itemLinks[j]);
  //itemLinks[0].addClass("site-nav__bv-link");
  itemLinks[1].innerHTML = "#00ff00";
}


/*********** Blur and change colour of hero images  *************/


$(window).on('scroll', function () {

//console.log('hey');
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    var pixs = $(document).scrollTop(),
    pixs = pixs / 100,
    offset = 600,
    range = 100,
    calc = 0.8 - (pixs )/17;

	if(isFirefox === false){

		$(".bv-banner-out").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)","opacity": calc });

  }  else  { $(".bv-banner-out").css({"opacity": calc });}
});
