(function () {
  /** Variables **/
  const $mobBurgerMenu = $('.mob-burger-menu'),
        $navigation = $('.navigation'),
        $catalogGoodsBtn = $('.catalog-btn'),
        $catalogGoodslist = $('.catalog-lst'),
        $phonesListTitle = $('.phone-list-title'),
        $addressListTitle = $('.address-list-title');
  
  /** Open mobile navigation **/
  $mobBurgerMenu.on('click', function () {
    $('body').toggleClass('no-scroll');
    $(this).toggleClass('close-burger');
    $navigation.toggleClass('open');
  });

  /** Open catalog goods **/
  $catalogGoodsBtn.on('click', function () {
    $(this).toggleClass('close-burger');
    $catalogGoodslist.toggleClass('open');
  });

  /** Open phone list **/
  $phonesListTitle.on('click', function () {
    $('.info-list', $phonesListTitle).toggleClass('open');
  });

  /** Open address list **/
  $addressListTitle.on('click', function () {
    $('.info-list', $addressListTitle).toggleClass('open');
  });

  /** Slick plugin **/
  $(document).ready(function(){
    $('.slider-wrap').slick(
      {
        autoplay: true,
        dots: false,
        arrows: true,
        speed: 500,
        autoplaySpeed: 4000
      }
    );
  });

})(jQuery);
