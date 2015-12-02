<?php
	require_once('MailChimp.php');

	if(isset($_POST['mail']))
	{
		$mailchimp = new MailChimp('3ec3e53addde2bb8f9d25abf60ad7734-us10');

		$result = $mailchimp->call('lists/subscribe', array(
            'id'                => '7d07494a47',
            'email'             => array('email'=> $_POST['mail']),
            'merge_vars'        => array('FNAME'=>'', 'LNAME'=>''),
            'double_optin'      => false,
            'update_existing'   => true,
            'replace_interests' => false,
            'send_welcome'      => false,
        ));

		
		if(isset($result['error']))
		{
        	echo $result['error'];
        }
        else
        {
        	echo 'You have been successfully subscribed for Bindio newsletters!';
        }
	}
	else
	{
		echo 'Something went wrong! Try again later!';
	}
?>