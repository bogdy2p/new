<?php
$user_id = $_COOKIE["dash_user_id"];
?>
<div id="wheel">
  <?php include('img/wheel/phase_svg.php'); ?>
  
<svg id="Layer_1" x="0px" y="0px"
   width="431.279px" height="431.063px" viewBox="0 0 431.279 431.063" enable-background="new 0 0 431.279 431.063"
   xml:space="preserve">

<?php include('img/wheel/wheel_bg.php'); ?>

<g>
  <defs>
    <path id="SVGID_1_" class="rotate" d="M215.64-26.616v65.998c0.746,0,1.487,0.016,2.23,0.025h-2.231v176.125L332.16,82.477l42.939-50.115
      C332.236-4.398,276.536-26.616,215.64-26.616z"/>
  </defs>
  <clipPath id="SVGID_2_">
    <use xlink:href="#SVGID_1_"  overflow="visible"/>
  </clipPath>
  <g clip-path="url(#SVGID_2_)" id="paths">

    <path class="wheel_phase wheel_phase1 btn_action" data-href="100" data-phase="1" fill="#ED1F24" d="M225.139,15.015c41.968,1.966,80.599,16.889,111.988,40.846l9.726-11.59
      C311.858,17.329,269.716,1.92,225.139,0V15.015z"/>

    <path class="wheel_phase wheel_phase2 btn_action" data-href="200" data-phase="2" fill="#ED1F24" d="M411.372,171.265l14.842-2.617c-8.746-39.741-28.627-76.237-58.094-105.704
      c-2.203-2.203-4.452-4.341-6.731-6.436l-9.715,11.577C381.024,95.204,402.282,130.953,411.372,171.265z"/>
    
     <path class="wheel_phase wheel_phase3 btn_action" data-href="300" data-phase="3" fill="#ED1F24" d="M416.279,215.423c0,33.126-8.076,64.399-22.354,91.964l13.11,7.569
      c15.837-30.368,24.243-64.303,24.243-99.533c0-9.461-0.617-18.826-1.81-28.057l-14.797,2.609
      C415.732,198.311,416.279,206.804,416.279,215.423z"/>

    <path class="wheel_phase wheel_phase4 btn_action" data-href="400" data-phase="4" fill="#ED1F24" d="M384.401,323.829c-21.87,33.929-53.685,60.867-91.291,76.668l5.177,14.226
      c25.798-10.698,49.489-26.476,69.833-46.818c11.218-11.218,21.039-23.459,29.395-36.505L384.401,323.829z"/>
    
    <path class="wheel_phase wheel_phase5 btn_action" data-href="500" data-phase="5" fill="#ED1F24" d="M275.264,407.019c-18.844,5.876-38.871,9.044-59.625,9.044c-20.753,0-40.781-3.168-59.625-9.044
      l-5.16,14.177c20.693,6.488,42.478,9.867,64.785,9.867s44.092-3.379,64.785-9.867L275.264,407.019z"/>
    
     <path class="wheel_phase wheel_phase6 btn_action" data-href="600" data-phase="6" fill="#ED1F24" d="M138.168,400.497c-37.606-15.801-69.421-42.739-91.292-76.669l-13.112,7.57
      c8.355,13.047,18.176,25.288,29.395,36.506c20.343,20.343,44.035,36.119,69.832,46.817L138.168,400.497z"/>
    
    <path class="wheel_phase wheel_phase7 btn_action" data-href="700" data-phase="7" fill="#ED1F24" d="M15,215.423c0-8.619,0.547-17.113,1.607-25.449L1.81,187.366C0.617,196.597,0,205.962,0,215.423
      c0,35.23,8.406,69.164,24.243,99.532l13.109-7.568C23.076,279.822,15,248.549,15,215.423z"/>
    
    <path class="wheel_phase wheel_phase8 btn_action" data-href="800" data-phase="8" fill="#ED1F24" d="M19.907,171.264c9.09-40.312,30.348-76.061,59.699-103.18l-9.715-11.578
      c-2.279,2.095-4.529,4.234-6.732,6.437C33.692,92.41,13.812,128.906,5.065,168.647L19.907,171.264z"/>

    <path class="wheel_phase wheel_phase9 btn_action" data-href="900" data-phase="9" fill="#ED1F24" d="M94.152,55.861c31.389-23.957,70.02-38.88,111.987-40.846V0C161.563,1.92,119.42,17.329,84.426,44.271
      L94.152,55.861z"/>
  </g>
