<?php

namespace Initiative\AppBundle\Security;

use Symfony\Component\Security\Core\Authentication\SimplePreAuthenticatorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\PreAuthenticatedToken;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

class ApiKeyAuthenticator implements SimplePreAuthenticatorInterface {

    protected $userProvider;

    public function __construct(ApiKeyUserProvider $userProvider) {
        $this->userProvider = $userProvider;
    }

    public function authenticateToken(TokenInterface $token, UserProviderInterface $userProvider, $providerKey) {
        $apiKey = $token->getCredentials();
        
        
        $username = $this->userProvider->getUsernameForApiKey($apiKey);
        $user_roles_from_api_key = $this->userProvider->getUserRolesForApiKey($apiKey);
    
        $user = $token->getUser();
        if ($user instanceof User) {
            return new PreAuthenticatedToken(
                    $user,
                    $apiKey,
                    $providerKey,
                    $user_roles_from_api_key
                    );
        }
        
        if (!$username) {
            throw new AuthenticationException(
            sprintf('API Key "%s" does not exist.', $apiKey)
            );
        }

//        $user = $this->userProvider->loadUserByUsername($username);
        $user = $this->userProvider->loadUserByUsernameAndApiKey($username, $apiKey);
        
        $newToken =  new PreAuthenticatedToken(
                $user, $apiKey, $providerKey, $user_roles_from_api_key
        );

        return $newToken;
        
    }

    public function createToken(Request $request, $providerKey) {

        $apiKey = $request->headers->get('apikey');
        $apiKey = $request->cookies->get('apikey');        
        
        if (!$apiKey) {
            throw new BadCredentialsException('No API key found. Unable to create token');
        }

        $user_roles_from_api_key = $this->userProvider->getUserRolesForApiKey($apiKey);
        
        return new PreAuthenticatedToken(
                'anon.', $apiKey, $providerKey ,$user_roles_from_api_key
        );
    }

    public function supportsToken(TokenInterface $token, $providerKey) {
        return $token instanceof PreAuthenticatedToken && $token->getProviderKey() === $providerKey;
    }
    
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception){
        return new Response("Authentication Failed.", 403);
    }

}
