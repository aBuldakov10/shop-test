(function () {
  /** Variables **/
  const $mobBurgerMenu = $('.mob-burger-menu'),
        $navigation = $('.navigation'),
        $catalogGoodsBtn = $('.catalog-btn'),
        $catalogGoodslist = $('.catalog-lst'),
        $phonesListTitle = $('.phone-list-title'),
        $addressListTitle = $('.address-list-title'),
        $bestGoodsWrapper = $('.best-goods-wrapper');
  
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

  /** Slick plugin for main banner**/
  $(document).ready(function() {
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

  /** Render best goods from JSON **/
  $.getJSON('catalog.json', function (data) {
    var renderGoodItem = '',
        deliveryValue = '',
        productTipClass = '';

    $(data).each(function (index, item) {
      (item.productTip === 'новый') ? productTipClass = 'is-new' : productTipClass = 'is-stock';

      (item.isDelivery === true) ? deliveryValue = 'Есть доставка' : deliveryValue = 'Без доставки';

      renderGoodItem += '<div class="good-item">';
      renderGoodItem += '<div class="product-tip ' + productTipClass + '">' + item.productTip + '</div>';
      renderGoodItem += '<img src="' + item.image + '" title="' + item.title + '">';
      renderGoodItem += '<p class="good-item-title">' + item.productTitle + '</p>';
      renderGoodItem += '<div class="good-item-subtitle">';
      renderGoodItem += '<div class="delivery-info">';
      renderGoodItem += '<p class="delivery-title">' + deliveryValue + '</p>';
      renderGoodItem += '<p class="amount">В наличии ' + item.amount + ' шт.</p>';
      renderGoodItem += '</div>';
      renderGoodItem += '<div class="price-info">';
      renderGoodItem += '<p class="price-title">Цена за шт.</p>';
      renderGoodItem += '<p class="price">' + item.price + '</p>';
      renderGoodItem += '</div>';
      renderGoodItem += '</div>';
      renderGoodItem += '<button>купить</button>';
      renderGoodItem += '<a href="/">Заказать в <span>1</span> клик</a>';
      renderGoodItem += '</div>';

    });

    $bestGoodsWrapper.append(renderGoodItem);

    // Slick plugin for best goods
    $(document).ready(function() {
      $('.best-goods-wrapper').slick(
        {
          autoplay: false,
          dots: false,
          arrows: true,
          speed: 500,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 1224,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 30000,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            }
          ],
          autoplaySpeed: 4000
        }
      );
    });
  });

})(jQuery);
