(function($){

	//Using Slickjs Plugin
	var sliderKereta = $('.kereta');

 	sliderKereta.slick({
	  centerMode: true,
	  infinite: true,
	  slidesToShow: 3,
	  speed: 500,
	  variableWidth: true,
	  arrows: true,
	  nextArrow: '<i class="fa fa-chevron-right slickNext"></i>',
  	  prevArrow: '<i class="fa fa-chevron-left slickPrev"></i>',
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 1,
	        infinite: true,
	        dots: false
	      }
	    }
      ]
	});

 	var indexGerbong = $('.gerbongSeat .active').parents('.gerbongSeat').attr('index-slide');
 	// console.log(indexGerbong);

 	sliderKereta.slick('slickGoTo', indexGerbong);

	$('.kereta').on('afterChange', function(event, slick, currentSlide){
		var curSlide = currentSlide;
		var gerbongSeat = curSlide + 1;
	  // console.log('afterChange', curSlide);
	  // console.log('gerbongSeat', gerbongSeat);
	  $('.gerbongSeat').removeClass('hidden');
	  $('.gerbongSeat').addClass('hidden');
	  $('.gerbong-'+ gerbongSeat ).removeClass('hidden');
	});

	//index penumpang pada gerbpng
	var boxpassChoosing = $('.boxPass.choosing').attr('index-pass'),
	boxpassChoosingEks = $('.boxPass.choosing .gerbong span').text(),
	boxpassChoosed = $('.boxPass.choosed').attr('index-pass'),
	boxpassChoosedEks = $('.boxPass.choosed .gerbong span').text();

	$('.gerbongSeat.gerbong-'+ boxpassChoosingEks + ' .active').attr('index-pass', boxpassChoosing);
	$('.gerbongSeat.gerbong-'+ boxpassChoosedEks + ' .choosed').attr('index-pass', boxpassChoosed);

	//pilih ulang
	$(document).on('click', ".boxPass.choosed", function() {
		var indexPass = $(this).attr('index-pass');

		//slider go to
		function gotoSlider(type) {
			var slideGoTo = $('.keteranganPenumpang .boxPass.-'+ indexPass + type +' .gerbong span').text(),
			slideGoToChoosing = slideGoTo - 1;
			console.log(slideGoToChoosing);
			sliderKereta.slick('slickGoTo', slideGoToChoosing);
		}

		if (confirm('Ganti Kursi ?')) {
			//click boxpass first to trigger choose kursi
			$('.gerbongSeat .available').removeClass('boxPassFirst');

			//index keterangan penumpang choosing again
			$(this).removeClass('choosed').addClass('choosing');

			gotoSlider('.choosing');

			//chosing again
			$('.boxPass').removeClass('choosing').addClass('choosed');
			$(this).removeClass('choosed').addClass('choosing');

			$('.gerbongSeat .available.active').removeClass('available active').addClass('choosed');
			$('.gerbongSeat .choosed[index-pass="'+ indexPass  +'"]').removeClass('choosed').addClass('available active');
		} else {
			gotoSlider('.choosed');
		}
	});

	//pilih kursi
	$(document).on('click', ".gerbongSeat .available", function() {
		var $this = $(this);
		var nomorKursi = $(this).text();
		var nomorgerbong = $(this).parents('.gerbongSeat').find('.no-gerbong').text();

		if($('.boxPass.choosing').length > 0) {
		    var IndexPass = $('.boxPass.choosing').attr('index-pass');
			// $('.gerbongSeat .available').removeClass('active');
			// $this.addClass('active');

			if (confirm('Pilih Kursi?')) {
				//click boxpass first to trigger choose kursi
				$('.gerbongSeat .available').removeClass('active');

				$(this).addClass('choosed');
				$(this).attr('index-pass', IndexPass);

				console.log ('kursi : '+ nomorKursi + ' gerbong : '+ nomorgerbong + ' penumpang : ' + IndexPass);
				$('.boxPass.choosing').removeClass('choosing').addClass('choosed');
				$('.gerbongSeat .available').addClass('boxPassFirst');

				//send info penumpang choosed
				$('.keteranganPenumpang .boxPass.-'+ IndexPass +' .kursi').text(nomorKursi);
				$('.keteranganPenumpang .boxPass.-'+ IndexPass +' .gerbong span').text(nomorgerbong);

			} else {
				//send info penumpang choosing
				// $('.keteranganPenumpang .choosing .kursi').text(nomorKursi);
				// $('.keteranganPenumpang .choosing .gerbong span').text(nomorgerbong);
			}
		}
		else {
			return false;
		}



	});


})(jQuery);