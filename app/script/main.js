(function () {
  /** Variables **/
  const $mobBurgerMenu = $('.mob-burger-menu'),
        $headerCart = $('header .cart'),
        $popupCartWrap = $('.popup-cart-wrap'),
        $cartPopupClose = $('.cart-popup button'),
        $countCartItems = $('header .cart span'),
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

      renderGoodItem += '<div class="good-item" data-product-id="' + item.productId + '">';
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

  /** Cart popup**/
  // Open cart popup
  $headerCart.on('click', function () {
    $('body').addClass('no-scroll');
    $popupCartWrap.addClass('open');

    //Empty variable for render
    var cartRender = '';

    // Render form array after chosen products
    cartArray.forEach(function (item) {
      cartRender += '<div class="choosen-good-item" data-product-id="' + item.productId + '">';
      cartRender += '<img src="' + item.productImg + '" title="img-title">';
      cartRender += '<div>';
      cartRender += '<p>' + item.productTitle + '</p>';
      cartRender += '<p class="choosen-good-price">' + item.productPrice + '</p>';
      cartRender += '</div>';
      cartRender += '</div>';

      $('.choosen-goods').html(cartRender);
    });
  });

  // Close cart popup
  $cartPopupClose.on('click', function () {
    $popupCartWrap.removeClass('open');
    $('body').removeClass('no-scroll');
  });

  // Add product to cart
  var cartArray = [];

  $bestGoodsWrapper.on('click', 'button', function () {
    var thisParent = $(this).closest('.good-item'),
        thisId = thisParent.attr('data-product-id'),
        thisImg = $('img', thisParent).attr('src'),
        thisTitle = $('.good-item-title', thisParent).html(),
        thisPrice = $('.price', thisParent).html(),
        cartProductItem = {};

    // Create object with product item data
    cartProductItem.productId = thisId;
    cartProductItem.productImg = thisImg;
    cartProductItem.productTitle = thisTitle;
    cartProductItem.productPrice = thisPrice;

    // Add object to array
    cartArray.push(cartProductItem);

    // Remove duplicates function
    function removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject = {};

      for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for(i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    }

    var stringArray = JSON.stringify(removeDuplicates(cartArray, "productId"));
    var cleanArray = JSON.parse(stringArray);

    cartArray = cleanArray;

    // Count total price
    var totalPrice = 0;

    cleanArray.forEach(function (item) {
      totalPrice += +item.productPrice.replace(/[^\d.-]/g, '');
    });

    // Add price to cart
    $('header .cart .price').html(totalPrice.toFixed(2) + ' грн.');

    // Add amount to cart
    $countCartItems.html(cleanArray.length);
  });

  /** Validate form **/
  $('.validate').validate({
    rules: {
      name: {
        required: true,
        minlength: 5
      },
      phone: "required",
      mail: {
        required: true,
        mail: true
      }
    },
    messages: {
      mail: {
        required: 'надо ввести мыло'
      },
      phone: {
        required: 'надо в формате +38(___)___-___-____'
      },
      name: {
        required: 'надо вести имя',
        minlength: 'имя надо длиннее 5 символов'
      }
    }
  });
})(jQuery);
