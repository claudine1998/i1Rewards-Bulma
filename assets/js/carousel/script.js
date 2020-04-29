/*
		variables
	*/

		var $imagesSlider = $(".gallery-slider .gallery-slider__images>div"),
			  $thumbnailsSlider = $(".gallery-slider__thumbnails>div");

	/*
		sliders
	*/

		// images options
		$imagesSlider.slick({
			speed:300,
			slidesToShow:1,
			slidesToScroll:1,
			cssEase:'linear',
			fade:true,
			draggable:false,
			asNavFor:".gallery-slider__thumbnails>div"
		});

		// thumbnails options
		$thumbnailsSlider.slick({
			speed:300,
			slidesToShow:5,
			slidesToScroll:1,
			cssEase:'linear',
			centerMode:true,
 centerPadding: '7%',
			draggable:false,
			focusOnSelect:true,
			asNavFor:".gallery-slider .gallery-slider__images>div",
			prevArrow:'.gallery-slider__thumbnails .prev-arrow',
			nextArrow:'.gallery-slider__thumbnails .next-arrow',
			responsive: [
				{
					breakpoint: 720,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 350,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}
			]
		});