</g>
</svg>

<div id="dot_container">
  <img src="<?php echo $view['assets']->getUrl('img/wheel/dots/'.$project_urgency.'.png')?>" id="phaseDot" class="dotSize_<?php echo $completionScoreSize; ?>">
</div>




<div class="outter_dots">
  <div class="wheel_circle wheel_circle1 <?php if($obj4['Tasks'][0]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle2 <?php if($obj4['Tasks'][1]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle3 <?php if($obj4['Tasks'][2]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle4 <?php if($obj4['Tasks'][3]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle5 <?php if($obj4['Tasks'][4]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle6 <?php if($obj4['Tasks'][5]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle7 <?php if($obj4['Tasks'][6]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle8 <?php if($obj4['Tasks'][7]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
  <div class="wheel_circle wheel_circle9 <?php if($obj4['Tasks'][8]['TaskOwnerUserID'] == $user_id) { echo "enlarge-circle-owner"; }; ?>
"></div>
</div>

<div class="task_header task_1 <?php if($obj4['Tasks'][0]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][0]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][0]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"0\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][0]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task1_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][0]['TaskOwnerFirstName']." ".$obj4['Tasks'][0]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][0]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_2 <?php if($obj4['Tasks'][1]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][1]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][1]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"1\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][1]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task2_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][1]['TaskOwnerFirstName']." ".$obj4['Tasks'][1]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][1]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_3 <?php if($obj4['Tasks'][2]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][2]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][2]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"2\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][2]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task3_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][2]['TaskOwnerFirstName']." ".$obj4['Tasks'][2]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][2]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_4 <?php if($obj4['Tasks'][3]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][3]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][3]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"3\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][3]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task4_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][3]['TaskOwnerFirstName']." ".$obj4['Tasks'][3]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][3]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_5 <?php if($obj4['Tasks'][4]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo "Fundamental Channels";
      
      $messageAmount = $json['wheel']['phases'][4]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"4\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][4]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task5_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][4]['TaskOwnerFirstName']." ".$obj4['Tasks'][4]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][4]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_6 <?php if($obj4['Tasks'][5]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][5]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][5]['taskOwner']['messages'];
      if($messageAmount > 0) {
        //echo "<div class=\"message-icon evo-ff1\" data-phase=\"5\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][5]['needsReview'];
      if($needsReview > 0) {
        //echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task6_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][5]['TaskOwnerFirstName']." ".$obj4['Tasks'][5]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][5]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_7 <?php if($obj4['Tasks'][6]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][6]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][6]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"6\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][6]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task7_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][6]['TaskOwnerFirstName']." ".$obj4['Tasks'][6]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][6]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_8 <?php if($obj4['Tasks'][7]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][7]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][7]['taskOwner']['messages'];
      if($messageAmount > 0) {
        //echo "<div class=\"message-icon evo-ff1\" data-phase=\"7\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][7]['needsReview'];
      if($needsReview > 0) {
        //echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task8_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][7]['TaskOwnerFirstName']." ".$obj4['Tasks'][7]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][7]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>
<div class="task_header task_9 <?php if($obj4['Tasks'][8]['TaskOwnerUserID'] == $user_id) { echo " is_owner"; } ?>">
  <h2 class="evo-header evo-ff5 margin-top-0 margin-bottom-0">
    <?php echo $json['wheel']['phases'][8]['titleHTML']; 
      
      $messageAmount = $json['wheel']['phases'][8]['taskOwner']['messages'];
      if($messageAmount > 0) {
        // echo "<div class=\"message-icon evo-ff1\" data-phase=\"8\">".$messageAmount."</div>";
      }
      $needsReview = $json['wheel']['phases'][8]['needsReview'];
      if($needsReview > 0) {
        // echo "<img src=\"http://localhost:8000/img/alert_icon.svg\" class=\"alert_icon\">";
      }

    ?>
  </h2>
  <h3 class="evo-header-smaller evo-ff1 margin-top-0 task9_owner task_owner padding-top-2"><?php echo $obj4['Tasks'][8]['TaskOwnerFirstName']." ".$obj4['Tasks'][8]['TaskOwnerLastName']; if(in_array($obj4['Tasks'][8]['TaskOwnerUserID'], $reviwerArray)) { echo "<i class=\"fa fa-star\"></i>"; } ?></h3>
</div>





</div>
