<?php

$url = $this->container->getParameter('apiUrl')."options.json";

$accesstoken = $_COOKIE['api'];

$headr = array();
$headr[] = 'Content-length: 0';
$headr[] = 'Content-type: application/json';
$headr[] = 'x-wsse: ApiKey="'.$accesstoken.'"';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_HTTPHEADER,$headr);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$result=curl_exec($ch);
curl_close($ch);

$obj = json_decode($result, true);

$clients = $obj['clients'];
$brands = $obj['brands'];
$products = $obj['products'];
$countries = $obj['countries'];
$product_lines = $obj['product_lines'];
$divisions = $obj['divisions'];

?>

<div class="get_api" data-api="<?php echo $_COOKIE['api']; ?>">
	<div class="close_window campaign evo-text-right"><i class="fa fa-times fa-2x"></i></div>
	<h2 class="evo-header-big margin-top-0 text-swap font_stack_4">New Campaign</h2>
	
	
	<form name="new_campaign" id="new_campaign" action="<?php echo $this->container->getParameter('apiUrl'); ?>campaigns.json" method="POST">
	

	<div class='new-campaign-item-divider'></div>
	<label for="campaign_name" class='float_label'>Campaign Name</label>
	<input name="name" type="text" data-for='campaign_name' data-animation='topZero' class="form-control" placeholder="Campaign Name" required>

	<div class='new-campaign-item-divider'></div>			
	<label for="client" class='float_label'>Client Name</label>
	<select class="sorting_options new_campaign_select ajaxSelector" data-for='client' data-animation='topZero' name="client" required>
		<option value="" selected>Client Name</option>
		<?php
		foreach($clients as $key => $value) {
			if($key != 8) {
				echo '<option value="'.$key.'">'.$value.'</option>';
			}
		}
		?>
	</select>

	<div class='new-campaign-item-divider'></div>			
	<label for="division" class='float_label'>Division</label>
	<select class="sorting_options new_campaign_select ajaxSelector" data-for='division' data-animation='topZero' name="division" disabled="disabled" required>
		<option value="" selected>Division</option>
	</select>
						
							
	<div class='new-campaign-item-divider'></div>			
	<label for="brand_name" class='float_label'>Brand Name</label>
	<select class="sorting_options new_campaign_select ajaxSelector" data-for='brand_name' data-animation='topZero' name="brand" disabled="disabled" required>
		<option value="" selected>Brand Name</option>
	</select>

	<div class='new-campaign-item-divider'></div>	
	<label for="product_line" class='float_label'>Product Line</label>
	<select class="sorting_options new_campaign_select ajaxSelector" data-for='product_line' data-animation='topZero' name="productline" disabled="disabled" required>
		<option value="" selected>Product Line</option>
	</select>
					
	<div class='new-campaign-item-divider'></div>		
	<label for="product" class='float_label'>Product</label>
	<select class="sorting_options new_campaign_select ajaxSelector" data-for='product' data-animation='topZero' name="product" disabled="disabled" required>
		<option value="" selected>Product</option>
	</select>

	
	<div class='new-campaign-item-divider'></div>	
	<label for="country" class='float_label'>Country</label>
	<select class="sorting_options new_campaign_select" data-for='country' data-animation='topZero' name="country" required>
		<option value="0">Country</option>
		<?php
		foreach($countries as $key => $value) {
			echo '<option value="'.$key.'">'.$value.'</option>';
		}
		?>
	</select>


	<div class='new-campaign-item-divider'></div>	
	<label for="cdd" class='float_label'>Plan Approval Date</label>
	<input name="client_deliverabledate" type="text" class="form-control datepicker" data-for='cdd' data-calendar='datePicker' placeholder="YYYY-MM-DD" required>
	
	
	<div class='new-campaign-item-divider'></div>							
	<label for="cd" class='float_label'>Estimated Campaign End Date</label>
	<input name="completion_date" type="text" class="form-control datepicker" data-for='cd' data-calendar='datePicker' placeholder="YYYY-MM-DD" required>

	<div class="evo-space"></div>
	<button class="evo-btn evo-btn-2">create campaign</button>
	<div class="evo-space"></div>

</div>

<script>

	$('select').click(function() {
		getFor = $(this).data("for");
		if ($(this).data('animation') === 'topZero'){
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});

	$('select').change(function() {
		getFor = $(this).data("for");
		if ($(this).data('animation') === 'topZero'){
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});

	$('input').on('click change', function() {
		var getFor = $(this).data("for");
		if ($(this).data('calendar') === 'datePicker') {
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});

</script>