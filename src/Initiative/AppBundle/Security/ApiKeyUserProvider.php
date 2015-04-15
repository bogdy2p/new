<?php

namespace Initiative\AppBundle\Security;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class ApiKeyUserProvider implements UserProviderInterface {

    public function getUsernameForApiKey($apiKey) {
        
        
        //USING THE API KEY , GRAB THE USER INFORMATION VIA AN API CALL !
        //
        // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // // THE WHOLE LOGIC KINDA OF SHOULD BE HERE
        // GRAB THE API KEY , FIND THE USER'S USER DATA USING THAT API KEY. (VIA AN API CALL)
        // 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        $username = 'a';
        
        return $username;
        
    }

    public function loadUserByUsername($username) {
        
        return new User(
                $username,
                null,
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

//put your code here
}
