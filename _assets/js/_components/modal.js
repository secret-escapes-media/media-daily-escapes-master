
var modal          = $('.js-modal'),
    modalLaunchBtn = $('.js-open-modal'),
    modalCloseBtn  = $('.js-close-modal');

// opens modal
function modalOpen(event, modalId){

  // is there a click event?
  if (event) {
    event.preventDefault();
    // find the modal id from clicked element
    var activeModalId = $(event.currentTarget).data('open-modal');
  } else {
    // find the modal id from passed string
    var activeModalId = modalId;
  }

  // find the active modal dom element
  var activeModal = $('*[data-modal-id="' + activeModalId + '"]');
//console.log(activeModal);
  // disable scrolling on background content (doesn't work iOS)
  $('body').addClass('disable-scroll');

  // builds youtube video if needed
  if (activeModal.data('youtube-id')) {
    // get youtube id and target div
    var video     = activeModal.find('.js-modal-video'),
        youtubeId = activeModal.data('youtube-id');
    // insert the code into the target with the id and autoplay
    video.html('<div class="video__wrap"><iframe class="video" src="https://www.youtube.com/embed/' + youtubeId + '?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>');
  }

  // reveal the specific modal content
  activeModal.removeClass('is-closed').addClass('is-open');

  // open modal
  modal.fadeIn('250', function(){
    $(this).removeClass('is-closed').addClass('is-open');
  });
}

// closes modal
function modalClose(event){
  event.preventDefault();
  // enable scrolling
  $('body').removeClass('disable-scroll');
  // close modal with fade
  $('.modal__bg.is-open').fadeOut('250', function(){
    // close modal and active modal content
    $(this).removeClass('is-open').addClass('is-closed');
    $('.modal.is-open').removeClass('is-open').addClass('is-closed');
    // kill everything inside of video if its there
    $('.js-modal-video').empty();
  });
}


// launches modal when offer is clicked
modalLaunchBtn.on('click', function(event) {
  modalOpen(event);
});

// launches modal from url queryString
/*
var modalQueryString = 'open-modal';
if (getQueryStringByName(modalQueryString)) {
  // find modal id & dom element
  var modalId = getQueryStringByName(modalQueryString);
  var modalElement = $('*[data-modal-id="' + modalId + '"]');
  // is there is a modal to open?
  if ( $(modalElement).length > 0 ) {
    // open without passing event
    modalOpen(null, modalId);
  }
}*/

// closes modal on close icon click
modalCloseBtn.on('click', function(event) {
  modalClose(event);
});

// closes modal on background click
modal.on('click', function(event) {
  if ($(event.target).hasClass('modal__wrap')){
    modalClose(event);
  }
});

// closes modal on escape key press
$(document).keyup(function(event) {
   if (event.keyCode == 27) {
     modalClose(event);
    }
});

//Modal-Navigation

$('.js-modal-nav').on('click', function(event) {

  event.preventDefault();

  var navDirection          = $(this).data('nav-direction'),
      currentModalClass     = '.modal',
      modalCategory         = 'modal-group',
      currentModal          = $(currentModalClass + '.is-open'),
      currentModalCategory  = currentModal.data(modalCategory),
      nextModal             = currentModal.next(currentModalClass),
      nextModalCategory     = nextModal.data(modalCategory),
      previousModal         = currentModal.prev(currentModalClass),
      previousModalCategory = previousModal.data(modalCategory),
      firstModal            = $(currentModalClass + '[data-' + modalCategory + '="' + currentModalCategory + '"]:first'),
      lastModal             = $(currentModalClass + '[data-' + modalCategory + '="' + currentModalCategory + '"]:last');

  function launchNextModal(){
    // hides the current modal
    currentModal.addClass('is-closed').removeClass('is-open');
    // // reset scroll position
    // $('.modal__bg').scrollTop(0);
    if (nextModal && currentModalCategory === nextModalCategory ) {
      // shows next in category
      nextModal.addClass('is-open').removeClass('is-closed');
    } else {
      // isn't another modal in category so goes back to beginning
      firstModal.addClass('is-open').removeClass('is-closed');
    }
  }

  function launchPreviousModal(){
    // hides the current modal
    currentModal.addClass('is-closed').removeClass('is-open');
    // // reset scroll position
    // $('.modal__bg').scrollTop(0);
    if (previousModal && currentModalCategory === previousModalCategory ) {
      // shows next in category
      previousModal.addClass('is-open').removeClass('is-closed');
    } else {
      // isn't another modal in category so goes back to beginning
      lastModal.addClass('is-open').removeClass('is-closed');
    }
  }

  // checks which button has been clicked and runs function
  switch (navDirection) {
    case 'next':
      launchNextModal();
      break;
    case 'previous':
      launchPreviousModal();
      break;
  }

});
