<?php

namespace Initiative\AppBundle\Security;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use EightPoints\Bundle\GuzzleBundle\GuzzleBundle;
use GuzzleHttp\Client;

class ApiKeyUserProvider implements UserProviderInterface {

    public function getUsernameForApiKey($apiKey) {


        //Default the return value to empty (Will consider not authenticated with wsse)
        $username = '';

        //Instantiate a new Guzzle Client to make a API request.
        $client = new Client();

        try {
            $response = $client->post('missioncontrol/users/authenticationbyapi', [
                'body' => [
                    'apikey' => $apiKey
                ]
            ]);

            if ($response->getStatusCode() == 201) {
                $response_string = $response->getBody()->getContents();
                $response_string_array = json_decode($response_string, true);
                $userdata = $response_string_array['userdata'];
                $username = $userdata['username'];
            }
        } catch (\Exception $e) {
            //print_r($e);
        }
        return $username;
    }

    public function getUserRolesForApiKey($apiKey) {
        
        $client = new Client();
        $response = $client->post('missioncontrol/users/authenticationbyapi', ['body' => ['apikey' => $apiKey]]);
        $response_string = $response->getBody()->getContents();
        $response_array = json_decode($response_string, true);
        $user_roles = $response_array['userdata']['roles'];
        return $user_roles;
    }

    public function loadUserByUsername($username) {
        
        return new User(
                $username, null,
                //The roles for the user.
                //Better determine based on the user.
                array('ROLE_USER')
        );
    }

    public function refreshUser(UserInterface $user) {
        throw new UnsupportedUserException();
    }

    public function supportsClass($class) {
        return 'Symfony\Component\Security\Core\User\User' === $class;
    }

}
