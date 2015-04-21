<?php
$user_id = $_COOKIE["dash_user_id"];
?>
<div id="nav_wheel_<?php echo $json['wheel']['guid']; ?>">
	<div class="nav_wheel_container">


		<div class="wheel_label evo-text-small evo-ff5 evo-white">JTBD</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Comms Tasks</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Real Lives</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Media Idea</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Fundamental <br>Channels</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Budget allocation <br>& Mapping</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Phasing</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Final Plan</div>
		<div class="wheel_label evo-text-small evo-ff5 evo-white">Outcome</div>




		<!-- wheel center dot urgency/size calculated -->
		<img src="<?php echo $view['assets']->getUrl('img/wheel/dots/'.$project_urgency.'.png'); ?>" class="<?php echo "dotSize_".$completionScoreSize; ?>">
		<!-- SVG wheel task colors -->
		<svg class="nav_wheel" viewBox="0 0 403.39 397.686">
			<g>
				<path <?php if($task_id == 100) { echo "id=\"active\""; };?> class="nav_wheel_task_1" d="M296.806,72.686l9.315-11.923c-27.27-21.569-61.369-34.875-98.524-36.161l-0.528,15.118
					C240.916,40.893,271.975,53.023,296.806,72.686z"/>
				<path <?php if($task_id == 200) { echo "id=\"active\""; };?> class="nav_wheel_task_2" d="M352.018,162.503l14.803-3.146c-7.234-35.7-25.753-67.305-51.673-90.93L305.024,79.67
					C328.614,101.195,345.457,129.986,352.018,162.503z"/>
				<path <?php if($task_id == 300) { echo "id=\"active\""; };?> class="nav_wheel_task_3" d="M368.751,170.979l-14.982,2.106c0.846,6.521,1.286,13.168,1.286,19.92c0,26.491-6.716,51.413-18.538,73.158l13.361,7.104
					c12.95-23.863,20.306-51.204,20.306-80.263C370.184,185.539,369.693,178.188,368.751,170.979z"/>
				<path <?php if($task_id == 400) { echo "id=\"active\""; };?> class="nav_wheel_task_4" d="M258.631,335.459l5.669,14.03c32.969-13.208,60.792-36.528,79.632-66.13l-12.831-8.018
					C313.945,302.255,288.626,323.454,258.631,335.459z"/>
				<path <?php if($task_id == 500) { echo "id=\"active\""; };?> class="nav_wheel_task_5" d="M201.666,346.394c-16.39,0-32.174-2.58-46.981-7.34l-4.676,14.391c16.28,5.238,33.636,8.078,51.657,8.078
					s35.377-2.84,51.657-8.077l-4.677-14.392C233.839,343.813,218.054,346.394,201.666,346.394z"/>
				<path <?php if($task_id == 600) { echo "id=\"active\""; };?> class="nav_wheel_task_6" d="M72.23,275.342l-12.831,8.018c18.84,29.602,46.663,52.921,79.631,66.129l5.669-14.029
					C114.705,323.453,89.386,302.255,72.23,275.342z"/>
				<path <?php if($task_id == 700) { echo "id=\"active\""; };?> class="nav_wheel_task_7" d="M48.276,193.006c0-6.751,0.44-13.399,1.286-19.92L34.58,170.98c-0.941,7.209-1.433,14.559-1.433,22.024
					c0,29.06,7.356,56.399,20.307,80.263l13.36-7.104C54.993,244.419,48.276,219.497,48.276,193.006z"/>
				<path <?php if($task_id == 800) { echo "id=\"active\""; };?> class="nav_wheel_task_8" d="M98.306,79.671L88.182,68.428c-25.92,23.625-44.438,55.23-51.672,90.932l14.803,3.146
					C57.874,129.988,74.716,101.197,98.306,79.671z"/>
				<path <?php if($task_id == 900) { echo "id=\"active\""; };?> class="nav_wheel_task_9" d="M196.26,39.72l-0.528-15.118c-37.156,1.286-71.255,14.593-98.524,36.163l9.314,11.923
					C131.353,53.025,162.413,40.894,196.26,39.72z"/>
			</g>
			<!-- wheel your open task indicators -->
			<?php if($obj2['Tasks'][0]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_1" stroke-width="3" stroke-miterlimit="10" cx="267.373" cy="12.036" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][1]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_2" stroke-width="3" stroke-miterlimit="10" cx="368.362" cy="96.624" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][2]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_3" stroke-width="3" stroke-miterlimit="10" cx="391.353" cy="226.337" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][3]['TaskOwnerUserID'] == $user_id) { ?>>
				<circle class="nav_wheel_task_dot_4" stroke-width="3" stroke-miterlimit="10" cx="325.586" cy="340.481" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][4]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_5" stroke-width="3" stroke-miterlimit="10" cx="201.836" cy="385.646" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][5]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_6" stroke-width="3" stroke-miterlimit="10" cx="78.005" cy="340.7" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][6]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_7" stroke-width="3" stroke-miterlimit="10" cx="12.038" cy="226.672" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][7]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_8" stroke-width="3" stroke-miterlimit="10" cx="34.798" cy="96.918" r="10.535"/>
			<?php } ?>
			<?php if($obj2['Tasks'][8]['TaskOwnerUserID'] == $user_id) { ?>
				<circle class="nav_wheel_task_dot_9" stroke-width="3" stroke-miterlimit="10" cx="135.639" cy="12.152" r="10.535"/>
			<?php } ?>
		</svg>
		<?php include('img/nav_wheel/hit_points.php'); ?>
		
	</div>
</div>
